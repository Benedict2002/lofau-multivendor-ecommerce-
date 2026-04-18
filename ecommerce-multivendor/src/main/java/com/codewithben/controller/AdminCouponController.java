package com.codewithben.controller;

import com.codewithben.model.Cart;
import com.codewithben.model.Coupon;
import com.codewithben.model.User;
import com.codewithben.repository.CouponRepository;
import com.codewithben.service.CartService;
import com.codewithben.service.CouponService;
import com.codewithben.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class AdminCouponController {

    private final CouponRepository couponRepository;
    private final CouponService couponService;
    private final UserService userService;
    private final CartService cartService;

    @PostMapping("/appy")
    public ResponseEntity<Cart> createCoupon(
            @RequestParam String  apply,
            @RequestParam String code,
            @RequestParam double orderValue,
            @RequestHeader("Authorization")String jwt
          ) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        Cart cart;

        if (apply.equals("true")){
            cart = couponService.applyCoupon(code, orderValue, user);

        }
        else {
            cart=couponService.removeCoupon(code, user);
        }

        return ResponseEntity.ok(cart);

    }

    //Addmin Operations

    @PostMapping("/admin/create")
    public ResponseEntity<Coupon> createCoupon(
            @RequestBody Coupon coupon
    ){
        Coupon createdCoupon = couponService.createCoupon(coupon);
        return ResponseEntity.ok(createdCoupon);

    }

    @DeleteMapping("/admin/delete/{id}")
    public ResponseEntity<?> deleteCoupon(
        @PathVariable Long id) throws Exception {
        couponService.deleteCoupon(id);
        return ResponseEntity.ok("Coupon deleted successfully");
    }

    @GetMapping("/admin/all")
    public ResponseEntity<List<Coupon>> getAllCoupons() {
        List<Coupon> allCoupons = couponService.findAllCoupons();
        return ResponseEntity.ok(allCoupons);
    }
}
