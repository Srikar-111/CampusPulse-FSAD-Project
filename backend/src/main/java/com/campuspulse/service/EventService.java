package com.campuspulse.service;

import com.campuspulse.dto.EventDTO;
import com.campuspulse.model.Club;
import com.campuspulse.model.Event;
import com.campuspulse.model.User;
import com.campuspulse.repository.ClubRepository;
import com.campuspulse.repository.EventRepository;
import com.campuspulse.repository.RegistrationRepository;
import com.campuspulse.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class EventService {

    private final EventRepository eventRepository;
    private final ClubRepository clubRepository;
    private final RegistrationRepository registrationRepository;
    private final UserRepository userRepository;

    public EventService(EventRepository eventRepository, ClubRepository clubRepository,
                        RegistrationRepository registrationRepository, UserRepository userRepository) {
        this.eventRepository = eventRepository;
        this.clubRepository = clubRepository;
        this.registrationRepository = registrationRepository;
        this.userRepository = userRepository;
    }

    public List<EventDTO> getAllEvents() {
        return eventRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<EventDTO> getUpcomingEvents() {
        return eventRepository.findUpcomingEvents(LocalDate.now()).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public EventDTO getEventById(Long id) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found with id: " + id));
        return convertToDTO(event);
    }

    public List<EventDTO> getEventsByClub(Long clubId) {
        return eventRepository.findByClubIdOrderByDateAsc(clubId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<EventDTO> searchEvents(String query) {
        List<Event> events = eventRepository.findByNameContainingIgnoreCase(query);
        return events.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public List<EventDTO> getEventsByCategory(String category) {
        return eventRepository.findByCategory(category).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public EventDTO createEvent(EventDTO eventDTO) {
        Club club = clubRepository.findById(eventDTO.getClubId())
                .orElseThrow(() -> new RuntimeException("Club not found with id: " + eventDTO.getClubId()));

        Event event = Event.builder()
                .name(eventDTO.getName())
                .description(eventDTO.getDescription())
                .date(eventDTO.getDate())
                .time(eventDTO.getTime())
                .venue(eventDTO.getVenue())
                .imageUrl(eventDTO.getImageUrl())
                .category(eventDTO.getCategory())
                .club(club)
                .build();

        eventRepository.save(event);
        return convertToDTO(event);
    }

    @Transactional
    public EventDTO updateEvent(Long id, EventDTO eventDTO) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found with id: " + id));

        event.setName(eventDTO.getName());
        event.setDescription(eventDTO.getDescription());
        event.setDate(eventDTO.getDate());
        event.setTime(eventDTO.getTime());
        event.setVenue(eventDTO.getVenue());
        event.setImageUrl(eventDTO.getImageUrl());
        event.setCategory(eventDTO.getCategory());

        if (eventDTO.getClubId() != null) {
            Club club = clubRepository.findById(eventDTO.getClubId())
                    .orElseThrow(() -> new RuntimeException("Club not found with id: " + eventDTO.getClubId()));
            event.setClub(club);
        }

        eventRepository.save(event);
        return convertToDTO(event);
    }

    @Transactional
    public void deleteEvent(Long id) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found with id: " + id));
        eventRepository.delete(event);
    }

    private EventDTO convertToDTO(Event event) {
        return EventDTO.builder()
                .id(event.getId())
                .name(event.getName())
                .description(event.getDescription())
                .date(event.getDate())
                .time(event.getTime())
                .venue(event.getVenue())
                .imageUrl(event.getImageUrl())
                .category(event.getCategory())
                .clubId(event.getClub().getId())
                .clubName(event.getClub().getName())
                .registrationCount(event.getRegistrations().size())
                .isRegistered(false)
                .createdAt(event.getCreatedAt())
                .build();
    }

    public EventDTO convertToDTOWithRegistration(Event event, Long userId) {
        EventDTO dto = convertToDTO(event);
        boolean isRegistered = registrationRepository.existsByUserIdAndEventId(userId, event.getId());
        dto.setRegistered(isRegistered);
        return dto;
    }
}
