package com.campuspulse.service;

import com.campuspulse.dto.ClubDTO;
import com.campuspulse.model.Club;
import com.campuspulse.repository.ClubRepository;
import com.campuspulse.repository.RegistrationRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class ClubService {

    private final ClubRepository clubRepository;
    private final RegistrationRepository registrationRepository;

    public ClubService(ClubRepository clubRepository, RegistrationRepository registrationRepository) {
        this.clubRepository = clubRepository;
        this.registrationRepository = registrationRepository;
    }

    public List<ClubDTO> getAllClubs() {
        return clubRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public ClubDTO getClubById(Long id) {
        Club club = clubRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Club not found with id: " + id));
        return convertToDTO(club);
    }

    public List<ClubDTO> searchClubs(String name) {
        List<Club> clubs = clubRepository.findByNameContainingIgnoreCase(name);
        return clubs.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    @Transactional
    public ClubDTO createClub(ClubDTO clubDTO) {
        Club club = Club.builder()
                .name(clubDTO.getName())
                .description(clubDTO.getDescription())
                .imageUrl(clubDTO.getImageUrl())
                .color(clubDTO.getColor())
                .build();
        clubRepository.save(club);
        return convertToDTO(club);
    }

    @Transactional
    public ClubDTO updateClub(Long id, ClubDTO clubDTO) {
        Club club = clubRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Club not found with id: " + id));

        club.setName(clubDTO.getName());
        club.setDescription(clubDTO.getDescription());
        club.setImageUrl(clubDTO.getImageUrl());
        club.setColor(clubDTO.getColor());

        clubRepository.save(club);
        return convertToDTO(club);
    }

    @Transactional
    public void deleteClub(Long id) {
        Club club = clubRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Club not found with id: " + id));
        clubRepository.delete(club);
    }

    private ClubDTO convertToDTO(Club club) {
        long memberCount = club.getEvents().stream()
                .flatMap(e -> e.getRegistrations().stream())
                .distinct()
                .count();

        return ClubDTO.builder()
                .id(club.getId())
                .name(club.getName())
                .description(club.getDescription())
                .imageUrl(club.getImageUrl())
                .color(club.getColor())
                .memberCount((int) memberCount)
                .eventCount(club.getEvents().size())
                .createdAt(club.getCreatedAt())
                .build();
    }
}
