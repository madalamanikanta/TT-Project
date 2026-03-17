package jar;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    /**
     * Find user by email address
     */
    Optional<User> findByEmail(String email);

    /**
     * Check if email already exists
     */
    boolean existsByEmail(String email);

    /**
     * Find active user by email
     */
    Optional<User> findByEmailAndIsActiveTrue(String email);

    /**
     * Find all users matching a given role.
     */
    java.util.List<User> findByRole(User.Role role);

    /**
     * Count users by role.
     */
    long countByRole(User.Role role);

    /**
     * Fetch a user with skills to avoid lazy loading issues.
     */
    @org.springframework.data.jpa.repository.Query("SELECT u FROM User u LEFT JOIN FETCH u.skills WHERE u.id = :id")
    java.util.Optional<User> findByIdWithSkills(@org.springframework.data.repository.query.Param("id") Long id);
}
