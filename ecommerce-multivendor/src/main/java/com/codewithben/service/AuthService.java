package com.codewithben.service;

import com.codewithben.domain.USER_ROLE;
import com.codewithben.request.LoginRequest;
import com.codewithben.response.AuthResponse;
import com.codewithben.response.SignupRequest;

public interface AuthService {

   // void sendLoginOtp(String email, USER_ROLE role) throws Exception;
    void sendLoginOtp(String email) throws Exception;
    String createUser(SignupRequest req) throws Exception;

    AuthResponse signing(LoginRequest req) throws Exception;
}
