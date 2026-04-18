package com.codewithben.controller;

import com.codewithben.model.Deal;
import com.codewithben.service.DealService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/admin/deals")
public class DealController {
    private final DealService dealService;



    @GetMapping
    public ResponseEntity<List<Deal>> getAllDeals() throws Exception {
        List<Deal> deals = dealService.getDeals();
        return new ResponseEntity<>(deals, HttpStatus.OK);
    }
    @PostMapping
    public ResponseEntity<Deal> createDeal(
            @RequestBody Deal deal)
            throws Exception {
        Deal createdDeal = dealService.createDeal(deal);
        return new ResponseEntity<>(createdDeal, HttpStatus.CREATED);

    }


    @PatchMapping("/{id}")
    public ResponseEntity<Deal> updateDeal(
            @PathVariable Long id,
            @RequestBody Deal deal
    ) throws Exception {
        Deal upateDeal = dealService.updateDeal(deal,id);
        return new ResponseEntity<>(upateDeal, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Deal> deleteDeal(
            @PathVariable Long id

    ) throws Exception {
        dealService.deleteDeal(id);
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }
}
