package com.codewithben.exeption;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.server.ServerErrorException;

import java.time.LocalDateTime;

@ControllerAdvice
public class GLobalException {
    @ExceptionHandler(SellerException.class)
    public ResponseEntity<ErrorDetails> sellerExceptionHandler(SellerException se, WebRequest req){

        ErrorDetails errorDetails = new ErrorDetails();
        errorDetails.setDetails(req.getDescription(false));
        errorDetails.setError(se.getMessage());
        errorDetails.setTimestamp(LocalDateTime.now());
        return new ResponseEntity<>(errorDetails, HttpStatus.BAD_REQUEST);

    }
    @ExceptionHandler(ProductException.class)
    public ResponseEntity<ErrorDetails> productExceptionHandler(SellerException se, WebRequest req){

        ErrorDetails errorDetails = new ErrorDetails();
        errorDetails.setDetails(req.getDescription(false));
        errorDetails.setError(se.getMessage());
        errorDetails.setTimestamp(LocalDateTime.now());
        return new ResponseEntity<>(errorDetails, HttpStatus.BAD_REQUEST);

    }
}
