package com.newus.traders.chat;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class CustomException extends ResponseStatusException {

    public CustomException(String reason) {
        super(HttpStatus.INTERNAL_SERVER_ERROR, reason);
    }

    public CustomException(String reason, Throwable cause) {
        super(HttpStatus.INTERNAL_SERVER_ERROR, reason, cause);
    }
}
