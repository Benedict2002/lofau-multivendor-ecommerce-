package com.codewithben.service.impl;

import com.codewithben.model.Product;
import com.codewithben.model.User;
import com.codewithben.model.WishList;
import com.codewithben.repository.WishListRepository;
import com.codewithben.service.WishListService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor

public class WishListServiceImpl implements WishListService {

    private final WishListRepository wishListRepository;

    @Override
    public WishList createWishList(User user) {
        WishList wishList = new WishList();
        wishList.setUser(user);
        return wishListRepository.save(wishList);
    }

    @Override
    public WishList getWishListByUserId(User user) {
        WishList wishList= wishListRepository.findByUserId(user.getId());
        if (wishList == null){
            wishList= createWishList(user);
        }
        return wishList;
    }

    @Override
    public WishList addProductToWishList(User user, Product product) {
        WishList wishList = getWishListByUserId(user);

        if (wishList.getProducts().contains(product)){
            wishList.getProducts().remove(product);
        }else
            wishList.getProducts().add(product);
        return wishListRepository.save(wishList);
    }
}
