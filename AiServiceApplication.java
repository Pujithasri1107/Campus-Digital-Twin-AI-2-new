package com.campusai.aiservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Campus Digital Twin + AI Maintenance Assistant
 * ------------------------------------------------
 * AI MODULE (Member 4 responsibility) - Java / Spring Boot version.
 *
 * Run with: mvn spring-boot:run
 * Then open http://localhost:8081/api/ai/health to confirm it's up.
 */
@SpringBootApplication
public class AiServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(AiServiceApplication.class, args);
    }
}
