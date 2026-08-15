package com.prepbuddy.mapper;

import com.prepbuddy.dto.UserRequest;
import com.prepbuddy.dto.UserResponse;
import com.prepbuddy.entity.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    //convert user request ->user
    public User toEntity(UserRequest userRequest){

        User user = new User();

        user.setName(userRequest.getName());
        user.setEmail(userRequest.getEmail());
        user.setPassword(userRequest.getPassword());
        user.setRole(userRequest.getRole());
        return user;
    }

    //convert user -> userresponse
    public UserResponse toResponse(User user){

        UserResponse response = new UserResponse();

        response.setId(user.getId());
        response.setName(user.getName());
        response.setEmail(user.getEmail());
        response.setRole(user.getRole());
        response.setCreatedAt(user.getCreatedAt());
        response.setUpdatedAt(user.getUpdatedAt());

    return response;

    }
}
