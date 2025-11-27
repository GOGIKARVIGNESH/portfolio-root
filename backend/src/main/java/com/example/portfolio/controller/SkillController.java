package com.example.portfolio.controller;

import com.example.portfolio.entity.Skill;
import com.example.portfolio.entity.User;
import com.example.portfolio.repository.SkillRepository;
import com.example.portfolio.service.UserService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/users/{userId}/skills")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class SkillController {

    private final SkillRepository skillRepository;
    private final UserService userService;

    public SkillController(SkillRepository skillRepository, UserService userService) {
        this.skillRepository = skillRepository;
        this.userService = userService;
    }

    @GetMapping
    public List<Skill> list(@PathVariable Long userId) {
        User user = userService.getUserOrThrow(userId);
        return skillRepository.findByUserOrderByIdDesc(user);
    }

    @PostMapping
    public ResponseEntity<Skill> create(@PathVariable Long userId, @Valid @RequestBody SkillRequest request) {
        User user = userService.getUserOrThrow(userId);
        Skill skill = new Skill();
        skill.setName(request.name());
        skill.setLevel(request.level());
        skill.setUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(skillRepository.save(skill));
    }

    @PutMapping("/{skillId}")
    public Skill update(@PathVariable Long userId,
                        @PathVariable Long skillId,
                        @Valid @RequestBody SkillRequest request) {
        User user = userService.getUserOrThrow(userId);
        Skill skill = getUserSkill(user, skillId);
        skill.setName(request.name());
        skill.setLevel(request.level());
        return skillRepository.save(skill);
    }

    @DeleteMapping("/{skillId}")
    public ResponseEntity<Void> delete(@PathVariable Long userId, @PathVariable Long skillId) {
        User user = userService.getUserOrThrow(userId);
        Skill skill = getUserSkill(user, skillId);
        skillRepository.delete(skill);
        return ResponseEntity.noContent().build();
    }

    private Skill getUserSkill(User user, Long skillId) {
        return skillRepository.findById(skillId)
                .filter(skill -> skill.getUser().getId().equals(user.getId()))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Skill not found"));
    }

    public record SkillRequest(@NotBlank String name, String level) { }
}

