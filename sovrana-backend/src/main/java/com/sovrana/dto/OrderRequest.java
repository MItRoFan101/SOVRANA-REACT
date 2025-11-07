package com.sovrana.dto;

import lombok.Data;
import java.util.List;

@Data
public class OrderRequest {
    private String customerName;
    private String customerPhone;
    private String customerEmail;
    private String pickupTime;
    private String comment;
    private List<OrderItemRequest> items;
}

