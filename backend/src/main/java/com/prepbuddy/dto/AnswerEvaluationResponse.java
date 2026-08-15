package com.prepbuddy.dto;

import lombok.Data;
import java.util.List;

@Data
public class AnswerEvaluationResponse {

    private int score;
    private String feedback;
    private List<String> strengths;
    private List<String> improvements;
}