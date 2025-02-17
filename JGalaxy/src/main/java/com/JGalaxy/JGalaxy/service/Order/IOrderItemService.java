package com.JGalaxy.JGalaxy.service.Order;

import com.JGalaxy.JGalaxy.dto.OrderRequest;
import com.JGalaxy.JGalaxy.dto.Response;
import com.JGalaxy.JGalaxy.enums.OrderStatus;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;

public interface IOrderItemService {
    Response placeOrder(OrderRequest orderRequest);
    Response updateOrderItemStatus(Long orderItemId, String status);
    Response filterOrderItems(OrderStatus status, LocalDateTime startDate, LocalDateTime endDate, Long itemId, Pageable pageable);
}
