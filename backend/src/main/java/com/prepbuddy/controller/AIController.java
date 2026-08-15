package com.prepbuddy.controller;
import com.prepbuddy.dto.ResumeAnalysisResponse;
import com.prepbuddy.service.AIService;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.prepbuddy.dto.AnswerEvaluationResponse;
@RestController
@RequestMapping("/ai")
public class AIController {
    private final AIService aiService;

    public AIController(AIService aiService) {
        this.aiService = aiService;
    }

    @PostMapping("/resume/analyze")
    public ResumeAnalysisResponse analyzeResume(
            @RequestBody String resumeText) {

        return aiService.analyzeResume(resumeText);
    }

    @PostMapping("/interview/questions")
    public List<String> generateInterviewQuestions(
            @RequestParam String topic,
            @RequestParam String difficulty,
            @RequestParam int count) {

        return aiService.generateInterviewQuestions(
                topic,
                difficulty,
                count
        );
    }

    @PostMapping("/interview/evaluate")
    public AnswerEvaluationResponse evaluateAnswer(
            @RequestParam String question,
            @RequestParam String answer) {

        return aiService.evaluateAnswer(question, answer);
    }
}
