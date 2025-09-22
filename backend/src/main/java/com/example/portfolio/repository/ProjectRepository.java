package com.example.portfolio.repository;

import com.example.portfolio.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    
    List<Project> findByCategory(String category);
    
    @Query("SELECT p FROM Project p WHERE " +
           "LOWER(p.title) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(p.shortDescription) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "EXISTS (SELECT t FROM p.technologies t WHERE LOWER(t) LIKE LOWER(CONCAT('%', :searchTerm, '%')))")
    List<Project> findBySearchTerm(@Param("searchTerm") String searchTerm);
    
    @Query("SELECT p FROM Project p WHERE " +
           "p.category = :category AND " +
           "(LOWER(p.title) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(p.shortDescription) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "EXISTS (SELECT t FROM p.technologies t WHERE LOWER(t) LIKE LOWER(CONCAT('%', :searchTerm, '%'))))")
    List<Project> findByCategoryAndSearchTerm(@Param("category") String category, @Param("searchTerm") String searchTerm);
    
    List<Project> findAllByOrderByDateDesc();
    
    List<Project> findAllByOrderByDateAsc();
    
    List<Project> findAllByOrderByTitleAsc();
}


