package com.campusai.aiservice.service;

import com.campusai.aiservice.dto.ClassificationResult;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.stereotype.Service;

import java.util.Set;

/**
 * AI FEATURE 1 - Text Classification
 * -------------------------------------
 * Reads the complaint description a student typed and figures out:
 *   - category   -> Electrical / Plumbing / Furniture / Civil / Other
 *   - priority   -> High / Medium / Low
 *   - reasoning  -> short explanation (shown on the admin dashboard)
 */
@Service
public class TextClassifierService {

    private static final Set<String> VALID_CATEGORIES =
            Set.of("Electrical", "Plumbing", "Furniture", "Civil", "Other");
    private static final Set<String> VALID_PRIORITIES = Set.of("High", "Medium", "Low");

    private static final String SYSTEM_PROMPT = """
            You are a campus facility triage assistant.
            A student has reported a maintenance problem. Read the description and classify it.

            Rules for priority:
            - High: safety risk, active water leakage, exposed wiring, electrical sparks,
              broken glass, anything that could injure someone or spread damage quickly.
            - Medium: functional problem that affects daily use but is not dangerous
              (broken fan, flickering light, jammed door).
            - Low: cosmetic or minor issue (scratched paint, loose sticker, minor stain).

            Rules for category:
            - Electrical: fans, lights, wiring, switches, sockets, ACs
            - Plumbing: leakage, taps, pipes, drainage, toilets
            - Furniture: chairs, benches, desks, cupboards
            - Civil: walls, ceiling, flooring, doors, windows (structural, non-electrical/plumbing)
            - Other: anything that doesn't clearly fit above

            Respond with ONLY valid JSON in this exact shape, nothing else:
            {
              "category": "<one of Electrical, Plumbing, Furniture, Civil, Other>",
              "priority": "<one of High, Medium, Low>",
              "reasoning": "<one short sentence explaining why>"
            }
            """;

    private final OpenAiClient openAiClient;

    public TextClassifierService(OpenAiClient openAiClient) {
        this.openAiClient = openAiClient;
    }

    public ClassificationResult classify(String description) {
        try {
            JsonNode result = openAiClient.chatJson(
                    SYSTEM_PROMPT,
                    "Complaint: \"" + description + "\"",
                    0.0
            );

            String category = result.path("category").asText("Other");
            String priority = result.path("priority").asText("Medium");
            String reasoning = result.path("reasoning").asText("");

            if (!VALID_CATEGORIES.contains(category)) category = "Other";
            if (!VALID_PRIORITIES.contains(priority)) priority = "Medium";

            return new ClassificationResult(category, priority, reasoning, null);

        } catch (Exception e) {
            // Fallback so the whole pipeline never crashes if the API call fails
            return ClassificationResult.fallback(e.getMessage());
        }
    }
}
