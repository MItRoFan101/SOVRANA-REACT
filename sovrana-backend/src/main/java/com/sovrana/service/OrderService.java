package com.sovrana.service;

import com.sovrana.dto.OrderRequest;
import com.sovrana.model.Order;
import com.sovrana.model.OrderItem;
import com.sovrana.model.Product;
import com.sovrana.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductService productService;

    @Transactional
    public Order createOrder(OrderRequest orderRequest) {
        Order order = new Order();
        order.setOrderNumber(generateOrderNumber());
        order.setCustomerName(orderRequest.getCustomerName());
        order.setCustomerPhone(orderRequest.getCustomerPhone());
        order.setCustomerEmail(orderRequest.getCustomerEmail());
        order.setPickupTime(orderRequest.getPickupTime());
        order.setComment(orderRequest.getComment());
        order.setCreatedAt(LocalDateTime.now());

        // Создаем items и рассчитываем сумму
        List<OrderItem> items = createOrderItems(orderRequest.getItems(), order);
        order.setItems(items);
        order.setTotalAmount(calculateTotalAmount(items));

        return orderRepository.save(order);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Optional<Order> getOrderById(Long id) {
        return orderRepository.findById(id);
    }

    @Transactional
    public Optional<Order> updateOrderStatus(Long id, Order.OrderStatus status) {
        return orderRepository.findById(id).map(order -> {
            order.setStatus(status);
            if (status == Order.OrderStatus.COMPLETED) {
                order.setCompletedAt(LocalDateTime.now());
            }
            return orderRepository.save(order);
        });
    }

    public List<Order> getOrdersByStatus(Order.OrderStatus status) {
        return orderRepository.findByStatus(status);
    }

    private List<OrderItem> createOrderItems(List<com.sovrana.dto.OrderItemRequest> itemRequests, Order order) {
        return itemRequests.stream()
                .map(itemRequest -> {
                    Optional<Product> productOpt = productService.getProductById(itemRequest.getProductId());
                    if (productOpt.isPresent()) {
                        Product product = productOpt.get();
                        OrderItem item = new OrderItem();
                        item.setOrder(order);
                        item.setProduct(product);
                        item.setQuantity(itemRequest.getQuantity());
                        item.setIsSpicy(itemRequest.getIsSpicy());
                        item.setIsLong(itemRequest.getIsLong());
                        item.setHasExtraPatty(itemRequest.getHasExtraPatty());
                        item.setWeight(itemRequest.getWeight());
                        item.setToppings(itemRequest.getToppings());
                        item.setSauces(itemRequest.getSauces());
                        item.setDisplayName(generateDisplayName(product, itemRequest));
                        item.setUnitPrice(calculateItemPrice(product, itemRequest));
                        item.setTotalPrice(item.getUnitPrice() * item.getQuantity());

                        return item;
                    }
                    return null;
                })
                .filter(item -> item != null)
                .toList();
    }

    private String generateOrderNumber() {
        return "ORD-" + System.currentTimeMillis() + "-" + UUID.randomUUID().toString().substring(0, 8);
    }

    private Double calculateTotalAmount(List<OrderItem> items) {
        return items.stream()
                .mapToDouble(OrderItem::getTotalPrice)
                .sum();
    }

    private String generateDisplayName(Product product, com.sovrana.dto.OrderItemRequest itemRequest) {
        StringBuilder displayName = new StringBuilder(product.getName());

        if (Boolean.TRUE.equals(itemRequest.getIsSpicy())) {
            displayName.append(" (Острый)");
        }
        if (Boolean.TRUE.equals(itemRequest.getIsLong())) {
            displayName.append(" (Лонг)");
        }
        if (Boolean.TRUE.equals(itemRequest.getHasExtraPatty())) {
            displayName.append(" (Двойная котлета)");
        }
        if (itemRequest.getWeight() != null && itemRequest.getWeight() > 0) {
            displayName.append(" ").append(itemRequest.getWeight()).append("г");
        }

        return displayName.toString();
    }

    private Double calculateItemPrice(Product product, com.sovrana.dto.OrderItemRequest itemRequest) {
        Double price = product.getPrice();

        // Доплата за дополнительные опции
        if (Boolean.TRUE.equals(itemRequest.getHasExtraPatty())) {
            price += 100.00; // Примерная доплата за дополнительную котлету
        }

        // Расчет цены для товаров, продающихся на вес
        if (Boolean.TRUE.equals(product.getSoldByWeight()) && itemRequest.getWeight() != null) {
            Double pricePer100g = product.getPricePer100g();
            if (pricePer100g != null) {
                price = (pricePer100g * itemRequest.getWeight()) / 100.0;
            }
        }

        return price;
    }
}