package com.codewithben.service.impl;

import com.codewithben.config.JwtProvider;
import com.codewithben.domain.AccountStatus;
import com.codewithben.domain.USER_ROLE;
import com.codewithben.exeption.SellerException;
import com.codewithben.model.Address;
import com.codewithben.model.BankDetails;
import com.codewithben.model.BusinessDetails;
import com.codewithben.model.Seller;
import com.codewithben.repository.AddressRepository;
import com.codewithben.repository.SellerRepository;
import com.codewithben.service.SellerService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SellerServiceImpl implements SellerService {
    private final SellerRepository sellerRepository;
    private final JwtProvider jwtProvider;
    private final PasswordEncoder passwordEncoder;
    private final AddressRepository addressRepository;



    @Override
    public Seller getSellerProfile(String jwt) throws Exception {
        String email =jwtProvider.getEmailFromJwtToken(jwt);

        return this.getSellerByEmail(email);
    }


    @Override
    public Seller createSeller(Seller seller) throws Exception {

        // 1. Check if seller already exists
        Seller sellerExist = sellerRepository.findByEmail(seller.getEmail());
        if(sellerExist != null){
            throw new Exception("seller already exist, use different email");
        }

        // 2. Save address
        Address savedAddress = addressRepository.save(seller.getPickupAddress());

        // 3. Create new seller object
        Seller newSeller = new Seller();
        newSeller.setEmail(seller.getEmail());
        newSeller.setPassword(passwordEncoder.encode(seller.getPassword()));
        newSeller.setSellerName(seller.getSellerName());
        newSeller.setPickupAddress(savedAddress);
        newSeller.setGSTIN(seller.getGSTIN());
        newSeller.setRole(USER_ROLE.ROLE_SELLER);
        newSeller.setMobile(seller.getMobile());
        newSeller.setBankDetails(seller.getBankDetails());
        newSeller.setBusinessDetails(seller.getBusinessDetails());

        // 4. Save seller
        return sellerRepository.save(newSeller);
    }


    @Override
    public Seller getSellerById(Long id) throws SellerException {

        return sellerRepository.findById(id).orElseThrow(()->new SellerException("seller not found with id -"+id));

    }

    @Override
    public Seller getSellerByEmail(String email) throws Exception {
        Seller seller=sellerRepository.findByEmail(email);

        if(seller==null){


            throw new Exception("Seller not found...."+email);
        }
        return seller;
    }

    @Override
    public List<Seller> getAllSellers(AccountStatus status) {
        return sellerRepository.findByAccountStatus(status);
    }

    @Override
    public Seller updateSeller(Long id, Seller seller) throws Exception {

        Seller existingSeller = this.getSellerById(id);
        System.out.println("Before update: " + existingSeller);

        if (seller.getSellerName() != null) {
            existingSeller.setSellerName(seller.getSellerName());
        }

        if (seller.getMobile() != null) {
            existingSeller.setMobile(seller.getMobile());
        }

        if (seller.getEmail() != null) {
            existingSeller.setEmail(seller.getEmail());
        }

        // Update business details field-by-field
        if (seller.getBusinessDetails() != null) {
            if (seller.getBusinessDetails().getBusinessName() != null) {
                existingSeller.getBusinessDetails().setBusinessName(
                        seller.getBusinessDetails().getBusinessName()
                );
            }
            if (seller.getBusinessDetails().getBusinessEmail() != null) {
                existingSeller.getBusinessDetails().setBusinessEmail(
                        seller.getBusinessDetails().getBusinessEmail()
                );
            }
            if (seller.getBusinessDetails().getBusinessAddress() != null) {
                existingSeller.getBusinessDetails().setBusinessAddress(
                        seller.getBusinessDetails().getBusinessAddress()
                );
            }
        }

        // Update bank details individually
        if (seller.getBankDetails() != null) {
            if (seller.getBankDetails().getAccountHolderName() != null) {
                existingSeller.getBankDetails().setAccountHolderName(
                        seller.getBankDetails().getAccountHolderName()
                );
            }
            if (seller.getBankDetails().getAccountNumber() != null) {
                existingSeller.getBankDetails().setAccountNumber(
                        seller.getBankDetails().getAccountNumber()
                );
            }
            if (seller.getBankDetails().getIfscCode() != null) {
                existingSeller.getBankDetails().setIfscCode(
                        seller.getBankDetails().getIfscCode()
                );
            }
        }

        // Update pickup address individually
        if (seller.getPickupAddress() != null) {
            if (seller.getPickupAddress().getAddress() != null) {
                existingSeller.getPickupAddress().setAddress(seller.getPickupAddress().getAddress());
            }
            if (seller.getPickupAddress().getCity() != null) {
                existingSeller.getPickupAddress().setCity(seller.getPickupAddress().getCity());
            }
            if (seller.getPickupAddress().getState() != null) {
                existingSeller.getPickupAddress().setState(seller.getPickupAddress().getState());
            }
            if (seller.getPickupAddress().getMobile() != null) {
                existingSeller.getPickupAddress().setMobile(seller.getPickupAddress().getMobile());
            }
            if (seller.getPickupAddress().getPinCode() != null) {
                existingSeller.getPickupAddress().setPinCode(seller.getPickupAddress().getPinCode());
            }
        }

        if (seller.getGSTIN() != null) {
            existingSeller.setGSTIN(seller.getGSTIN());
        }

        Seller saved = sellerRepository.save(existingSeller);
        System.out.println("After update -"+ saved);
        return saved;
    }




    @Override
    public void deleteSeller(Long id) throws Exception {
        Seller seller=getSellerById(id);
        sellerRepository.delete(seller);
    }

    @Override
    public Seller verifyEmail(String email, String otp) throws Exception {
        Seller seller = getSellerByEmail(email);
        seller.setEmailVerified(true);
        return sellerRepository.save(seller);
    }

    @Override
    public Seller updateSellerAccountStatus(Long sellerId, AccountStatus status) throws Exception {
        Seller seller = getSellerById(sellerId);
        seller.setAccountStatus(status);
        return sellerRepository.save(seller);
    }
}
