package com.codewithben.service;

import com.codewithben.model.Seller;
import com.codewithben.model.SellerReport;

public interface SellerReportService {
    SellerReport getSellerReport(Seller sellerId);
    SellerReport updateSellerReport(SellerReport sellerReport);
}
