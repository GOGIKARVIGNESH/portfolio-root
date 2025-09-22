package com.example.portfolio.repository;

import com.example.portfolio.entity.Blog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BlogRepository extends JpaRepository<Blog, Long> {
    
    List<Blog> findByCategory(String category);
    
    @Query("SELECT b FROM Blog b WHERE " +
           "LOWER(b.title) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(b.excerpt) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "EXISTS (SELECT t FROM b.tags t WHERE LOWER(t) LIKE LOWER(CONCAT('%', :searchTerm, '%')))")
    List<Blog> findBySearchTerm(@Param("searchTerm") String searchTerm);
    
    @Query("SELECT b FROM Blog b WHERE " +
           "b.category = :category AND " +
           "(LOWER(b.title) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(b.excerpt) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "EXISTS (SELECT t FROM b.tags t WHERE LOWER(t) LIKE LOWER(CONCAT('%', :searchTerm, '%'))))")
    List<Blog> findByCategoryAndSearchTerm(@Param("category") String category, @Param("searchTerm") String searchTerm);
    
    List<Blog> findAllByOrderByDateDesc();
}


