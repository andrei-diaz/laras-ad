package com.laras.config;

import com.laras.entity.User;
import com.laras.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

/**
 * Initializes default admin user on application startup if none exists.
 */
@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (userRepository.count() == 0) {
            User admin = User.builder()
                    .username("admin")
                    .email("admin@laras.com")
                    .password(passwordEncoder.encode("admin123"))
                    .active(true)
                    .build();

            userRepository.save(admin);
            log.info("Default admin user created: admin / admin123");
        }
    }
}
