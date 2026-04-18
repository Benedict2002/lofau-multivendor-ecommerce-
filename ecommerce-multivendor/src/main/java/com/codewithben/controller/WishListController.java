package com.codewithben.controller;

import com.codewithben.exeption.ProductException;
import com.codewithben.model.Product;
import com.codewithben.model.User;
import com.codewithben.model.WishList;
import com.codewithben.repository.WishListRepository;
import com.codewithben.service.ProductService;
import com.codewithben.service.UserService;
import com.codewithben.service.WishListService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/wishlist")
public class WishListController {
    private final WishListRepository wishListRepository;
    private final WishListService wishListService;
    private final ProductService productService;
    private final UserService userService;


//    @PostMapping("/create")
//    public ResponseEntity<WishList> createWishList(
//            @RequestBody User user) {
//        WishList wishList = wishListService.createWishList(user);
//        return ResponseEntity.ok(wishListRepository.save(wishList));
//    }


    @GetMapping()
    public ResponseEntity<WishList> getWishListByUserId(
            @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        WishList  wishList = wishListService.getWishListByUserId(user);
        return ResponseEntity.ok(wishList);

    }

    @PostMapping("/add-product/{productId}")
    public ResponseEntity<WishList> addProductToWishList(
            @PathVariable Long productId,
            @RequestHeader("Authorization") String jwt
    ) throws Exception {
        Product product = productService.findProductById(productId);
        User user  = userService.findUserByJwtToken(jwt);
        WishList updatedWishList= wishListService.addProductToWishList(
                user,product
        );
        return ResponseEntity.ok(updatedWishList);
    }


}
