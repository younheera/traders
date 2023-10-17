package com.newus.traders.user.exception;
import org.springframework.http.HttpStatus;

public class UserException extends RuntimeException{
    
    private HttpStatus status;

    public UserException(HttpStatus status) {
        this.status = status;
    }
    public HttpStatus getStatus() {
        return status;
    }
}