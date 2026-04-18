package com.codewithben.service;

import com.codewithben.model.Order;
import com.codewithben.model.Seller;
import com.codewithben.model.Transaction;

import java.util.List;

public interface TransactionService {

    Transaction createTransaction(Order order);
    List<Transaction> getTransactionBySellerId(Seller seller);
    List<Transaction> getAllTransactions();

}
