package com.sovrana.service;

import com.sovrana.model.Product;
import com.sovrana.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    public List<Product> getAllProducts() {
        return productRepository.findByAvailableTrue();
    }

    public List<Product> getProductsByCategory(String category) {
        return productRepository.findByCategoryAndAvailableTrue(category);
    }

    public List<Product> getPopularProducts() {
        // Временная реализация - возвращаем первые 6 товаров
        return productRepository.findByAvailableTrue().stream()
                .limit(6)
                .toList();
    }

    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }
}