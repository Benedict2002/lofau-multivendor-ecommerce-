package com.codewithben.controller;

import com.codewithben.model.Home;
import com.codewithben.model.HomeCategory;
import com.codewithben.repository.HomeCategoryRepository;
import com.codewithben.service.HomeCategoryService;
import com.codewithben.service.HomeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping
public class HomeCategoryController {
    private final HomeCategoryRepository homeCategoryRepository;
    private final HomeCategoryService homeCategoryService;
    private final HomeService homeService;

    @PostMapping("/home/categories")
    public ResponseEntity<Home> createHomeCategory(
            @RequestBody List<HomeCategory> homeCategories)
            throws Exception {
        List<HomeCategory> categories = homeCategoryService.createCategories(homeCategories);
        Home home= homeService.createHomePageData(categories);
        return new ResponseEntity<>(home, HttpStatus.ACCEPTED);
    }

    @GetMapping("/admin/home-category")
    public ResponseEntity<List<HomeCategory>> getHomeCategory() {

        List<HomeCategory> categories = homeCategoryService.getAllHomeCategories();
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }

    @PatchMapping("/admin/home-category/{id}")
    public ResponseEntity<HomeCategory> updateHomeCategory(
            @PathVariable Long id,
            @RequestBody HomeCategory homeCategory
    ) throws Exception {
        HomeCategory updateCategory = homeCategoryService.updateHomeCategory(homeCategory,id);
        return new ResponseEntity<>(updateCategory, HttpStatus.OK);
    }
}
