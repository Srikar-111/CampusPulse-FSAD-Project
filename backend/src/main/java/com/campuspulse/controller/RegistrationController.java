package com.campuspulse.controller;

import com.campuspulse.dto.ApiResponse;
import com.campuspulse.dto.RegistrationDTO;
import com.campuspulse.model.User;
import com.campuspulse.repository.UserRepository;
import com.campuspulse.service.RegistrationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/registrations")
public class RegistrationController {

    private final RegistrationService registrationService;
    private final UserRepository userRepository;

    public RegistrationController(RegistrationService registrationService, UserRepository userRepository) {
        this.registrationService = registrationService;
        this.userRepository = userRepository;
    }

    @GetMapping("/my")
    public ResponseEntity<ApiResponse> getMyRegistrations() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByEmail(auth.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<RegistrationDTO> registrations = registrationService.getRegistrationsByUser(user.getId());
        ApiResponse response = ApiResponse.builder()
                .success(true)
                .message("Registrations retrieved successfully")
                .data(registrations)
                .build();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/event/{eventId}")
    public ResponseEntity<ApiResponse> registerForEvent(@PathVariable Long eventId) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByEmail(auth.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        try {
            RegistrationDTO registration = registrationService.registerForEvent(user.getId(), eventId);
            ApiResponse response = ApiResponse.builder()
                    .success(true)
                    .message("Successfully registered for event")
                    .data(registration)
                    .build();
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            ApiResponse response = ApiResponse.builder()
                    .success(false)
                    .message(e.getMessage())
                    .build();
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/event/{eventId}")
    public ResponseEntity<ApiResponse> cancelRegistration(@PathVariable Long eventId) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByEmail(auth.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        registrationService.cancelRegistration(user.getId(), eventId);
        ApiResponse response = ApiResponse.builder()
                .success(true)
                .message("Registration cancelled successfully")
                .build();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/event/{eventId}")
    public ResponseEntity<ApiResponse> getEventRegistrations(@PathVariable Long eventId) {
        List<RegistrationDTO> registrations = registrationService.getRegistrationsByEvent(eventId);
        ApiResponse response = ApiResponse.builder()
                .success(true)
                .message("Event registrations retrieved successfully")
                .data(registrations)
                .build();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
