package com.example.portfolio.repository;

import com.example.portfolio.entity.Achievement;
import com.example.portfolio.entity.User;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AchievementRepository extends JpaRepository<Achievement, Long> {
    List<Achievement> findByUserOrderByAchievedOnDesc(User user);
}

