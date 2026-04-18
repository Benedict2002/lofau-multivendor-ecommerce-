package com.codewithben.service.impl;

import com.codewithben.domain.USER_ROLE;
import com.codewithben.model.Seller;
import com.codewithben.model.User;
import com.codewithben.repository.SellerRepository;
import com.codewithben.repository.UserRepository;
import com.codewithben.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
@Service
@RequiredArgsConstructor
public class CustomUserServiceImpl implements UserDetailsService {
    private final UserRepository userRepository;
    private final SellerRepository sellerRepository;

    private static final String SELLER_PREFIX="seller_";

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        // Seller login
        if (username.startsWith(SELLER_PREFIX)) {
            System.out.println("Username received: '" + username + "'");
            System.out.println("SELLER_PREFIX: '" + SELLER_PREFIX + "'");
            System.out.println("Starts with prefix? " + username.startsWith(SELLER_PREFIX));

            String actualUsername = username.substring(SELLER_PREFIX.length());
            System.out.println("Actual username: '" + actualUsername + "'");

            Seller seller = sellerRepository.findByEmail(actualUsername);
            System.out.println("LOOKING FOR SELLER EMAIL: " + actualUsername);
            System.out.println("RESULT FROM DB: " + seller);

            if (seller == null) {
                throw new UsernameNotFoundException("Seller not found: " + actualUsername);
            }

            return buildUserDetails(
                    seller.getEmail(),
                    seller.getPassword(),
                    seller.getRole()
            );
        }

        // Normal user login
        User user = userRepository.findByEmail(username);

        if (user == null) {
            throw new UsernameNotFoundException("User not found: " + username);
        }

        return buildUserDetails(
                user.getEmail(),
                user.getPassword(),
                user.getRole()
        );
    }


    private UserDetails buildUserDetails(String email, String password, USER_ROLE role) {

        if (role==null) role= USER_ROLE.ROLE_CUSTOMER;

        List<GrantedAuthority> grantedAuthorities = new ArrayList<>();

        grantedAuthorities.add(new SimpleGrantedAuthority(role.toString()));


        return new org.springframework.security.core.userdetails.User(email,password,grantedAuthorities);
    }
}
