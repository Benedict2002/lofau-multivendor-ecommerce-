package com.codewithben.repository;

import com.codewithben.model.Order;
import com.codewithben.model.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
}
