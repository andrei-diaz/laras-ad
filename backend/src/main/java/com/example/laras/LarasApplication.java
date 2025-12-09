package com.example.laras;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.persistence.autoconfigure.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = { "com.example.laras", "com.laras" })
@EntityScan(basePackages = { "com.example.laras", "com.laras" })
@EnableJpaRepositories(basePackages = { "com.example.laras", "com.laras" })
@ComponentScan(basePackages = { "com.example.laras", "com.laras" })
public class LarasApplication {

	public static void main(String[] args) {
		SpringApplication.run(LarasApplication.class, args);
	}

}
