package com.example.portfolio.controller;

import com.example.portfolio.entity.Achievement;
import com.example.portfolio.entity.User;
import com.example.portfolio.repository.AchievementRepository;
import com.example.portfolio.service.UserService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import java.time.LocalDate;
import java.util.List;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/users/{userId}/achievements")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class AchievementController {

    private final AchievementRepository achievementRepository;
    private final UserService userService;

    public AchievementController(AchievementRepository achievementRepository, UserService userService) {
        this.achievementRepository = achievementRepository;
        this.userService = userService;
    }

    @GetMapping
    public List<Achievement> list(@PathVariable Long userId) {
        User user = userService.getUserOrThrow(userId);
        return achievementRepository.findByUserOrderByAchievedOnDesc(user);
    }

    @PostMapping
    public ResponseEntity<Achievement> create(@PathVariable Long userId,
                                              @Valid @RequestBody AchievementRequest request) {
        User user = userService.getUserOrThrow(userId);
        Achievement achievement = new Achievement();
        achievement.setTitle(request.title());
        achievement.setDescription(request.description());
        achievement.setAchievedOn(request.achievedOn());
        achievement.setUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(achievementRepository.save(achievement));
    }

    @PutMapping("/{achievementId}")
    public Achievement update(@PathVariable Long userId,
                              @PathVariable Long achievementId,
                              @Valid @RequestBody AchievementRequest request) {
        User user = userService.getUserOrThrow(userId);
        Achievement achievement = getUserAchievement(user, achievementId);
        achievement.setTitle(request.title());
        achievement.setDescription(request.description());
        achievement.setAchievedOn(request.achievedOn());
        return achievementRepository.save(achievement);
    }

    @DeleteMapping("/{achievementId}")
    public ResponseEntity<Void> delete(@PathVariable Long userId, @PathVariable Long achievementId) {
        User user = userService.getUserOrThrow(userId);
        Achievement achievement = getUserAchievement(user, achievementId);
        achievementRepository.delete(achievement);
        return ResponseEntity.noContent().build();
    }

    private Achievement getUserAchievement(User user, Long achievementId) {
        return achievementRepository.findById(achievementId)
                .filter(item -> item.getUser().getId().equals(user.getId()))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Achievement not found"));
    }

    public record AchievementRequest(
            @NotBlank String title,
            String description,
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate achievedOn
    ) { }
}

