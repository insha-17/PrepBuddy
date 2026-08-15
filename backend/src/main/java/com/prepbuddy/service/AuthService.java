package com.prepbuddy.service;

import com.prepbuddy.dto.auth.LoginRequest;
import com.prepbuddy.dto.auth.LoginResponse;
import com.prepbuddy.dto.auth.RegisterRequest;
import com.prepbuddy.dto.auth.RegisterResponse;

public interface AuthService {
    RegisterResponse register(RegisterRequest request);

    LoginResponse login(LoginRequest request);
}
