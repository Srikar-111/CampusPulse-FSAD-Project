package com.campuspulse.repository;

import com.campuspulse.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    List<Event> findByClubId(Long clubId);
    List<Event> findByCategory(String category);
    List<Event> findByNameContainingIgnoreCase(String name);

    @Query("SELECT e FROM Event e WHERE e.date >= :today ORDER BY e.date ASC")
    List<Event> findUpcomingEvents(LocalDate today);

    List<Event> findByClubIdOrderByDateAsc(Long clubId);
}
