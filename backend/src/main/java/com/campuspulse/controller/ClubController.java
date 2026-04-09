package com.campuspulse.controller;

import com.campuspulse.dto.ApiResponse;
import com.campuspulse.dto.ClubDTO;
import com.campuspulse.service.ClubService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/clubs")
public class ClubController {

    private final ClubService clubService;

    public ClubController(ClubService clubService) {
        this.clubService = clubService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse> getAllClubs() {
        List<ClubDTO> clubs = clubService.getAllClubs();
        ApiResponse response = ApiResponse.builder()
                .success(true)
                .message("Clubs retrieved successfully")
                .data(clubs)
                .build();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getClubById(@PathVariable Long id) {
        ClubDTO club = clubService.getClubById(id);
        ApiResponse response = ApiResponse.builder()
                .success(true)
                .message("Club retrieved successfully")
                .data(club)
                .build();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse> searchClubs(@RequestParam String name) {
        List<ClubDTO> clubs = clubService.searchClubs(name);
        ApiResponse response = ApiResponse.builder()
                .success(true)
                .message("Search completed successfully")
                .data(clubs)
                .build();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse> createClub(@RequestBody ClubDTO clubDTO) {
        ClubDTO createdClub = clubService.createClub(clubDTO);
        ApiResponse response = ApiResponse.builder()
                .success(true)
                .message("Club created successfully")
                .data(createdClub)
                .build();
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse> updateClub(@PathVariable Long id, @RequestBody ClubDTO clubDTO) {
        ClubDTO updatedClub = clubService.updateClub(id, clubDTO);
        ApiResponse response = ApiResponse.builder()
                .success(true)
                .message("Club updated successfully")
                .data(updatedClub)
                .build();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse> deleteClub(@PathVariable Long id) {
        clubService.deleteClub(id);
        ApiResponse response = ApiResponse.builder()
                .success(true)
                .message("Club deleted successfully")
                .build();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
