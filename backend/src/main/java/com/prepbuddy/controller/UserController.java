package com.prepbuddy.controller;

import com.prepbuddy.dto.UserRequest;
import com.prepbuddy.dto.UserResponse;
import com.prepbuddy.entity.User;
import com.prepbuddy.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@Tag(
        name = "User APIs",
        description = "User Management APIs"
)
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public UserResponse createUser(@Valid @RequestBody UserRequest userRequest){
        return userService.createUser(userRequest);
    }

    @Operation(summary = "Get All Users")
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<UserResponse> getAllUsers(){
        return userService.getAllUsers();
    }

    @Operation(summary = "Get User By ID")
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public UserResponse getUserById(@PathVariable Long id){
        return userService.getUserById(id);
    }

    @Operation(summary = "Update User")
    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public UserResponse updateUser(@PathVariable Long id,
                           @Valid @RequestBody UserRequest userRequest){
        return userService.updateUser(id,userRequest);
    }

    @Operation(summary = "Delete User")
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteUser(@PathVariable Long id){
        userService.deleteUser(id);
    }

    @Operation(summary = "Get Current Logged-in User")
    @GetMapping("/me")
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public UserResponse getCurrentUser() {
        return userService.getCurrentUser();
    }

}
