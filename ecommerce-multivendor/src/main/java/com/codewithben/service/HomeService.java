package com.codewithben.service;

import com.codewithben.model.Home;
import com.codewithben.model.HomeCategory;

import java.util.List;

public interface HomeService {

   Home createHomePageData(List<HomeCategory> allCategories);
}
