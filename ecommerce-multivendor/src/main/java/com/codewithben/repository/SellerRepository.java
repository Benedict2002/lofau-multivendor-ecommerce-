package com.codewithben.repository;

import com.codewithben.domain.AccountStatus;
import com.codewithben.model.Seller;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SellerRepository extends JpaRepository<Seller,Long> {

    Seller findByEmail(String email);
    List<Seller> findByAccountStatus(AccountStatus status);

    boolean existsByEmail(String email);
}
