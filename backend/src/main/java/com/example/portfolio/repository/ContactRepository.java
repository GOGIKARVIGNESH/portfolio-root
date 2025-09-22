package com.example.portfolio.repository;

import com.example.portfolio.entity.Contact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContactRepository extends JpaRepository<Contact, Long> {
    
    List<Contact> findByIsRead(Boolean isRead);
    
    List<Contact> findAllByOrderByCreatedAtDesc();
}


