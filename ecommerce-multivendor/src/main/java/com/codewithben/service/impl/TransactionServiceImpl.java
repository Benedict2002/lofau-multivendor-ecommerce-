package com.codewithben.service.impl;

import com.codewithben.model.Order;
import com.codewithben.model.Seller;
import com.codewithben.model.Transaction;
import com.codewithben.repository.SellerRepository;
import com.codewithben.repository.TransactionRepository;
import com.codewithben.service.TransactionService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TransactionServiceImpl implements TransactionService {


    private final TransactionRepository transactionRepository;  // final ensures injection
    private final SellerRepository sellerRepository;            // final ensures injection

    @Override
    public Transaction createTransaction(Order order) {
        Seller seller = sellerRepository.findById(order.getSellerId())
                .orElseThrow(() -> new RuntimeException("Seller not found"));
        Transaction transaction = new Transaction();
        transaction.setSeller(seller);
        transaction.setCustomer(order.getUser());
        transaction.setOrder(order);

        return transactionRepository.save(transaction);
    }
//    @Autowired
//    private TransactionRepository transactionRepository;
//
//    private SellerRepository sellerRepository;
//
//    @Override
//    public Transaction createTransaction(Order order) {
//        Seller seller = sellerRepository.findById(order.getSellerId()).get();
//        Transaction transaction = new Transaction();
//        transaction.setSeller(seller);
//        transaction.setCustomer(order.getUser());
//        transaction.setOrder(order);
//
//        return transactionRepository.save(transaction);
//    }



    @Override
    public List<Transaction> getTransactionBySellerId(Seller seller) {


        return transactionRepository.findBySellerId(seller.getId());
    }

    @Override
    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll() ;
    }
}
