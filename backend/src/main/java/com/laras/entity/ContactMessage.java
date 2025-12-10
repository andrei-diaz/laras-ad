package com.laras.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

/**
 * Contact message entity for messages from the contact form.
 */
@Entity
@Table(name = "contact_messages")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ContactMessage extends BaseEntity {

    @NotBlank(message = "Name is required")
    @Size(max = 100)
    @Column(nullable = false)
    private String name;

    @NotBlank(message = "Email is required")
    @Email
    @Size(max = 100)
    @Column(nullable = false)
    private String email;

    @Size(max = 20)
    private String phone;

    @NotBlank(message = "Message is required")
    @Size(max = 2000)
    @Column(nullable = false, length = 2000)
    private String message;

    @Column(name = "is_read")
    @Builder.Default
    private Boolean isRead = false;
}
