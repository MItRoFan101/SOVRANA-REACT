package com.sovrana.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Entity
@Table(name = "order_items")
@Data
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id")
    private Order order;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Product product;

    private Integer quantity;
    private Double unitPrice;
    private Double totalPrice;

    // Опции товара
    private Boolean isSpicy = false;
    private Boolean isLong = false;
    private Boolean hasExtraPatty = false;
    private Integer weight; // для мяса на углях

    @ElementCollection
    @CollectionTable(name = "order_item_toppings", joinColumns = @JoinColumn(name = "order_item_id"))
    @Column(name = "topping")
    private List<String> toppings;

    @ElementCollection
    @CollectionTable(name = "order_item_sauces", joinColumns = @JoinColumn(name = "order_item_id"))
    @Column(name = "sauce")
    private List<String> sauces;

    private String displayName;
}