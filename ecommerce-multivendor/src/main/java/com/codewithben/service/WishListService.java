package com.codewithben.service;

import com.codewithben.model.Product;
import com.codewithben.model.User;
import com.codewithben.model.WishList;

public interface WishListService {
    WishList createWishList(User user);
    WishList getWishListByUserId(User user);
    WishList addProductToWishList(User user, Product product);



}
