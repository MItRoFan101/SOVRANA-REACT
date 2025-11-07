package com.sovrana.model;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "products")
@Data
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(length = 500)
    private String description;

    @Column(nullable = false)
    private Double price;

    @Column(nullable = false)
    private String category;

    private String imageUrl;
    private Boolean available = true;

    // Для бургеров
    private Boolean canBeSpicy = false;
    private Boolean canBeLong = false;
    private Boolean canHaveExtraPatty = false;

    // Для мяса на углях
    private Boolean soldByWeight = false;
    private Integer weightStep = 100;
    private Double pricePer100g;

    @ElementCollection
    @CollectionTable(name = "product_toppings", joinColumns = @JoinColumn(name = "product_id"))
    @Column(name = "topping")
    private List<String> availableToppings;

    @ElementCollection
    @CollectionTable(name = "product_sauces", joinColumns = @JoinColumn(name = "product_id"))
    @Column(name = "sauce")
    private List<String> availableSauces;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}