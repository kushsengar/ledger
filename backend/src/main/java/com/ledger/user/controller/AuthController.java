package com.ledger.user.controller;

import com.ledger.common.enums.Role;
import com.ledger.security.JwtProvider;
import com.ledger.user.dto.AuthResponse;
import com.ledger.user.dto.LoginRequest;
import com.ledger.user.dto.RegisterRequest;
import com.ledger.user.entity.User;
import com.ledger.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.username(), request.password())
        );
        User user = (User) auth.getPrincipal();
        String jwt = jwtProvider.generateToken(user, user.getRole().name());
        return ResponseEntity.ok(new AuthResponse(jwt, user.getUsername(), user.getRole(), user.getFullName()));
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        if (userRepository.existsByUsername(request.username())) {
            return ResponseEntity.badRequest().build();
        }
        User user = new User();
        user.setUsername(request.username());
        user.setPassword(passwordEncoder.encode(request.password()));
        user.setEmail(request.email());
        user.setFullName(request.fullName());
        user.setRole(request.role() != null ? request.role() : Role.APPLICANT);
        userRepository.save(user);

        String jwt = jwtProvider.generateToken(user, user.getRole().name());
        return ResponseEntity.ok(new AuthResponse(jwt, user.getUsername(), user.getRole(), user.getFullName()));
    }

    @GetMapping("/me")
    public ResponseEntity<AuthResponse> me() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) auth.getPrincipal();
        String jwt = jwtProvider.generateToken(user, user.getRole().name());
        return ResponseEntity.ok(new AuthResponse(jwt, user.getUsername(), user.getRole(), user.getFullName()));
    }
}
