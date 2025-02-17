package com.JGalaxy.JGalaxy.reponsitory;

import com.JGalaxy.JGalaxy.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepo extends JpaRepository<Order, Long> {
}
