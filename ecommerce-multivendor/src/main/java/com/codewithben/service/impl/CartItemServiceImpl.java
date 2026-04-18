package com.codewithben.service.impl;

import com.codewithben.model.CartItem;
import com.codewithben.model.User;
import com.codewithben.repository.CartItemRepository;
import com.codewithben.service.CartItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CartItemServiceImpl  implements CartItemService {

    private final CartItemRepository cartItemRepository;


    @Override
    public CartItem updateCartItem(Long userId, Long id, CartItem cartItem) throws Exception {
       CartItem item =findCartItemById(id);

       User cartItemUser= item.getCart().getUser();

       if (cartItemUser.getId().equals(userId)) {
           item.setQuantity(cartItem.getQuantity());
           item.setMrpPrice(item.getQuantity()*item.getProduct().getMrpPrice());
           return cartItemRepository.save(item);
       }
       throw new Exception("you can't update this item");
    }

    @Override
    public void removeCartItem(Long userId, Long id) throws Exception {
        CartItem item =findCartItemById(id);

        User cartItemUser= item.getCart().getUser();

        if(cartItemUser.getId().equals(userId)){
            cartItemRepository.deleteById(id);
        }
        else throw new Exception("you can't  delete this item");

    }

    @Override
    public CartItem findCartItemById(Long id) throws Exception {
        return cartItemRepository.findById(id).orElseThrow
                (() -> new Exception("cart item not found with id - " + id));
    }
}
