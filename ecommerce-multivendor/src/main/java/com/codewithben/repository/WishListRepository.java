package com.codewithben.repository;

import com.codewithben.model.WishList;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WishListRepository extends JpaRepository<WishList,Long> {
    WishList findByUserId(long userId);
}
