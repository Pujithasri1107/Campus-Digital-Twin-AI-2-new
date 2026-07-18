package com.campusai.aiservice.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

/**
 * Thin wrapper around the OpenAI /chat/completions endpoint.
 * Both TextClassifierService and ImageAnalyzerService use this so we don't
 * duplicate HTTP/JSON plumbing in three different places.
 */
@Service
public class OpenAiClient {

    private final WebClient webClient;
    private final ObjectMapper mapper = new ObjectMapper();

    @Autowired
    public OpenAiClient(WebClient openAiWebClient) {
        this.webClient = openAiWebClient;
    }

    /**
     * Sends a plain text-only chat request and returns the JSON content
     * the model replied with, already parsed into a JsonNode.
     * Assumes the system prompt instructs the model to respond in JSON only.
     */
    public JsonNode chatJson(String systemPrompt, String userText, double temperature) {
        ObjectNode body = buildBaseBody(temperature);

        ArrayNode messages = mapper.createArrayNode();
        messages.add(message("system", systemPrompt));
        messages.add(message("user", userText));
        body.set("messages", messages);

        return callAndParse(body);
    }

    /**
     * Sends a chat request that includes an image (base64-encoded) alongside
     * a text instruction. Used for photo classification.
     */
    public JsonNode chatJsonWithImage(String systemPrompt, String userInstruction,
                                       String base64Image, double temperature) {
        ObjectNode body = buildBaseBody(temperature);

        ArrayNode messages = mapper.createArrayNode();
        messages.add(message("system", systemPrompt));

        ObjectNode userMessage = mapper.createObjectNode();
        userMessage.put("role", "user");

        ArrayNode contentArray = mapper.createArrayNode();

        ObjectNode textPart = mapper.createObjectNode();
        textPart.put("type", "text");
        textPart.put("text", userInstruction);
        contentArray.add(textPart);

        ObjectNode imagePart = mapper.createObjectNode();
        imagePart.put("type", "image_url");
        ObjectNode imageUrl = mapper.createObjectNode();
        imageUrl.put("url", "data:image/jpeg;base64," + base64Image);
        imagePart.set("image_url", imageUrl);
        contentArray.add(imagePart);

        userMessage.set("content", contentArray);
        messages.add(userMessage);
        body.set("messages", messages);

        return callAndParse(body);
    }

    /** Plain free-text completion (no forced JSON) - used for the recurring-issue suggestion. */
    public String chatText(String systemPrompt, String userText, double temperature, int maxTokens) {
        ObjectNode body = mapper.createObjectNode();
        body.put("model", "gpt-4o-mini");
        body.put("temperature", temperature);
        body.put("max_tokens", maxTokens);

        ArrayNode messages = mapper.createArrayNode();
        messages.add(message("system", systemPrompt));
        messages.add(message("user", userText));
        body.set("messages", messages);

        String rawResponse = webClient.post()
                .uri("/chat/completions")
                .bodyValue(body)
                .retrieve()
                .bodyToMono(String.class)
                .block();

        try {
            JsonNode root = mapper.readTree(rawResponse);
            return root.path("choices").get(0).path("message").path("content").asText().trim();
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse OpenAI response: " + e.getMessage(), e);
        }
    }

    // ---------- helpers ----------

    private ObjectNode buildBaseBody(double temperature) {
        ObjectNode body = mapper.createObjectNode();
        body.put("model", "gpt-4o-mini");
        body.put("temperature", temperature);
        ObjectNode responseFormat = mapper.createObjectNode();
        responseFormat.put("type", "json_object");
        body.set("response_format", responseFormat);
        return body;
    }

    private ObjectNode message(String role, String content) {
        ObjectNode m = mapper.createObjectNode();
        m.put("role", role);
        m.put("content", content);
        return m;
    }

    private JsonNode callAndParse(ObjectNode body) {
        String rawResponse = webClient.post()
                .uri("/chat/completions")
                .bodyValue(body)
                .retrieve()
                .bodyToMono(String.class)
                .block();

        try {
            JsonNode root = mapper.readTree(rawResponse);
            String content = root.path("choices").get(0).path("message").path("content").asText();
            return mapper.readTree(content);
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse OpenAI response: " + e.getMessage(), e);
        }
    }
}
