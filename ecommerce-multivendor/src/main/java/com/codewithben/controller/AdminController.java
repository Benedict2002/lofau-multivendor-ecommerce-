package com.codewithben.controller;

import com.codewithben.domain.AccountStatus;
import com.codewithben.model.Seller;
import com.codewithben.service.HomeService;
import com.codewithben.service.SellerService;
import com.codewithben.service.impl.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class AdminController {
    private final HomeService homeService;
    private final SellerService sellerService;
    private final UserServiceImpl userService;

    @PatchMapping("/seller/{id}/status/{status}")
    public ResponseEntity<Seller> updateSellerStatus(
            @PathVariable Long id,
            @PathVariable AccountStatus status) throws Exception {
        Seller updateSeller = sellerService.updateSellerAccountStatus(id, status);
        return ResponseEntity.ok(updateSeller);
    }






}

