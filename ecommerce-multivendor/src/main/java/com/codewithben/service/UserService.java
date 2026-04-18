package com.codewithben.service;

import com.codewithben.model.User;

public interface UserService {
    public User findUserByJwtToken(String jwt) throws Exception;
    User findUserByEmail(String email) throws Exception;
}
