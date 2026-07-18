package com.campusai.aiservice.service;

import com.campusai.aiservice.dto.PastComplaint;
import com.campusai.aiservice.dto.RecurringResult;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * AI FEATURE 3 - Recurring Problem Detection (Steps 6 & 11)
 * --------------------------------------------------------------
 * Looks at a location's complaint history and answers:
 *   - Has this happened before?
 *   - Is this location having repeated problems?
 *   - Should preventive maintenance be scheduled?
 *
 * Design note: pattern counting is done in plain Java (deterministic,
 * explainable, no API cost). The AI model is only used to turn the
 * pattern into a friendly, human-readable suggestion for the dashboard.
 */
@Service
public class RecurringPredictorService {

    // How many complaints of the SAME category within the window = "recurring"
    private static final int RECURRING_THRESHOLD_COUNT = 3;
    private static final int RECURRING_WINDOW_DAYS = 90;

    private final OpenAiClient openAiClient;

    public RecurringPredictorService(OpenAiClient openAiClient) {
        this.openAiClient = openAiClient;
    }

    public RecurringResult predict(String building, String room, List<PastComplaint> history) {
        String locationLabel = building + (room != null && !room.isBlank() ? ", Room " + room : "");

        if (history == null || history.isEmpty()) {
            return new RecurringResult(false, null, 0, "No prior history for this location yet.");
        }

        LocalDate cutoff = LocalDate.now().minusDays(RECURRING_WINDOW_DAYS);
        Map<String, Integer> counts = new HashMap<>();

        for (PastComplaint complaint : history) {
            LocalDate date;
            try {
                date = LocalDate.parse(complaint.getDate(), DateTimeFormatter.ISO_DATE);
            } catch (Exception e) {
                continue; // skip malformed dates
            }
            if (!date.isBefore(cutoff)) {
                counts.merge(complaint.getCategory(), 1, Integer::sum);
            }
        }

        if (counts.isEmpty()) {
            return new RecurringResult(false, null, 0,
                    "No complaints in the recent window for this location.");
        }

        String topCategory = null;
        int topCount = 0;
        for (Map.Entry<String, Integer> entry : counts.entrySet()) {
            if (entry.getValue() > topCount) {
                topCount = entry.getValue();
                topCategory = entry.getKey();
            }
        }

        boolean isRecurring = topCount >= RECURRING_THRESHOLD_COUNT;

        String suggestion;
        if (isRecurring) {
            suggestion = generateSuggestion(locationLabel, topCategory, topCount);
        } else {
            suggestion = locationLabel + " has " + topCount + " " + topCategory.toLowerCase()
                    + " complaint(s) recently - within normal range.";
        }

        return new RecurringResult(isRecurring, isRecurring ? topCategory : null, topCount, suggestion);
    }

    /** Turns the raw pattern into a natural-language recommendation for the admin dashboard. */
    private String generateSuggestion(String locationLabel, String category, int count) {
        try {
            return openAiClient.chatText(
                    "You write one short, direct sentence recommending preventive maintenance "
                            + "for a campus facility admin dashboard. No greetings, no fluff.",
                    locationLabel + " has had " + count + " " + category + " complaints in the last "
                            + RECURRING_WINDOW_DAYS + " days. Write the recommendation sentence.",
                    0.3,
                    60
            );
        } catch (Exception e) {
            // Deterministic fallback if the API call fails - dashboard still gets a useful message
            return locationLabel + " has had " + count + " " + category.toLowerCase()
                    + " complaints recently. Schedule preventive " + category.toLowerCase() + " maintenance.";
        }
    }
}
