# AI Module — Campus Digital Twin + AI Maintenance Assistant (Java / Spring Boot)

**Role:** Member 4 — AI Engineer
**Stack:** Java 17 + Spring Boot 3 (matches Member 2's backend language)

This service implements the AI logic from Steps 5, 6, 7, and 11 of the project flow,
running as its own Spring Boot microservice so it can be deployed and scaled
independently from the main backend, while still being "the same language"
for the team.

---

## What this module does

| Feature | Endpoint | Maps to |
|---|---|---|
| Classify complaint text (category + priority) | `POST /api/ai/classify-text` | Step 5 |
| Classify uploaded photo (category + priority) | `POST /api/ai/analyze-image` | Step 5 |
| Detect repeated problems at a location | `POST /api/ai/predict-recurring` | Step 6, Step 11 |
| Full pipeline (text + image + history in one call) | `POST /api/ai/analyze-complaint` | Steps 5–7 combined |
| Health check | `GET /api/ai/health` | - |

---

## How it fits into the team's system

```
Student submits complaint (Frontend - Member 1)
        │
        ▼
Main Backend (Member 2, Spring Boot, e.g. port 8080)
        │
        ▼
This AI microservice (Member 4, Spring Boot, port 8081)
        │  POST /api/ai/analyze-complaint
        ▼
AI returns: category, priority, reasoning, recurring-issue flag
        │
        ▼
Backend saves result to Database (Member 3)
        │
        ▼
Admin Dashboard displays it (Member 5)
```

This is deployed as a **separate Spring Boot service** from Member 2's main
backend (different port, own `pom.xml`, own repo folder). They communicate
over plain HTTP/JSON — same pattern as calling any external REST API.
Member 2 can call it using `RestTemplate` or `WebClient`:

```java
WebClient client = WebClient.create("http://localhost:8081");
ComplaintAnalysisResult result = client.post()
        .uri("/api/ai/analyze-complaint")
        .body(BodyInserters.fromMultipartData(formData))
        .retrieve()
        .bodyToMono(ComplaintAnalysisResult.class)
        .block();
```

---

## Project structure

```
ai-maintenance-assistant-java/
├── pom.xml
└── src/main/
    ├── java/com/campusai/aiservice/
    │   ├── AiServiceApplication.java     # main entry point
    │   ├── config/
    │   │   ├── OpenAiConfig.java         # WebClient bean for OpenAI API
    │   │   └── WebConfig.java            # CORS setup
    │   ├── controller/
    │   │   └── AiController.java         # all REST endpoints
    │   ├── dto/                          # request/response objects
    │   │   ├── TextInput.java
    │   │   ├── ClassificationResult.java
    │   │   ├── PastComplaint.java
    │   │   ├── RecurringInput.java
    │   │   ├── RecurringResult.java
    │   │   └── ComplaintAnalysisResult.java
    │   └── service/
    │       ├── OpenAiClient.java             # shared HTTP helper for OpenAI calls
    │       ├── TextClassifierService.java    # AI Feature 1
    │       ├── ImageAnalyzerService.java     # AI Feature 2
    │       └── RecurringPredictorService.java# AI Feature 3
    └── resources/
        └── application.properties
```

---

## Setup

**Requirements:** Java 17+, Maven 3.9+

```bash
# 1. Clone your repo and enter this folder
cd ai-maintenance-assistant-java

# 2. Set your OpenAI API key as an environment variable
export OPENAI_API_KEY="sk-your-real-key"      # Windows: set OPENAI_API_KEY=sk-...

# 3. Run it
mvn spring-boot:run
```

Service starts on **http://localhost:8081**.

---

## Example: classify text

```bash
curl -X POST http://localhost:8081/api/ai/classify-text \
  -H "Content-Type: application/json" \
  -d '{"description": "Water leakage near Lab 2"}'
```

```json
{
  "category": "Plumbing",
  "priority": "High",
  "reasoning": "Active water leakage poses a flooding and safety risk.",
  "confidence": null
}
```

## Example: full pipeline (what the backend actually calls)

```bash
curl -X POST http://localhost:8081/api/ai/analyze-complaint \
  -F "description=The fan in classroom 204 is not spinning" \
  -F "building=Building A" \
  -F "room=204" \
  -F "file=@photo.jpg"
```

```json
{
  "category": "Electrical",
  "priority": "Medium",
  "textAnalysis": { "...": "..." },
  "imageAnalysis": { "...": "..." },
  "recurringCheck": {
    "recurring": true,
    "repeatedCategory": "Electrical",
    "occurrences": 3,
    "suggestion": "Building A has had frequent electrical issues. Schedule preventive maintenance."
  }
}
```

---

## Design decisions (good to mention during the presentation)

- **Why a separate Spring Boot service instead of adding this straight into
  Member 2's backend?** Keeps the AI logic independently deployable/scalable,
  and keeps Member 2's codebase from needing OpenAI-specific dependencies.
  It's still 100% Java, so the team only has one language to maintain overall.
- **Why `WebClient` instead of `RestTemplate`?** `RestTemplate` is in
  maintenance mode as of Spring 5+; `WebClient` is the modern standard.
- **Why is recurring-detection rule-based instead of ML?** With a small
  amount of complaint history (a few months of a real college project), a
  trained ML model would overfit. Counting complaints per category in a
  rolling time window is deterministic and explainable to judges — a real
  ML model is a natural v2 upgrade once more historical data exists.
- **Fallback handling:** Every AI call is wrapped in try/catch so if the
  OpenAI API is down or rate-limited, the pipeline still returns a safe
  default (`Medium` priority) instead of failing the whole complaint submission.

---

## Next steps / future work (Step 11 in the flow)

- Replace the rule-based recurring detector with a real trend model once
  there's enough historical data.
- Add a `/api/ai/summary` endpoint generating a weekly digest for admins.
- Cache identical repeated complaint text to avoid redundant API calls.
