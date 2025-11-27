package com.example.portfolio.controller;

import com.example.portfolio.entity.Contact;
import com.example.portfolio.repository.ContactRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contacts")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class ContactController {
    
    @Autowired
    private ContactRepository contactRepository;
    
    @PostMapping
    public ResponseEntity<Contact> createContact(@Valid @RequestBody Contact contact) {
        Contact savedContact = contactRepository.save(contact);
        return ResponseEntity.ok(savedContact);
    }
    
    @GetMapping
    public ResponseEntity<List<Contact>> getAllContacts() {
        List<Contact> contacts = contactRepository.findAllByOrderByCreatedAtDesc();
        return ResponseEntity.ok(contacts);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Contact> getContactById(@PathVariable Long id) {
        return contactRepository.findById(id)
                .map(contact -> ResponseEntity.ok(contact))
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/unread")
    public ResponseEntity<List<Contact>> getUnreadContacts() {
        List<Contact> unreadContacts = contactRepository.findByIsRead(false);
        return ResponseEntity.ok(unreadContacts);
    }
    
    @PutMapping("/{id}/mark-read")
    public ResponseEntity<Contact> markAsRead(@PathVariable Long id) {
        return contactRepository.findById(id)
                .map(contact -> {
                    contact.setIsRead(true);
                    return ResponseEntity.ok(contactRepository.save(contact));
                })
                .orElse(ResponseEntity.notFound().build());
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteContact(@PathVariable Long id) {
        return contactRepository.findById(id)
                .map(contact -> {
                    contactRepository.delete(contact);
                    return ResponseEntity.ok().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}




