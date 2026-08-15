package com.prepbuddy.exception;

public class ResourceNotFoundException extends RuntimeException{

    public ResourceNotFoundException(String messsage){
        super(messsage);
    }
}
