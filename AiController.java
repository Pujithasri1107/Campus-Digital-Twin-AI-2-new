package com.campusai.aiservice.controller;

import com.campusai.aiservice.dto.*;
import com.campusai.aiservice.service.ImageAnalyzerService;
import com.campusai.aiservice.service.RecurringPredictorService;
import com.campusai.aiservice.service.TextClassifierService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

/**
 * Exposes the 3 AI features + 1 combined pipeline endpoint.
 *
 * Member 2's backend should call POST /api/ai/analyze-complaint right after
 * a student submits a complaint (this covers Steps 5, 6, 7 in one call).
 */
@RestController
@RequestMapping("/api/ai")
public class AiController {

    private final TextClassifierService textClassifierService;
    private final ImageAnalyzerService imageAnalyzerService;
    private final RecurringPredictorService recurringPredictorService;

    public AiController(TextClassifierService textClassifierService,
                         ImageAnalyzerService imageAnalyzerService,
                         RecurringPredictorService recurringPredictorService) {
        this.textClassifierService = textClassifierService;
        this.imageAnalyzerService = imageAnalyzerService;
        this.recurringPredictorService = recurringPredictorService;
    }

    @GetMapping("/health")
    public Map<String, String> health() {
        return Map.of("status", "AI service is running");
    }

    /** Step 5: Analyze complaint text -> category + priority + reasoning. */
    @PostMapping("/classify-text")
    public ClassificationResult classifyText(@Valid @RequestBody TextInput input) {
        return textClassifierService.classify(input.getDescription());
    }

    /** Step 5: Analyze uploaded photo -> category + priority + reasoning. */
    @PostMapping(value = "/analyze-image", consumes = "multipart/form-data")
    public ClassificationResult analyzeImage(@RequestParam("file") MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            throw new IllegalArgumentException("uploaded file is empty");
        }
        return imageAnalyzerService.analyze(file.getBytes());
    }

    /** Step 6 & 11: Check history -> is this location a repeat offender? */
    @PostMapping("/predict-recurring")
    public RecurringResult predictRecurring(@Valid @RequestBody RecurringInput input) {
        return recurringPredictorService.predict(input.getBuilding(), input.getRoom(), input.getHistory());
    }

    /**
     * ONE-CALL PIPELINE - this is the endpoint Member 2 (backend) should call
     * right after a student submits a complaint (Steps 5, 6, 7 combined).
     */
    @PostMapping(value = "/analyze-complaint", consumes = "multipart/form-data")
    public ComplaintAnalysisResult analyzeComplaint(
            @RequestParam("description") String description,
            @RequestParam("building") String building,
            @RequestParam(value = "room", required = false) String room,
            @RequestParam(value = "file", required = false) MultipartFile file
    ) throws IOException {

        ClassificationResult textResult = textClassifierService.classify(description);

        ClassificationResult imageResult = null;
        if (file != null && !file.isEmpty()) {
            imageResult = imageAnalyzerService.analyze(file.getBytes());
        }

        String finalCategory = textResult.getCategory();
        String finalPriority = textResult.getPriority();
        if (imageResult != null && imageResult.getConfidence() != null && imageResult.getConfidence() >= 0.6) {
            finalCategory = imageResult.getCategory();
            finalPriority = maxPriority(finalPriority, imageResult.getPriority());
        }

        // Backend should pass real history here; empty list is a safe default for a first submission.
        RecurringResult recurringResult = recurringPredictorService.predict(building, room, List.of());

        return new ComplaintAnalysisResult(finalCategory, finalPriority, textResult, imageResult, recurringResult);
    }

    /** High > Medium > Low. Used when merging text+image predictions. */
    private String maxPriority(String p1, String p2) {
        Map<String, Integer> order = Map.of("High", 3, "Medium", 2, "Low", 1);
        return order.getOrDefault(p1, 0) >= order.getOrDefault(p2, 0) ? p1 : p2;
    }
}
