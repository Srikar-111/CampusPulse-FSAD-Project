package com.campuspulse.controller;

import com.campuspulse.dto.ApiResponse;
import com.campuspulse.dto.AuthResponse;
import com.campuspulse.dto.LoginRequest;
import com.campuspulse.dto.RegisterRequest;
import com.campuspulse.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse> register(@Valid @RequestBody RegisterRequest request) {
        try {
            AuthResponse response = authService.register(request);
            ApiResponse apiResponse = ApiResponse.builder()
                    .success(true)
                    .message("Registration successful")
                    .data(response)
                    .build();
            return new ResponseEntity<>(apiResponse, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            ApiResponse apiResponse = ApiResponse.builder()
                    .success(false)
                    .message(e.getMessage())
                    .build();
            return new ResponseEntity<>(apiResponse, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse> login(@Valid @RequestBody LoginRequest request) {
        try {
            AuthResponse response = authService.login(request);
            ApiResponse apiResponse = ApiResponse.builder()
                    .success(true)
                    .message("Login successful")
                    .data(response)
                    .build();
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
        } catch (Exception e) {
            ApiResponse apiResponse = ApiResponse.builder()
                    .success(false)
                    .message("Invalid email or password")
                    .build();
            return new ResponseEntity<>(apiResponse, HttpStatus.UNAUTHORIZED);
        }
    }
}
