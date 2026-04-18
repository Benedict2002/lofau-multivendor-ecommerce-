package com.codewithben.service.impl;

import com.codewithben.config.JwtProvider;
import com.codewithben.domain.USER_ROLE;
import com.codewithben.model.Cart;
import com.codewithben.model.Seller;
import com.codewithben.model.User;
import com.codewithben.model.VerificationCode;
import com.codewithben.repository.CartRepository;
import com.codewithben.repository.SellerRepository;
import com.codewithben.repository.UserRepository;
import com.codewithben.repository.VerificationCodeRepository;
import com.codewithben.request.LoginRequest;
import com.codewithben.response.AuthResponse;
import com.codewithben.response.SignupRequest;
import com.codewithben.service.AuthService;
import com.codewithben.service.EmailService;
import com.codewithben.utils.OtpUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthserviceImpl implements AuthService {


    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final CartRepository cartRepository;
    private final JwtProvider jwtProvider;
    private final VerificationCodeRepository verificationCodeRepository;
    private final EmailService emailService;
    private final CustomUserServiceImpl customUserServiceImpl;
    private final SellerRepository sellerRepository;

   /* @Override
    public void sendLoginOtp(String email, USER_ROLE role) throws Exception {
        String SIGNING_PREFIX = "signing_";

        // 1. REMOVE prefix correctly
        if (email.startsWith(SIGNING_PREFIX)) {
            email = email.substring(SIGNING_PREFIX.length());
        }

        // 2. CHECK if seller or user exists
        if (role.equals(USER_ROLE.ROLE_SELLER)) {
            Seller seller = sellerRepository.findByEmail(email);
            if (seller == null) {
                throw new Exception("Seller not found with provided email");
            }
        } else {
            User user = userRepository.findByEmail(email);
            if (user == null) {
                throw new Exception("User not exist with provided email");
            }
        }

        // 3. Delete previous OTP
        VerificationCode existing = verificationCodeRepository.findByEmail(email);
        if (existing != null) {
            verificationCodeRepository.delete(existing);
        }

        // 4. Generate and save OTP
        String otp = OtpUtil.generateOtp();
        VerificationCode verificationCode = new VerificationCode();
        verificationCode.setEmail(email);
        verificationCode.setOtp(otp);
        verificationCodeRepository.save(verificationCode);

        // 5. Send email
        String subject = "Lofau login/signup otp";
        String text = "your login/signup otp is - " + otp;
        emailService.sendVerificationOtpEmail(email, otp, subject, text);
    }*/
//   @Override
//   public void sendLoginOtp(String email, USER_ROLE role) throws Exception {
//
//       final String SIGNING_PREFIX = "signing_";
//
//       // 1. Remove prefix correctly
//       if (email != null && email.startsWith(SIGNING_PREFIX)) {
//           email = email.substring(SIGNING_PREFIX.length());
//       }
//
//       // 2. Validate role early (IMPORTANT)
//       if (role == null) {
//           throw new IllegalArgumentException("User role must not be null");
//       }
//
//       // 3. Check if seller or user exists (NULL-SAFE ENUM COMPARISON)
//       if (USER_ROLE.ROLE_SELLER.equals(role)) {
//
//           Seller seller = sellerRepository.findByEmail(email);
//           if (seller == null) {
//               throw new Exception("Seller not found with provided email");
//           }
//
//       } else if (USER_ROLE.ROLE_CUSTOMER.equals(role)) {
//
//           User user = userRepository.findByEmail(email);
//           if (user == null) {
//               throw new Exception("User does not exist with provided email");
//           }
//
//       } else {
//           throw new IllegalArgumentException("Unsupported user role: " + role);
//       }
//
//       // 4. Delete previous OTP if exists
//       VerificationCode existing = verificationCodeRepository.findByEmail(email);
//       if (existing != null) {
//           verificationCodeRepository.delete(existing);
//       }
//
//       // 5. Generate and save OTP
//       String otp = OtpUtil.generateOtp();
//       VerificationCode verificationCode = new VerificationCode();
//       verificationCode.setEmail(email);
//       verificationCode.setOtp(otp);
//       verificationCodeRepository.save(verificationCode);
//
//       // 6. Send email
//       String subject = "Ben Juma Login / Signup OTP";
//       String text = "Your login/signup OTP is: " + otp;
//       emailService.sendVerificationOtpEmail(email, otp, subject, text);
//   }

    @Override
    public void sendLoginOtp(String email) throws Exception {

        final String SIGNING_PREFIX = "signing_";

        // 1. Remove prefix if present
        if (email != null && email.startsWith(SIGNING_PREFIX)) {
            email = email.substring(SIGNING_PREFIX.length());
        }

        // 2. Check which account exists
        boolean sellerExists = sellerRepository.existsByEmail(email);
        boolean userExists   = userRepository.existsByEmail(email);
        //boolean adminExists  = adminRepository.existsByEmail(email);

        if (!sellerExists && !userExists /*&& !adminExists*/) {
            throw new Exception("No account found with the provided email");
        }

        // 3. Delete previous OTP if exists
        VerificationCode existing = verificationCodeRepository.findByEmail(email);
        if (existing != null) {
            verificationCodeRepository.delete(existing);
        }

        // 4. Generate new OTP
        String otp = OtpUtil.generateOtp();
        VerificationCode verificationCode = new VerificationCode();
        verificationCode.setEmail(email);
        verificationCode.setOtp(otp);
        verificationCodeRepository.save(verificationCode);

        // 5. Send OTP email
        String subject = "Lofau Login / Signup OTP";
        String text = "Your login/signup OTP is: " + otp;
        emailService.sendVerificationOtpEmail(email, otp, subject, text);
    }



    @Override
    public String createUser(SignupRequest req) throws Exception {

        VerificationCode verificationCode = verificationCodeRepository.findByEmail(req.getEmail());
        if (verificationCode == null || !verificationCode.getOtp().equals(req.getOtp())) {
            throw new Exception("wrong otp... usec");
        }

        User user = userRepository.findByEmail(req.getEmail());
        if (user == null) {
            User createdUser=new User();
            createdUser.setEmail(req.getEmail());
            createdUser.setFullName(req.getFullName());
            createdUser.setRole(USER_ROLE.ROLE_CUSTOMER);
            createdUser.setMobile("0740291124");
            createdUser.setPassword(passwordEncoder.encode(req.getOtp()));
            user = userRepository.save(createdUser);
            Cart cart=new Cart();
            cart.setUser(user);
            cartRepository.save(cart);
        }
        List<GrantedAuthority> grantedAuthorities = new ArrayList<>();
        grantedAuthorities.add(new SimpleGrantedAuthority(USER_ROLE.ROLE_CUSTOMER.toString()));

        Authentication authentication = new UsernamePasswordAuthenticationToken(user.getEmail(), null, grantedAuthorities);
        SecurityContextHolder.getContext().setAuthentication(authentication);



        return jwtProvider.generateToken(authentication);
    }

    @Override
    public AuthResponse signing(LoginRequest req) throws Exception {
       String username = req.getEmail();
       String otp = req.getOtp();
       
       Authentication authentication = authenticate(username,otp);
       SecurityContextHolder.getContext().setAuthentication(authentication);

       String token = jwtProvider.generateToken(authentication);

       AuthResponse authResponse = new AuthResponse();
       authResponse.setJwt(token);
       authResponse.setMessage("Login Success");


        Collection<? extends  GrantedAuthority> grantedAuthorities = authentication.getAuthorities();
        String roleName = grantedAuthorities.isEmpty()?null: grantedAuthorities.iterator().next().getAuthority();

        authResponse.setRole(USER_ROLE.ROLE_CUSTOMER.valueOf(roleName));




        return authResponse;
    }

//    private Authentication authenticate(String username, String otp) {
//
//        System.out.println("username in authenticate :"+username);
//       UserDetails userDetails= customUserServiceImpl.loadUserByUsername(username);
//
//        if (userDetails==null) {
//            throw new BadCredentialsException("Invalid username or password");
//        }
//        VerificationCode verificationCode = verificationCodeRepository.findByEmail(username);
//        System.out.println("OTP received from client: " + otp);
//        //System.out.println("OTP from database: " + dbOtp);
//
//        if (verificationCode==null||!verificationCode.getOtp().equals(otp)) {
//            throw new BadCredentialsException("wrong otp usecss");
//        }
//       return new  UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
//    }

    private Authentication authenticate(String username, String otp) {

        // Load user details (this already handles removing seller_ prefix)
        UserDetails userDetails = customUserServiceImpl.loadUserByUsername(username);

        if (userDetails == null) {
            throw new BadCredentialsException("Invalid username");
        }

        // Always get real email from UserDetails (NEVER use username directly)
        String realEmail = userDetails.getUsername();
        System.out.println("Real email for OTP validation: " + realEmail);

        VerificationCode verificationCode = verificationCodeRepository.findByEmail(realEmail);

        System.out.println("OTP received from client: " + otp);

        if (verificationCode == null) {
            throw new BadCredentialsException("OTP not found in database");
        }

        if (!verificationCode.getOtp().equals(otp)) {
            throw new BadCredentialsException("wrong otp");
        }

        return new UsernamePasswordAuthenticationToken(
                userDetails,
                null,
                userDetails.getAuthorities()
        );
    }

}
