package com.codewithben.service;

import com.codewithben.model.Cart;
import com.codewithben.model.CartItem;
import com.codewithben.model.Product;
import com.codewithben.model.User;

public interface CartService {

    public CartItem addCartItem(
          User user,
          Product product,
          String size,
          int quantity

    );

    public Cart findUserCart(User user);
}
