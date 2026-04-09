package com.campuspulse.service;

import com.campuspulse.dto.RegistrationDTO;
import com.campuspulse.model.Event;
import com.campuspulse.model.Registration;
import com.campuspulse.model.User;
import com.campuspulse.repository.EventRepository;
import com.campuspulse.repository.RegistrationRepository;
import com.campuspulse.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class RegistrationService {

    private final RegistrationRepository registrationRepository;
    private final UserRepository userRepository;
    private final EventRepository eventRepository;

    public RegistrationService(RegistrationRepository registrationRepository,
                               UserRepository userRepository, EventRepository eventRepository) {
        this.registrationRepository = registrationRepository;
        this.userRepository = userRepository;
        this.eventRepository = eventRepository;
    }

    public List<RegistrationDTO> getRegistrationsByUser(Long userId) {
        return registrationRepository.findByUserId(userId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<RegistrationDTO> getRegistrationsByEvent(Long eventId) {
        return registrationRepository.findByEventId(eventId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public RegistrationDTO registerForEvent(Long userId, Long eventId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found with id: " + eventId));

        if (registrationRepository.existsByUserIdAndEventId(userId, eventId)) {
            throw new RuntimeException("User already registered for this event");
        }

        Registration registration = Registration.builder()
                .user(user)
                .event(event)
                .status("CONFIRMED")
                .build();

        registrationRepository.save(registration);
        return convertToDTO(registration);
    }

    @Transactional
    public void cancelRegistration(Long userId, Long eventId) {
        Registration registration = registrationRepository.findByUserIdAndEventId(userId, eventId)
                .orElseThrow(() -> new RuntimeException("Registration not found"));
        registrationRepository.delete(registration);
    }

    public long getRegistrationCountForEvent(Long eventId) {
        return registrationRepository.countByEventId(eventId);
    }

    public long getRegistrationCountForUser(Long userId) {
        return registrationRepository.countByUserId(userId);
    }

    private RegistrationDTO convertToDTO(Registration registration) {
        return RegistrationDTO.builder()
                .id(registration.getId())
                .userId(registration.getUser().getId())
                .userName(registration.getUser().getName())
                .userEmail(registration.getUser().getEmail())
                .eventId(registration.getEvent().getId())
                .eventName(registration.getEvent().getName())
                .status(registration.getStatus())
                .registeredAt(registration.getRegisteredAt())
                .build();
    }
}
