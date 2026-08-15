package com.prepbuddy.service;

import com.prepbuddy.dto.ResumeAnalysisResponse;
import com.prepbuddy.dto.AnswerEvaluationResponse;
import java.util.List;

public interface AIService {
    String generateResponse(String prompt);
    ResumeAnalysisResponse analyzeResume(String resumeText);
    List<String> generateInterviewQuestions(
            String topic,
            String difficulty,
            int count
    );
    AnswerEvaluationResponse evaluateAnswer(
            String question,
            String answer
    );
}
