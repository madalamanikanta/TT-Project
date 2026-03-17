package jar;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface InternshipRepository extends JpaRepository<Internship, Long> {

    /**
     * Find internship by external job ID to avoid duplicates
     */
    Optional<Internship> findByExternalLink(String externalLink);

    /**
     * Find internships by company
     */
    List<Internship> findByCompany(String company);

    /**
     * Search internships by title (case-insensitive)
     */
    List<Internship> findByTitleContainingIgnoreCase(String title);

    /**
     * Find internships by source (external API)
     */
    List<Internship> findBySource(String source);

    /**
     * Check if internship with external link already exists
     */
    boolean existsByExternalLink(String externalLink);

    /**
     * Fetch an internship and its skills in one query to avoid lazy loading issues.
     */
    @org.springframework.data.jpa.repository.Query("SELECT i FROM Internship i LEFT JOIN FETCH i.skills WHERE i.id = :id")
    java.util.Optional<Internship> findByIdWithSkills(@org.springframework.data.repository.query.Param("id") Long id);

    /**
     * Fetch all internships with skills in one query to avoid lazy loading issues.
     */
    @org.springframework.data.jpa.repository.Query("SELECT DISTINCT i FROM Internship i LEFT JOIN FETCH i.skills")
    java.util.List<Internship> findAllWithSkills();
}
