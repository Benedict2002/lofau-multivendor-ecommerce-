package com.codewithben.config;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import java.util.Collections;
@Configuration
@EnableWebSecurity
public class AppConfig {

    //@Bean
   // public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        //http
          //      .sessionManagement(session -> session
            //            .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
              //  .authorizeHttpRequests(auth -> auth
                //        .requestMatchers("/api/products/*/reviews").permitAll()
                  //      .requestMatchers("/api/**").authenticated()
                    //    .anyRequest().permitAll())
              //  .addFilterBefore(new JwtTokenValidator(), BasicAuthenticationFilter.class)
               // .csrf(csrf -> csrf.disable())
                //.cors(cors -> cors.configurationSource(corsConfigurationSource()));
//
   //      return http.build();
    //}
        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

            http
                    .sessionManagement(session ->
                            session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                    )
                    .authorizeHttpRequests(auth -> auth
                            // 🔓 AUTH ENDPOINTS (VERY IMPORTANT)
                            .requestMatchers(
                                    "/sellers/login",
                                    "/auth/**",
                                    "/sellers/send-otp"
                            ).permitAll()

                            // Public APIs
                            .requestMatchers("/api/products/*/reviews").permitAll()

                            // Secured APIs
                            .requestMatchers("/api/**").authenticated()

                            .anyRequest().permitAll()
                    )
                    .addFilterBefore(new JwtTokenValidator(), BasicAuthenticationFilter.class)
                    .csrf(csrf -> csrf.disable())
                    .cors(cors -> cors.configurationSource(corsConfigurationSource()));

            return http.build();
        }


//    private CorsConfigurationSource corsConfigurationSource() {
//        return request -> {
//            CorsConfiguration cfg = new CorsConfiguration();
//            cfg.setAllowedOrigins(Collections.singletonList("http://localhost:5173/"));
//            cfg.setAllowedMethods(Collections.singletonList("*"));
//            cfg.setAllowedHeaders(Collections.singletonList("*"));
//            cfg.setAllowCredentials(true);
//            cfg.setExposedHeaders(Collections.singletonList("Authorization"));
//            cfg.setMaxAge(3600L);
//            return cfg;
//        };
//    }
private CorsConfigurationSource corsConfigurationSource() {
    return request -> {
        CorsConfiguration cfg = new CorsConfiguration();
        cfg.setAllowedOrigins(Collections.singletonList("http://localhost:5173")); // ✅ NO SLASH
        cfg.setAllowedMethods(Collections.singletonList("*"));
        cfg.setAllowedHeaders(Collections.singletonList("*"));
        cfg.setAllowCredentials(true);
        cfg.setExposedHeaders(Collections.singletonList("Authorization"));
        cfg.setMaxAge(3600L);
        return cfg;
    };
}


    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}
