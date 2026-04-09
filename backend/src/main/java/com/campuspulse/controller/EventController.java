package com.campuspulse.controller;

import com.campuspulse.dto.ApiResponse;
import com.campuspulse.dto.EventDTO;
import com.campuspulse.service.EventService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/events")
public class EventController {

    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse> getAllEvents() {
        List<EventDTO> events = eventService.getAllEvents();
        ApiResponse response = ApiResponse.builder()
                .success(true)
                .message("Events retrieved successfully")
                .data(events)
                .build();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/upcoming")
    public ResponseEntity<ApiResponse> getUpcomingEvents() {
        List<EventDTO> events = eventService.getUpcomingEvents();
        ApiResponse response = ApiResponse.builder()
                .success(true)
                .message("Upcoming events retrieved successfully")
                .data(events)
                .build();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getEventById(@PathVariable Long id) {
        EventDTO event = eventService.getEventById(id);
        ApiResponse response = ApiResponse.builder()
                .success(true)
                .message("Event retrieved successfully")
                .data(event)
                .build();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/club/{clubId}")
    public ResponseEntity<ApiResponse> getEventsByClub(@PathVariable Long clubId) {
        List<EventDTO> events = eventService.getEventsByClub(clubId);
        ApiResponse response = ApiResponse.builder()
                .success(true)
                .message("Club events retrieved successfully")
                .data(events)
                .build();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse> searchEvents(@RequestParam String query) {
        List<EventDTO> events = eventService.searchEvents(query);
        ApiResponse response = ApiResponse.builder()
                .success(true)
                .message("Search completed successfully")
                .data(events)
                .build();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<ApiResponse> getEventsByCategory(@PathVariable String category) {
        List<EventDTO> events = eventService.getEventsByCategory(category);
        ApiResponse response = ApiResponse.builder()
                .success(true)
                .message("Category events retrieved successfully")
                .data(events)
                .build();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse> createEvent(@RequestBody EventDTO eventDTO) {
        EventDTO createdEvent = eventService.createEvent(eventDTO);
        ApiResponse response = ApiResponse.builder()
                .success(true)
                .message("Event created successfully")
                .data(createdEvent)
                .build();
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse> updateEvent(@PathVariable Long id, @RequestBody EventDTO eventDTO) {
        EventDTO updatedEvent = eventService.updateEvent(id, eventDTO);
        ApiResponse response = ApiResponse.builder()
                .success(true)
                .message("Event updated successfully")
                .data(updatedEvent)
                .build();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse> deleteEvent(@PathVariable Long id) {
        eventService.deleteEvent(id);
        ApiResponse response = ApiResponse.builder()
                .success(true)
                .message("Event deleted successfully")
                .build();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
