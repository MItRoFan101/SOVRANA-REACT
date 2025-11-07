package com.sovrana.model;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "orders")
@Data
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String orderNumber;

    @Column(nullable = false)
    private String customerName;

    @Column(nullable = false)
    private String customerPhone;

    private String customerEmail;
    private String pickupTime;
    private String comment;

    @Enumerated(EnumType.STRING)
    private OrderStatus status = OrderStatus.PENDING;

    private Double totalAmount;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "order", fetch = FetchType.LAZY)
    private List<OrderItem> items;

    @CreationTimestamp
    private LocalDateTime createdAt;

    private LocalDateTime completedAt;

    // Интеграция с Айко
    private String aikoOrderId;
    private String aikoStatus;

    public enum OrderStatus {
        PENDING, CONFIRMED, IN_PROGRESS, READY_FOR_PICKUP, COMPLETED, CANCELLED
    }
}