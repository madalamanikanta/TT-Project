package jar;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

/**
 * Public endpoints for health checks and application info.
 */
@RestController
public class HomeController {

    @GetMapping("/")
    public Map<String, Object> root() {
        return Map.of(
                "status", "ok",
                "message", "Backend is running"
        );
    }
}
