package com.prepbuddy.service;

import com.prepbuddy.dto.AnswerEvaluationResponse;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;
import com.prepbuddy.dto.ResumeAnalysisResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.List;
import java.util.Map;

@Service
public class AIServiceImpl implements AIService{
    private final ChatClient chatClient;

    public AIServiceImpl(ChatClient.Builder chatClientBuilder) {
        this.chatClient = chatClientBuilder.build();
    }

    @Override
    public String generateResponse(String prompt) {
        return chatClient
                .prompt(prompt)
                .call()
                .content();
    }
    @Override
    public ResumeAnalysisResponse analyzeResume(String resumeText) {

        String prompt = """
                Analyze the following resume for a software engineering student.

                Return ONLY valid JSON in exactly this structure:

                {
                  "score": 0,
                  "strengths": [],
                  "weaknesses": [],
                  "atsSuggestions": [],
                  "missingSkills": []
                }

                Rules:
                - score must be between 0 and 100
                - strengths: maximum 5 items
                - weaknesses: maximum 5 items
                - atsSuggestions: maximum 5 items
                - missingSkills: maximum 5 items
                - Do not add markdown or ``` around the JSON.

                Resume:
                %s
                """.formatted(resumeText);

        String response = generateResponse(prompt);

        try {
            ObjectMapper objectMapper = new ObjectMapper();

            return objectMapper.readValue(
                    response,
                    ResumeAnalysisResponse.class
            );

        } catch (Exception e) {
            throw new RuntimeException("Failed to parse AI response", e);
        }
    }

    @Override
    public List<String> generateInterviewQuestions(
            String topic,
            String difficulty,
            int count) {

        String prompt = """
            Generate %d interview questions for a software engineering student.

            Topic: %s
            Difficulty: %s

            Return ONLY valid JSON in this exact structure:

            {
              "questions": [
                "Question 1",
                "Question 2"
              ]
            }

            Rules:
            - Generate exactly %d questions.
            - Questions must be relevant to the topic.
            - Questions should be suitable for a technical interview.
            - Do not add markdown or ``` around the JSON.
            """.formatted(count, topic, difficulty, count);

        String response = generateResponse(prompt);

        try {
            ObjectMapper objectMapper = new ObjectMapper();

            Map<String, List<String>> result =
                    objectMapper.readValue(response, Map.class);

            return result.get("questions");

        } catch (Exception e) {
            throw new RuntimeException(
                    "Failed to parse interview questions", e);
        }
    }

    @Override
    public AnswerEvaluationResponse evaluateAnswer(
            String question,
            String answer) {

        String prompt = """
            Evaluate the following technical interview answer.

            Question:
            %s

            Candidate Answer:
            %s

            Return ONLY valid JSON in exactly this structure:

            {
              "score": 0,
              "feedback": "",
              "strengths": [],
              "improvements": []
            }

            Rules:
            - score must be between 0 and 100
            - feedback should briefly explain the overall quality
            - strengths: maximum 5 items
            - improvements: maximum 5 items
            - Evaluate correctness, clarity and completeness
            - Do not add markdown or ``` around JSON.
            """.formatted(question, answer);

        String response = generateResponse(prompt);

        try {
            ObjectMapper objectMapper = new ObjectMapper();

            return objectMapper.readValue(
                    response,
                    AnswerEvaluationResponse.class
            );

        } catch (Exception e) {
            throw new RuntimeException(
                    "Failed to parse answer evaluation", e);
        }
    }
}
