package com.laras.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ContactMessageDto {

    private Long id;

    @NotBlank(message = "Name is required")
    @Size(max = 100)
    private String name;

    @NotBlank(message = "Email is required")
    @Email
    @Size(max = 100)
    private String email;

    @Size(max = 20)
    private String phone;

    @NotBlank(message = "Message is required")
    @Size(max = 2000)
    private String message;

    private Boolean isRead;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}
