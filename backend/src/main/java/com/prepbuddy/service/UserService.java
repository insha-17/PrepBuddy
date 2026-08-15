package com.prepbuddy.service;

import com.prepbuddy.dto.UserRequest;
import com.prepbuddy.dto.UserResponse;
import com.prepbuddy.entity.User;

import java.util.List;

public interface UserService {

    UserResponse createUser(UserRequest userRequest);

    List<UserResponse> getAllUsers();

    UserResponse getUserById(Long id);

    UserResponse updateUser(Long id,UserRequest userRequest);

    void deleteUser(Long id);

    UserResponse getCurrentUser();

}
