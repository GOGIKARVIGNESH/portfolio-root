package com.example.portfolio.repository;

import com.example.portfolio.entity.Skill;
import com.example.portfolio.entity.User;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SkillRepository extends JpaRepository<Skill, Long> {
    List<Skill> findByUserOrderByIdDesc(User user);
}

