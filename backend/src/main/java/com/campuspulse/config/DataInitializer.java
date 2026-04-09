package com.campuspulse.config;

import com.campuspulse.model.Club;
import com.campuspulse.model.Event;
import com.campuspulse.model.Role;
import com.campuspulse.model.User;
import com.campuspulse.repository.ClubRepository;
import com.campuspulse.repository.EventRepository;
import com.campuspulse.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import java.time.LocalDate;
import java.time.LocalTime;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final ClubRepository clubRepository;
    private final EventRepository eventRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserRepository userRepository, ClubRepository clubRepository,
                           EventRepository eventRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.clubRepository = clubRepository;
        this.eventRepository = eventRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        // Create Admin User
        if (!userRepository.existsByEmail("admin@campuspulse.com")) {
            User admin = User.builder()
                    .name("Admin User")
                    .email("admin@campuspulse.com")
                    .password(passwordEncoder.encode("admin123"))
                    .role(Role.ADMIN)
                    .build();
            userRepository.save(admin);
            System.out.println("✓ Admin created: admin@campuspulse.com / admin123");
        }

        // Create Sample Students
        if (!userRepository.existsByEmail("student@campuspulse.com")) {
            User student1 = User.builder()
                    .name("John Doe")
                    .email("student@campuspulse.com")
                    .password(passwordEncoder.encode("student123"))
                    .role(Role.STUDENT)
                    .build();
            userRepository.save(student1);
            System.out.println("✓ Student created: student@campuspulse.com / student123");
        }

        // Create Sample Clubs
        if (clubRepository.count() == 0) {
            Club club1 = createClub("Google DSC", "Building the future with Google technologies", "from-blue-500 to-cyan-500");
            Club club2 = createClub("Music Club", "Jam sessions, concerts, and musical workshops", "from-pink-500 to-rose-500");
            Club club3 = createClub("Robotics Society", "Designing and building autonomous robots", "from-violet-500 to-purple-500");
            Club club4 = createClub("Art & Design", "Expressing creativity through various mediums", "from-emerald-500 to-teal-500");
            Club club5 = createClub("E-Cell", "Fostering innovation and entrepreneurship", "from-amber-500 to-orange-500");
            Club club6 = createClub("Literary Society", "Debates, poetry, and creative writing", "from-indigo-500 to-blue-500");

            System.out.println("✓ Sample clubs created");

            // Create Sample Events
            createEvent(club1, "AI Workshop 2024", "Deep dive into machine learning and AI",
                    LocalDate.of(2026, 4, 20), LocalTime.of(10, 0), "Tech Hub", "Academic",
                    "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800");

            createEvent(club2, "Music Fest Night", "Annual music festival featuring student bands",
                    LocalDate.of(2026, 4, 25), LocalTime.of(18, 0), "Auditorium", "Cultural",
                    "https://images.unsplash.com/photo-1459749411177-8c29142af60e?auto=format&fit=crop&q=80&w=800");

            createEvent(club5, "Startup Pitch Day", "Present your startup ideas to investors",
                    LocalDate.of(2026, 5, 2), LocalTime.of(14, 0), "Innovation Cell", "Business",
                    "https://images.unsplash.com/photo-1559136555-930b730e8583?auto=format&fit=crop&q=80&w=800");

            createEvent(club3, "Robotics Expo", "Showcase of student-built robots",
                    LocalDate.of(2026, 5, 10), LocalTime.of(11, 0), "Lab 3", "Academic",
                    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800");

            createEvent(club4, "Art Exhibition", "Student art showcase and sale",
                    LocalDate.of(2026, 5, 15), LocalTime.of(16, 0), "Art Gallery", "Cultural",
                    "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&q=80&w=800");

            createEvent(club1, "Hackathon 2024", "48-hour coding marathon",
                    LocalDate.of(2026, 5, 20), LocalTime.of(9, 0), "Main Hall", "Academic",
                    "https://images.unsplash.com/photo-1504384308090-c54be3855485?auto=format&fit=crop&q=80&w=800");

            System.out.println("✓ Sample events created");
        }
    }

    private Club createClub(String name, String description, String color) {
        return clubRepository.save(Club.builder()
                .name(name)
                .description(description)
                .color(color)
                .build());
    }

    private void createEvent(Club club, String name, String description,
                             LocalDate date, LocalTime time, String venue,
                             String category, String imageUrl) {
        eventRepository.save(Event.builder()
                .club(club)
                .name(name)
                .description(description)
                .date(date)
                .time(time)
                .venue(venue)
                .category(category)
                .imageUrl(imageUrl)
                .build());
    }
}
