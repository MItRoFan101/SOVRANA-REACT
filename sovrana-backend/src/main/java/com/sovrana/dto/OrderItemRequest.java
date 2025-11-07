package com.sovrana.dto;

import lombok.Data;

import java.util.List;

@Data
public class OrderItemRequest {
    private Long productId;
    private Integer quantity;
    private Boolean isSpicy = false;
    private Boolean isLong = false;
    private Boolean hasExtraPatty = false;
    private Integer weight;
    private List<String> toppings;
    private List<String> sauces;
}
