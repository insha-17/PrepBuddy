package com.prepbuddy.controller;


import com.prepbuddy.dto.auth.LoginRequest;
import com.prepbuddy.dto.auth.LoginResponse;
import com.prepbuddy.dto.auth.RegisterRequest;
import com.prepbuddy.dto.auth.RegisterResponse;
import com.prepbuddy.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

@RestController
@RequestMapping("/auth")
@Tag(name = "Authentication APIs",
        description = "Registration and Login APIs")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @Operation(summary = "Register New User")
    @ApiResponses({

            @ApiResponse(responseCode = "201",
                    description = "User Registered Successfully"),

            @ApiResponse(responseCode = "409",
                    description = "Email Already Exists")

    })
    @PostMapping("/register")
    public ResponseEntity<RegisterResponse> register(
            @Valid @RequestBody RegisterRequest request) {

        RegisterResponse response = authService.register(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(response);
    }


    @Operation(summary = "Login User")
    @ApiResponses({

            @ApiResponse(responseCode = "200",
                    description = "Login Successful"),

            @ApiResponse(responseCode = "401",
                    description = "Invalid Credentials")

    })
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(
            @Valid
            @RequestBody
            LoginRequest request){

        return ResponseEntity.ok(

                authService.login(request)

        );
    }
}
