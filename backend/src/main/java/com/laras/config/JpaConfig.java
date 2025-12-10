package com.laras.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

/**
 * JPA configuration to enable auditing for createdAt/updatedAt fields.
 */
@Configuration
@EnableJpaAuditing
public class JpaConfig {
}
