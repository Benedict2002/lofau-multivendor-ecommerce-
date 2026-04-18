package com.codewithben.controller;

import com.codewithben.config.JwtProvider;
import com.codewithben.domain.AccountStatus;
import com.codewithben.exeption.SellerException;
import com.codewithben.model.Seller;
import com.codewithben.model.SellerReport;
import com.codewithben.model.VerificationCode;
import com.codewithben.repository.VerificationCodeRepository;
import com.codewithben.request.LoginRequest;
import com.codewithben.response.ApiResponse;
import com.codewithben.response.AuthResponse;
import com.codewithben.service.AuthService;
import com.codewithben.service.EmailService;
import com.codewithben.service.SellerReportService;
import com.codewithben.service.SellerService;
import com.codewithben.utils.OtpUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/sellers")
@Slf4j
public class SellerController {
    private final SellerService sellerService;
    private final VerificationCodeRepository verificationCodeRepository;
    private final AuthService authService;
    private final EmailService emailService;
    private final JwtProvider jwtProvider;
    private final SellerReportService sellerReportService;


    @PostMapping("/login")
    public ResponseEntity<AuthResponse> loginSeller(@RequestBody LoginRequest req) throws Exception {



        // Add the prefix ONLY for authentication logic
        req.setEmail("seller_" + req.getEmail());
        // DO NOT MODIFY EMAIL HERE
        //req.setEmail(req.getEmail());

        AuthResponse authResponse = authService.signing(req);

        return ResponseEntity.ok(authResponse);
    }


    @PatchMapping("/verify/{otp}")
    public ResponseEntity<Seller> verifySellerEmail(@PathVariable String otp) throws Exception {

        VerificationCode verificationCode = verificationCodeRepository.findByOtp(otp);

        // if OTP is not found OR does not match → throw error
        if (verificationCode == null || !verificationCode.getOtp().equals(otp)) {
            throw new Exception("Wrong OTP...");
        }

        // Otherwise, OTP is correct → verify seller
        Seller seller = sellerService.verifyEmail(verificationCode.getEmail(), otp);
        return new ResponseEntity<>(seller, HttpStatus.OK);
    }


    @PostMapping
    public ResponseEntity<Seller> createSeller(@RequestBody Seller seller) throws Exception {
       Seller savedSeller=sellerService.createSeller(seller);

       String otp = OtpUtil.generateOtp();


        VerificationCode verificationCode = new VerificationCode();
        verificationCode.setEmail(seller.getEmail());
        verificationCode.setOtp(otp);
        verificationCodeRepository.save(verificationCode);

        String subject = "Ben Juma Email Verification Code";
        String text = "Welcome to Ben Juma , verify your account using this link";
        String frontend_url="http://localhost:3000/verify-seller/";
        emailService.sendVerificationOtpEmail(seller.getEmail(),verificationCode.getOtp(),subject,text+frontend_url);
        return new ResponseEntity<>(savedSeller, HttpStatus.CREATED);

    }

    @GetMapping("/{id}")
    public ResponseEntity<Seller> getSellerById(@PathVariable Long id) throws SellerException {
        Seller seller=sellerService.getSellerById(id);
        return new ResponseEntity<>(seller, HttpStatus.OK);

    }

    @GetMapping("/profile")
    public ResponseEntity<Seller> getSellerJwt(
            @RequestHeader("Authorization")  String jwt
    ) throws Exception {
        Seller seller=sellerService.getSellerProfile(jwt);
        return new ResponseEntity<>(seller, HttpStatus.OK);
    }

    @GetMapping("/report")
    public ResponseEntity<SellerReport> getSellerReport(@RequestHeader("Authorization") String jwt) throws Exception {
        String email = jwtProvider.getEmailFromJwtToken(jwt);
        Seller seller = sellerService.getSellerByEmail(email);
        SellerReport report = sellerReportService.getSellerReport(seller);
        return new ResponseEntity<>(report, HttpStatus.OK);

    }

    @GetMapping
    public ResponseEntity<List<Seller>> getAllSellers(@RequestParam(required = false)AccountStatus status) throws Exception {
        List<Seller> sellers=sellerService.getAllSellers(status);
        return ResponseEntity.ok(sellers);

    }

    @PatchMapping("/update")
    public ResponseEntity<Seller> updateSeller(
            @RequestHeader("Authorization") String jwt,
            @RequestBody Seller seller) throws Exception {
        Seller profile=sellerService.getSellerProfile(jwt);
        Seller updatedSeller= sellerService.updateSeller(profile.getId(), seller);
        return ResponseEntity.ok(updatedSeller);
    }



    @DeleteMapping("/id")
    public ResponseEntity<Void> deleteSeller(
            @PathVariable Long id) throws Exception {
        sellerService.deleteSeller(id);
        return ResponseEntity.noContent().build();
    }








}
