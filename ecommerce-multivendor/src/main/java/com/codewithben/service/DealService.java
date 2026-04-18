package com.codewithben.service;

import com.codewithben.model.Deal;
import com.codewithben.model.HomeCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DealService {
    List<Deal> getDeals();
    Deal createDeal(Deal deal);
    Deal updateDeal(Deal deal, Long id) throws Exception;
    void deleteDeal(Long id) throws Exception;
}
