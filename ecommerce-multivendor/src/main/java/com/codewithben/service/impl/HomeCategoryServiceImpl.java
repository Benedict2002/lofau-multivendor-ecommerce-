package com.codewithben.service.impl;

import com.codewithben.model.HomeCategory;
import com.codewithben.repository.HomeCategoryRepository;
import com.codewithben.service.HomeCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class HomeCategoryServiceImpl implements HomeCategoryService {
    private final HomeCategoryRepository homeCategoryRepository;



    @Override
    public HomeCategory createHomeCategory(HomeCategory homeCategory) {
        return homeCategoryRepository.save(homeCategory);
    }

    @Override
    public List<HomeCategory> createCategories(List<HomeCategory> homeCategories) {
        if (homeCategoryRepository.findAll().isEmpty()) {
            return homeCategoryRepository.saveAll(homeCategories);
        }

        return homeCategoryRepository.findAll();
    }

//    @Override
//    public HomeCategory updateHomeCategory(HomeCategory category, Long id) throws Exception {
//        HomeCategory existingCategory = homeCategoryRepository.findById(id).orElseThrow
//                (()-> new Exception("Category not found"));
//        if (category.getImage()!=null) {
//            existingCategory.setCategoryId(category.getCategoryId());
//        }
//        return homeCategoryRepository.save(existingCategory);
//    }

    @Override
    public HomeCategory updateHomeCategory(HomeCategory category, Long id) throws Exception {

        HomeCategory existing = homeCategoryRepository.findById(id)
                .orElseThrow(() -> new Exception("Category not found"));

        if (category.getCategoryId() != null) {
            existing.setCategoryId(category.getCategoryId());
        }

        if (category.getImage() != null) {
            existing.setImage(category.getImage());
        }

        if (category.getName() != null) {
            existing.setName(category.getName());
        }

        if (category.getSection() != null) {
            existing.setSection(category.getSection());
        }

        return homeCategoryRepository.save(existing);
    }

    @Override
    public List<HomeCategory> getAllHomeCategories() {
        return homeCategoryRepository.findAll();
    }
}
