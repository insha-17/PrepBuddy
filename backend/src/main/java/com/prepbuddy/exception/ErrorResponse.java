package com.prepbuddy.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Getter
@Setter
@AllArgsConstructor
public class ErrorResponse {

    private LocalDateTime timestamp;

    private int status;
    private String error;
    private String message;
    private String path;
}
