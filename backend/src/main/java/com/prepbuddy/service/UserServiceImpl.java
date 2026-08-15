package com.prepbuddy.service;


import com.prepbuddy.dto.UserRequest;
import com.prepbuddy.dto.UserResponse;
import com.prepbuddy.entity.User;
import com.prepbuddy.exception.EmailAlreadyExistsException;
import com.prepbuddy.exception.ResourceNotFoundException;
import com.prepbuddy.mapper.UserMapper;
import com.prepbuddy.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;


import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository,
                           PasswordEncoder passwordEncoder,
                           UserMapper userMapper) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.userMapper = userMapper;

    }

    @Override
    public UserResponse createUser(UserRequest userRequest){

        if (userRepository.findByEmail(userRequest.getEmail()).isPresent()) {
            throw new EmailAlreadyExistsException(
                    "Email already exists: " + userRequest.getEmail()
            );
        }

        User user = userMapper.toEntity(userRequest);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User savedUser=userRepository.save(user);

        return userMapper.toResponse(savedUser);
    }

    @Override
    public List<UserResponse> getAllUsers(){
        return userRepository.findAll()
                .stream()
                .map(userMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public UserResponse getUserById(Long id){
        User user = userRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found with id :" + id));
        return userMapper.toResponse(user);
    }

    @Override
    public UserResponse updateUser(Long id,UserRequest userRequest){
        User existingUser= userRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found with id :" + id));

//        if(existingUser==null){
//            return null;
//        }

        existingUser.setName(userRequest.getName());
        existingUser.setEmail(userRequest.getEmail());
        existingUser.setPassword(passwordEncoder.encode(userRequest.getPassword()));
        existingUser.setRole(userRequest.getRole());

        User updatedUser = userRepository.save(existingUser);

        return userMapper.toResponse(updatedUser);
    }

    @Override
    public void deleteUser(Long id){
         User user = userRepository.findById(id)
                 .orElseThrow(() ->
                         new ResourceNotFoundException(
                                 "User not found with id: " + id));

         userRepository.delete(user);
    }

    @Override
    public UserResponse getCurrentUser() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found with email: " + email));

        return userMapper.toResponse(user);

    }
}
