package com.codewithben.service.impl;

import com.codewithben.domain.HomeCategorySection;
import com.codewithben.model.Deal;
import com.codewithben.model.Home;
import com.codewithben.model.HomeCategory;
import com.codewithben.repository.DealRepository;
import com.codewithben.service.HomeService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class HomeServiceImpl implements HomeService {
    private DealRepository dealRepository;
    @Override
    public Home createHomePageData(List<HomeCategory> allCategories) {
        List<HomeCategory> gridCategories = allCategories.stream().
                                      filter(category->
                                              category.getSection()==HomeCategorySection.GRID)
                                                          .collect(Collectors.toList());

        List<HomeCategory> shopByCategories = allCategories.stream()
                .filter(category->
                                           category.getSection()==HomeCategorySection.SHOP_BY_CATEGORIES)
                .collect(Collectors.toList());

        List<HomeCategory> electricCategories = allCategories.stream()
                .filter((category)->
                                            category.getSection()==HomeCategorySection.ELECTRIC_CATEGORY)
                .collect(Collectors.toList());


        List<HomeCategory> dealCategories = allCategories.stream()
                .filter((category)->
                        category.getSection()==HomeCategorySection.DEALS)
                .collect(Collectors.toList());

        List<Deal> createDeals = new ArrayList<>();

        if(dealRepository.findAll().isEmpty()){
            List<Deal> deals = allCategories.stream()
                    .filter(category-> category.getSection()== HomeCategorySection.DEALS)
                    .map(category->new Deal(null,10,category))
                    .collect(Collectors.toList());
            createDeals= dealRepository.saveAll(deals);
        }else
            createDeals = dealRepository.findAll();

        Home home = new Home();
        home.setGrid(gridCategories);
        home.setShopByCategories(shopByCategories);
        home.setElectricCategories(electricCategories);
        home.setDealCategories(dealCategories);
        home.setDeals(createDeals);
        return home;


    }
}
