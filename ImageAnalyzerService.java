package com.campusai.aiservice.service;

import com.campusai.aiservice.dto.ClassificationResult;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.stereotype.Service;

import java.util.Base64;
import java.util.Set;

/**
 * AI FEATURE 2 - Image Analysis
 * ---------------------------------
 * Reads the photo a student uploaded and figures out what kind of problem
 * it shows (e.g. broken chair -> Furniture, exposed wire -> Electrical).
 *
 * Uses OpenAI's vision-capable model (gpt-4o-mini handles both text and
 * images), so no separate image classification library is needed.
 */
@Service
public class ImageAnalyzerService {

    private static final Set<String> VALID_CATEGORIES =
            Set.of("Electrical", "Plumbing", "Furniture", "Civil", "Other");
    private static final Set<String> VALID_PRIORITIES = Set.of("High", "Medium", "Low");

    private static final String SYSTEM_PROMPT = """
            You are a campus facility triage assistant analyzing a photo
            of a maintenance issue. Look at the image and classify the problem.

            Rules for priority:
            - High: visible safety risk (exposed wires, sparking, flooding, broken glass, structural crack)
            - Medium: functional damage, not immediately dangerous (broken fan, cracked bench)
            - Low: cosmetic issue (peeling paint, dirty wall, minor scratch)

            Rules for category:
            - Electrical, Plumbing, Furniture, Civil, Other (same definitions as the text classifier)

            Respond with ONLY valid JSON in this exact shape, nothing else:
            {
              "category": "<Electrical, Plumbing, Furniture, Civil, or Other>",
              "priority": "<High, Medium, or Low>",
              "reasoning": "<one short sentence describing what you see>",
              "confidence": <number between 0 and 1>
            }
            """;

    private final OpenAiClient openAiClient;

    public ImageAnalyzerService(OpenAiClient openAiClient) {
        this.openAiClient = openAiClient;
    }

    public ClassificationResult analyze(byte[] imageBytes) {
        try {
            String base64Image = Base64.getEncoder().encodeToString(imageBytes);

            JsonNode result = openAiClient.chatJsonWithImage(
                    SYSTEM_PROMPT,
                    "Classify the maintenance issue in this photo.",
                    base64Image,
                    0.0
            );

            String category = result.path("category").asText("Other");
            String priority = result.path("priority").asText("Medium");
            String reasoning = result.path("reasoning").asText("");
            double confidence = result.path("confidence").asDouble(0.5);

            if (!VALID_CATEGORIES.contains(category)) category = "Other";
            if (!VALID_PRIORITIES.contains(priority)) priority = "Medium";

            return new ClassificationResult(category, priority, reasoning, confidence);

        } catch (Exception e) {
            return new ClassificationResult("Other", "Medium",
                    "AI image analysis failed (" + e.getMessage() + ")", 0.0);
        }
    }
}
