package com.example.portfolio.config;

import com.example.portfolio.entity.Achievement;
import com.example.portfolio.entity.Blog;
import com.example.portfolio.entity.Project;
import com.example.portfolio.entity.Skill;
import com.example.portfolio.entity.User;
import com.example.portfolio.repository.AchievementRepository;
import com.example.portfolio.repository.BlogRepository;
import com.example.portfolio.repository.ProjectRepository;
import com.example.portfolio.repository.SkillRepository;
import com.example.portfolio.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired private ProjectRepository projectRepository;
    @Autowired private BlogRepository blogRepository;
    @Autowired private UserRepository userRepository;
    @Autowired private SkillRepository skillRepository;
    @Autowired private AchievementRepository achievementRepository;

    @Override
    public void run(String... args) throws Exception {
        // Initialize sample projects if database is empty
        if (projectRepository.count() == 0) {
            initializeProjects();
        }

        // Initialize sample blogs if database is empty
        if (blogRepository.count() == 0) {
            initializeBlogs();
        }

        if (userRepository.count() == 0) {
            initializeDefaultUser();
        }
    }

    private void initializeProjects() {
        List<Project> projects = Arrays.asList(
            new Project(
                "E-Commerce Platform",
                "A full-stack e-commerce solution with real-time inventory management",
                "Built with React, Node.js, and MongoDB. Features include user authentication, payment processing, admin dashboard, and real-time notifications.",
                "https://github.com/example/ecommerce",
                "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                Arrays.asList("React", "Node.js", "MongoDB", "Stripe"),
                "fullstack",
                LocalDate.of(2024, 1, 15)
            ),
            new Project(
                "Task Management App",
                "Collaborative task management with real-time updates",
                "A modern task management application with drag-and-drop functionality, team collaboration, and real-time updates using Socket.io.",
                "https://github.com/example/taskmanager",
                "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                Arrays.asList("React", "TypeScript", "Socket.io", "Express"),
                "web",
                LocalDate.of(2024, 2, 10)
            ),
            new Project(
                "Weather API Service",
                "RESTful API for weather data with caching",
                "High-performance weather API with Redis caching, rate limiting, and support for multiple data sources.",
                "https://github.com/example/weather-api",
                "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                Arrays.asList("Node.js", "Redis", "Express", "JWT"),
                "api",
                LocalDate.of(2024, 1, 28)
            ),
            new Project(
                "Mobile Banking App",
                "Cross-platform mobile banking application",
                "Secure mobile banking app built with React Native, featuring biometric authentication and real-time transaction monitoring.",
                "https://github.com/example/banking-app",
                "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                Arrays.asList("React Native", "Redux", "Firebase", "Biometric"),
                "mobile",
                LocalDate.of(2023, 12, 20)
            ),
            new Project(
                "Portfolio Website",
                "Modern responsive portfolio website with interactive features",
                "A fully responsive portfolio website built with React and modern CSS, featuring smooth animations, interactive components, and mobile-first design.",
                "https://github.com/example/portfolio",
                "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                Arrays.asList("React", "CSS3", "JavaScript", "Vite"),
                "web",
                LocalDate.of(2024, 2, 15)
            ),
            new Project(
                "AI Chat Application",
                "Real-time AI-powered chat application",
                "An intelligent chat application with AI integration, real-time messaging, and smart response suggestions using machine learning.",
                "https://github.com/example/ai-chat",
                "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                Arrays.asList("React", "Python", "OpenAI", "WebSocket"),
                "fullstack",
                LocalDate.of(2024, 1, 5)
            )
        );

        projectRepository.saveAll(projects);
    }

    private void initializeBlogs() {
        List<Blog> blogs = Arrays.asList(
            new Blog(
                "Getting Started with React Hooks",
                "Learn how to use React Hooks to write cleaner, more maintainable functional components.",
                "React Hooks revolutionized how we write React components by allowing us to use state and other React features in functional components. In this comprehensive guide, we'll explore the most commonly used hooks and how to implement them in your projects...",
                "Vignesh",
                LocalDate.of(2024, 2, 15),
                "tutorial",
                "5 min read",
                "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                Arrays.asList("React", "JavaScript", "Hooks", "Frontend")
            ),
            new Blog(
                "The Future of Web Development",
                "Exploring emerging trends and technologies that will shape the future of web development.",
                "The web development landscape is constantly evolving, with new frameworks, tools, and methodologies emerging regularly. In this article, we'll take a deep dive into the trends that are shaping the future of web development...",
                "Vignesh",
                LocalDate.of(2024, 2, 10),
                "thoughts",
                "8 min read",
                "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                Arrays.asList("Web Development", "Technology", "Trends", "Future")
            ),
            new Blog(
                "Building Responsive UIs with CSS Grid",
                "A comprehensive guide to creating flexible, responsive layouts using CSS Grid.",
                "CSS Grid is a powerful layout system that allows you to create complex, responsive designs with ease. In this tutorial, we'll cover the fundamentals of CSS Grid and how to use it to build modern, responsive user interfaces...",
                "Vignesh",
                LocalDate.of(2024, 2, 5),
                "tutorial",
                "6 min read",
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                Arrays.asList("CSS", "Grid", "Layout", "Responsive")
            ),
            new Blog(
                "My Journey as a Developer",
                "Reflecting on the challenges, victories, and lessons learned throughout my development career.",
                "Starting as a self-taught developer, I've learned that the journey is just as important as the destination. In this personal reflection, I share the ups and downs of my development career and the valuable lessons learned along the way...",
                "Vignesh",
                LocalDate.of(2024, 1, 28),
                "thoughts",
                "4 min read",
                "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                Arrays.asList("Career", "Personal", "Learning", "Reflection")
            ),
            new Blog(
                "Mastering JavaScript ES6+ Features",
                "A deep dive into modern JavaScript features that every developer should know.",
                "ES6+ brought revolutionary changes to JavaScript, making it more powerful and expressive. In this comprehensive guide, we'll explore the most important ES6+ features and how to use them effectively in your projects...",
                "Vignesh",
                LocalDate.of(2024, 1, 20),
                "tutorial",
                "7 min read",
                "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                Arrays.asList("JavaScript", "ES6", "Programming", "Tutorial")
            ),
            new Blog(
                "Building Scalable Node.js Applications",
                "Best practices and patterns for creating maintainable Node.js applications.",
                "Node.js has become the go-to platform for building scalable server-side applications. In this article, we'll explore best practices and architectural patterns that will help you build robust, maintainable Node.js applications...",
                "Vignesh",
                LocalDate.of(2024, 1, 15),
                "tutorial",
                "9 min read",
                "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                Arrays.asList("Node.js", "Backend", "Scalability", "Architecture")
            )
        );

        blogRepository.saveAll(blogs);
    }

    private void initializeDefaultUser() {
        User user = new User();
        user.setName("Demo User");
        user.setEmail("demo@portfolio.dev");
        user.setPasswordHash("$2a$10$Y2VkFDCJy8pwAvSCkrz0Q./oCPBnRgM4CHbYN59nYupXYuo84PWpK"); // password: demo123
        User savedUser = userRepository.save(user);

        List<Skill> skills = Arrays.asList(
                createSkill(savedUser, "React", "Advanced"),
                createSkill(savedUser, "Spring Boot", "Intermediate"),
                createSkill(savedUser, "UI/UX Design", "Intermediate")
        );
        skillRepository.saveAll(skills);

        List<Achievement> achievements = Arrays.asList(
                createAchievement(savedUser, "Best UI Award", "Won regional UI Hackathon", LocalDate.of(2023, 11, 12)),
                createAchievement(savedUser, "AWS Certified Developer", "Earned AWS certification", LocalDate.of(2024, 2, 2))
        );
        achievementRepository.saveAll(achievements);
    }

    private Skill createSkill(User user, String name, String level) {
        Skill skill = new Skill();
        skill.setName(name);
        skill.setLevel(level);
        skill.setUser(user);
        return skill;
    }

    private Achievement createAchievement(User user, String title, String description, LocalDate date) {
        Achievement achievement = new Achievement();
        achievement.setTitle(title);
        achievement.setDescription(description);
        achievement.setAchievedOn(date);
        achievement.setUser(user);
        return achievement;
    }
}




