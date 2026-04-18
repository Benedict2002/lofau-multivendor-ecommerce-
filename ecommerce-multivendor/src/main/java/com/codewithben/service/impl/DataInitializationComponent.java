package com.codewithben.service.impl;

import com.codewithben.domain.USER_ROLE;
import com.codewithben.model.User;
import com.codewithben.repository.TransactionRepository;
import com.codewithben.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializationComponent implements CommandLineRunner {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;




    @Override
    public void run(String... args) throws Exception {
       initializeAdminUser();
    }
    private void initializeAdminUser() {
        String adminUsername="jayben477@gmail.com";
        if (userRepository.findByEmail(adminUsername)==null) {
            User adminUser = new User();
            adminUser.setPassword(passwordEncoder.encode("codewithben"));
            adminUser.setFullName("AdminBen");
            adminUser.setEmail(adminUsername);
            adminUser.setRole(USER_ROLE.ROLE_ADMIN);
             userRepository.save(adminUser);
        }

    }
}
