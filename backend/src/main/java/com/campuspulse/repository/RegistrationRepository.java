package com.campuspulse.repository;

import com.campuspulse.model.Registration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface RegistrationRepository extends JpaRepository<Registration, Long> {
    Optional<Registration> findByUserIdAndEventId(Long userId, Long eventId);
    List<Registration> findByUserId(Long userId);
    List<Registration> findByEventId(Long eventId);
    boolean existsByUserIdAndEventId(Long userId, Long eventId);
    long countByEventId(Long eventId);
    long countByUserId(Long userId);
}
