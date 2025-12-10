package com.laras.controller;

import com.laras.dto.ContactMessageDto;
import com.laras.service.ContactMessageService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ContactMessageController {

    private final ContactMessageService contactMessageService;

    // Public endpoint - for contact form submission
    @PostMapping("/contact")
    public ResponseEntity<ContactMessageDto> submitContactForm(@Valid @RequestBody ContactMessageDto dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(contactMessageService.createMessage(dto));
    }

    // Admin endpoints
    @GetMapping("/admin/messages")
    public ResponseEntity<List<ContactMessageDto>> getAllMessages() {
        return ResponseEntity.ok(contactMessageService.getAllMessages());
    }

    @GetMapping("/admin/messages/unread")
    public ResponseEntity<List<ContactMessageDto>> getUnreadMessages() {
        return ResponseEntity.ok(contactMessageService.getUnreadMessages());
    }

    @GetMapping("/admin/messages/count")
    public ResponseEntity<Map<String, Long>> getUnreadCount() {
        return ResponseEntity.ok(Map.of("unread", contactMessageService.getUnreadCount()));
    }

    @GetMapping("/admin/messages/{id}")
    public ResponseEntity<ContactMessageDto> getMessageById(@PathVariable Long id) {
        return ResponseEntity.ok(contactMessageService.getMessageById(id));
    }

    @PatchMapping("/admin/messages/{id}/read")
    public ResponseEntity<Void> markAsRead(@PathVariable Long id) {
        contactMessageService.markAsRead(id);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/admin/messages/{id}/unread")
    public ResponseEntity<Void> markAsUnread(@PathVariable Long id) {
        contactMessageService.markAsUnread(id);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/admin/messages/{id}")
    public ResponseEntity<Void> deleteMessage(@PathVariable Long id) {
        contactMessageService.deleteMessage(id);
        return ResponseEntity.noContent().build();
    }
}
