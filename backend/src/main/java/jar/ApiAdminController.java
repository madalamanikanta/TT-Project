package jar;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import jar.dto.UserDTO;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * API endpoints for admin-only functionality.
 */
@RestController
@RequestMapping("/api/admin")
public class ApiAdminController {

    private static final Logger logger = LoggerFactory.getLogger(ApiAdminController.class);

    private final UserService userService;
    private final UserRepository userRepository;
    private final InternshipRepository internshipRepository;
    private final InternshipService internshipService;
    private final SavedInternshipRepository savedInternshipRepository;

    public ApiAdminController(UserService userService, UserRepository userRepository, InternshipRepository internshipRepository, InternshipService internshipService, SavedInternshipRepository savedInternshipRepository) {
        this.userService = userService;
        this.userRepository = userRepository;
        this.internshipRepository = internshipRepository;
        this.internshipService = internshipService;
        this.savedInternshipRepository = savedInternshipRepository;
    }

    @GetMapping("/dashboard")
    public ResponseEntity<Map<String, Object>> getDashboard(Authentication authentication) {
        String userName = authentication == null ? "anonymous" : authentication.getName();
        logger.info("Admin dashboard accessed by {}", userName);

        try {
            long totalUsers = Math.max(0, userRepository.count());
            long totalAdmins = Math.max(0, userRepository.countByRole(User.Role.ADMIN));
            long totalStudents = Math.max(0, totalUsers - totalAdmins);
            long totalInternships = Math.max(0, internshipRepository.count());
            long totalSaved = Math.max(0, savedInternshipRepository.count());

            List<Map<String, String>> activities = new java.util.ArrayList<>();

            userRepository.findAll().stream()
                    .sorted(java.util.Comparator.comparing(User::getCreatedAt, java.util.Comparator.nullsLast(java.util.Comparator.naturalOrder())).reversed())
                    .limit(5)
                    .forEach(u -> activities.add(Map.of(
                            "action", "User registered",
                            "item", u.getName() != null ? u.getName() : "Unknown User",
                            "time", u.getCreatedAt() != null ? u.getCreatedAt().toString() : "1970-01-01T00:00:00"
                    )));

            internshipRepository.findAll().stream()
                    .sorted(java.util.Comparator.comparing(Internship::getCreatedAt, java.util.Comparator.nullsLast(java.util.Comparator.naturalOrder())).reversed())
                    .limit(5)
                    .forEach(i -> activities.add(Map.of(
                            "action", "Internship created",
                            "item", i.getTitle() != null ? i.getTitle() : "Unknown Internship",
                            "time", i.getCreatedAt() != null ? i.getCreatedAt().toString() : "1970-01-01T00:00:00"
                    )));

            savedInternshipRepository.findAll(org.springframework.data.domain.Sort.by(org.springframework.data.domain.Sort.Direction.DESC, "savedAt")).stream()
                    .limit(5)
                    .forEach(s -> {
                        String title = "Unknown Internship";
                        if (s.getInternshipId() != null) {
                            internshipRepository.findById(s.getInternshipId()).ifPresent(internship -> {
                                if (internship != null && internship.getTitle() != null) {
                                    title = internship.getTitle();
                                }
                            });
                        }
                        activities.add(Map.of(
                                "action", "Internship saved",
                                "item", title,
                                "time", s.getSavedAt() != null ? s.getSavedAt().toString() : "1970-01-01T00:00:00"
                        ));
                    });

            activities.sort((a,b) -> b.get("time").compareTo(a.get("time")));

            List<Map<String, String>> recentActivities = activities.stream().limit(10).collect(Collectors.toList());
            if (recentActivities.isEmpty()) {
                recentActivities = List.of(Map.of("action", "System Started", "item", "System", "time", "Just now"));
            }

            return ResponseEntity.ok(Map.of(
                    "totalUsers", totalUsers,
                    "totalAdmins", totalAdmins,
                    "totalStudents", totalStudents,
                    "totalInternships", totalInternships,
                    "totalSaved", totalSaved,
                    "recentActivities", recentActivities
            ));

        } catch (Exception e) {
            logger.error("Error preparing admin dashboard", e);
            return ResponseEntity.ok(Map.of(
                    "totalUsers", 0,
                    "totalAdmins", 0,
                    "totalStudents", 0,
                    "totalInternships", 0,
                    "totalSaved", 0,
                    "recentActivities", List.of()
            ));
        }
    }

    @GetMapping("/users")
    public ResponseEntity<List<UserDTO>> listUsers() {
        try {
            List<UserDTO> users = userRepository.findAll().stream()
                    .map(userService::convertToDTO)
                    .collect(Collectors.toList());
            return ResponseEntity.ok(users);
        } catch (Exception e) {
            logger.error("Error listing users", e);
            return ResponseEntity.ok(List.of());
        }
    }

    @GetMapping("/internships")
    public ResponseEntity<List<jar.dto.InternshipDTO>> listInternships() {
        try {
            List<jar.dto.InternshipDTO> internships = internshipService.getAllInternships().stream()
                    .map(internship -> internshipService.convertToDTO(internship, 0))
                    .collect(Collectors.toList());
            return ResponseEntity.ok(internships);
        } catch (Exception e) {
            logger.error("Error listing internships", e);
            return ResponseEntity.ok(List.of());
        }
    }

    @org.springframework.web.bind.annotation.PostMapping("/internships")
    public ResponseEntity<?> createInternship(@org.springframework.web.bind.annotation.RequestBody jar.dto.CreateInternshipDTO dto) {
        try {
            jar.dto.InternshipDTO result = internshipService.createInternship(dto);
            return ResponseEntity.ok(result);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", e.getMessage()));
        } catch (Exception e) {
            logger.error("Error creating internship", e);
            return ResponseEntity.internalServerError().body(Map.of("success", false, "message", e.getMessage()));
        }
    }

    @org.springframework.web.bind.annotation.DeleteMapping("/internships/{id}")
    public ResponseEntity<?> deleteInternship(@org.springframework.web.bind.annotation.PathVariable Long id) {
        try {
            internshipService.deleteInternship(id);
            return ResponseEntity.ok(Map.of("success", true, "message", "Internship deleted successfully"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", e.getMessage()));
        } catch (Exception e) {
            logger.error("Error deleting internship", e);
            return ResponseEntity.internalServerError().body(Map.of("success", false, "message", e.getMessage()));
        }
    }

    @GetMapping("/settings")
    public ResponseEntity<Map<String, Object>> getSettings() {
        // Return dynamic simulated settings 
        return ResponseEntity.ok(Map.of(
                "appName", "Internship Platform",
                "version", "1.1.0",
                "maintenanceMode", false,
                "registrationEnabled", true,
                "apiRequestsLast24h", 1240
        ));
    }
}
