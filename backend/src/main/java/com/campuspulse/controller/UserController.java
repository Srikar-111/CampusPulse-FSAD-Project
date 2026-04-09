package com.campuspulse.controller;

import com.campuspulse.dto.ApiResponse;
import com.campuspulse.model.User;
import com.campuspulse.repository.RegistrationRepository;
import com.campuspulse.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserRepository userRepository;
    private final RegistrationRepository registrationRepository;

    public UserController(UserRepository userRepository, RegistrationRepository registrationRepository) {
        this.userRepository = userRepository;
        this.registrationRepository = registrationRepository;
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse> getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByEmail(auth.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Map<String, Object> userData = new HashMap<>();
        userData.put("id", user.getId());
        userData.put("name", user.getName());
        userData.put("email", user.getEmail());
        userData.put("role", user.getRole().name());
        userData.put("registrationCount", registrationRepository.countByUserId(user.getId()));

        ApiResponse response = ApiResponse.builder()
                .success(true)
                .message("User retrieved successfully")
                .data(userData)
                .build();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse> getAllUsers() {
        List<User> users = userRepository.findAll();
        ApiResponse response = ApiResponse.builder()
                .success(true)
                .message("Users retrieved successfully")
                .data(users)
                .build();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/stats")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse> getStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalUsers", userRepository.count());
        stats.put("totalStudents", userRepository.findByRole(User.Role.STUDENT).size());
        stats.put("totalAdmins", userRepository.findByRole(User.Role.ADMIN).size());

        ApiResponse response = ApiResponse.builder()
                .success(true)
                .message("Stats retrieved successfully")
                .data(stats)
                .build();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
