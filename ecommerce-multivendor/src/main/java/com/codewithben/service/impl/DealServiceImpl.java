package com.codewithben.service.impl;

import com.codewithben.model.Deal;
import com.codewithben.model.HomeCategory;
import com.codewithben.repository.DealRepository;
import com.codewithben.repository.HomeCategoryRepository;
import com.codewithben.service.DealService;
import com.codewithben.service.HomeCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DealServiceImpl implements DealService {
    private final DealRepository dealRepository;
    private final HomeCategoryRepository homeCategoryRepository;

    @Override
    public List<Deal> getDeals() {
        return dealRepository.findAll();
    }

    @Override
    public Deal createDeal(Deal deal) {

        Long categoryId = deal.getCategory().getId();

        HomeCategory category = homeCategoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        Deal newDeal = new Deal();
        newDeal.setDiscount(deal.getDiscount());
        newDeal.setCategory(category);

        return dealRepository.save(newDeal);
    }

//    @Override
//    public Deal updateDeal(Deal deal, Long id) throws Exception {
//        Deal existingDeal = dealRepository.findById(id).orElse(null);
//        HomeCategory category=homeCategoryRepository.findById(deal.getCategory().getId()).orElse(null);
//
//        if(existingDeal!=null){
//            if(deal.getDiscount()!=null){
//                existingDeal.setDiscount(deal.getDiscount());
//            }
//            if(deal.getCategory()!=null){
//                existingDeal.setCategory(category);
//            }
//            return dealRepository.save(existingDeal);
//        }
//        throw new Exception("Deal not found");
//    }

    @Override
    public Deal updateDeal(Deal deal, Long id) throws Exception {

        Deal existingDeal = dealRepository.findById(id)
                .orElseThrow(() -> new Exception("Deal not found"));

        // update discount
        if (deal.getDiscount() != null) {
            existingDeal.setDiscount(deal.getDiscount());
        }

        // update category fields safely
        if (deal.getCategory() != null) {

            HomeCategory existingCategory = existingDeal.getCategory();

            if (existingCategory == null) {
                existingCategory = new HomeCategory();
            }

            if (deal.getCategory().getImage() != null) {
                existingCategory.setImage(deal.getCategory().getImage());
            }

            if (deal.getCategory().getCategoryId() != null) {
                existingCategory.setCategoryId(
                        deal.getCategory().getCategoryId()
                );
            }

            existingDeal.setCategory(existingCategory);
        }

        return dealRepository.save(existingDeal);
    }

    @Override
    public void deleteDeal(Long id) throws Exception {
        Deal deal1= dealRepository.findById(id).orElseThrow
                (()-> new Exception("deal not Found"));
        dealRepository.delete(deal1);
    }
}
