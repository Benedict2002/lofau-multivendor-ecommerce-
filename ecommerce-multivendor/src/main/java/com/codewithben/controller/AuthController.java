package com.codewithben.controller;

import com.codewithben.domain.USER_ROLE;
import com.codewithben.model.User;
import com.codewithben.model.VerificationCode;
import com.codewithben.repository.UserRepository;
import com.codewithben.request.LoginOtpRequest;
import com.codewithben.request.LoginRequest;
import com.codewithben.response.ApiResponse;
import com.codewithben.response.AuthResponse;
import com.codewithben.response.SignupRequest;
import com.codewithben.service.AuthService;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final UserRepository userRepository;
    private final AuthService authService;

    @PostMapping("/signup")
   public ResponseEntity<AuthResponse> createUserHandler( @RequestBody SignupRequest req ) throws Exception {

        String jwt=authService.createUser( req );

        AuthResponse res=new AuthResponse();
        res.setJwt(jwt);
        res.setMessage("Register Success");
        res.setRole(USER_ROLE.ROLE_CUSTOMER);


       return ResponseEntity.ok(res);

   }

    @PostMapping("/sent/login-signup-otp")
    public ResponseEntity<ApiResponse> createOtpHandler(@RequestBody LoginOtpRequest req ) throws Exception {

      authService.sendLoginOtp( req.getEmail() );

        ApiResponse res=new ApiResponse();

        res.setMessage("Otp sent successfully");

        return ResponseEntity.ok(res);

    }

    @PostMapping("/signing")
    public ResponseEntity<AuthResponse> loginHandler(@RequestBody LoginRequest req ) throws Exception {

         AuthResponse authResponse=  authService.signing(req);



        return ResponseEntity.ok(authResponse);

    }
}
