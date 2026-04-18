package com.codewithben.repository;

import com.codewithben.model.Cart;
import com.codewithben.model.CartItem;
import com.codewithben.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {

    CartItem findByCartAndProductAndSize(Cart cart, Product product, String size);

}
