package com.codewithben.controller;

import com.codewithben.domain.USER_ROLE;
import com.codewithben.model.User;
import com.codewithben.response.AuthResponse;
import com.codewithben.response.SignupRequest;
import com.codewithben.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;


    @GetMapping("/api/users/profile")
    public ResponseEntity<User> createUserHandler(
            @RequestHeader("Authorization") String jwt)
            throws Exception {
        System.out.println("jwt ---- "+jwt);

        User user=userService.findUserByJwtToken(jwt);



        return ResponseEntity.ok(user);

    }
}
