package com.codewithben.controller;

import com.codewithben.exeption.ProductException;
import com.codewithben.exeption.SellerException;
import com.codewithben.model.Product;
import com.codewithben.model.Seller;
import com.codewithben.repository.CategoryRepository;
import com.codewithben.repository.ProductRepository;
import com.codewithben.repository.SellerRepository;
import com.codewithben.request.CreateProductRequest;
import com.codewithben.service.ProductService;
import com.codewithben.service.SellerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/sellers/products")
public class SellerProductController {
    private final SellerRepository sellerRepository;
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final SellerService sellerService;
    private final ProductService productService;


    @GetMapping()
    public ResponseEntity<List<Product>> getAllProductBySellerId(
            @RequestHeader("Authorization") String jwt) throws Exception {

        Seller seller= sellerService.getSellerProfile(jwt);

        List<Product> products = productService.getProductBySellerId(seller.getId());
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<Product> createProduct(@RequestBody CreateProductRequest request,
            @RequestHeader("Authorization") String jwt ) throws Exception {

        Seller seller= sellerService.getSellerProfile(jwt);

        Product product = productService.createProduct(request,seller);

    return new  ResponseEntity<>(product, HttpStatus.CREATED);
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<Void> deleteProduct(
            @PathVariable("productId") Long productId)
            throws Exception {
        try {
            productService.deleteProduct(productId);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (ProductException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{productId}")
    public ResponseEntity<Product> updateProduct(
            @PathVariable Long productId,
            @RequestBody Product product
    ){
        try {
            Product updatedProduct = productService.updateProduct(productId,product);
            return new ResponseEntity<>(updatedProduct, HttpStatus.OK);
        }catch (ProductException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
