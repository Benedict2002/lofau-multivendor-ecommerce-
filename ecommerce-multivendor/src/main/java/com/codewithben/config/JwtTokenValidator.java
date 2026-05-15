package com.codewithben.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.crypto.SecretKey;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class JwtTokenValidator extends OncePerRequestFilter {
//

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        String path = request.getServletPath();

        // ✅ SKIP AUTH ENDPOINTS
        if (path.startsWith("/auth") || path.startsWith("/sellers/login")) {
            filterChain.doFilter(request, response);
            return;
        }

        String jwt = request.getHeader("Authorization");

        if (jwt != null && jwt.startsWith("Bearer ")) {
            try {
                jwt = jwt.substring(7);

                SecretKey key = Keys.hmacShaKeyFor(JWT_CONSTANT.SECRET_KEY.getBytes());

                Claims claims = Jwts.parserBuilder()
                        .setSigningKey(key)
                        .build()
                        .parseClaimsJws(jwt)
                        .getBody();

                String email = String.valueOf(claims.get("email"));
                String authorities = String.valueOf(claims.get("authorities"));

                List<GrantedAuthority> auths =
                        AuthorityUtils.commaSeparatedStringToAuthorityList(authorities);

                Authentication auth =
                        new UsernamePasswordAuthenticationToken(email, null, auths);

                SecurityContextHolder.getContext().setAuthentication(auth);

            } catch (Exception e) {
                // ❌ DO NOT BLOCK PUBLIC REQUESTS
                SecurityContextHolder.clearContext();
            }
        }

        filterChain.doFilter(request, response);
    }



}
