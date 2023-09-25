/**
 * @author wheesunglee
 * @create date 2023-09-23 18:37:03
 * @modify date 2023-09-23 18:37:03
 */

package com.newus.traders.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

// 전역에서 발생하는 CustomException을 잡아주는 역할
@ControllerAdvice
public class CustomExceptionHandler extends ResponseEntityExceptionHandler {

    // 잡은 에러를 응답으로 만들어서 반환
    @ExceptionHandler(CustomException.class)
    protected ResponseEntity<ErrorResponseEntity> handleCustomException(CustomException exception) {
        return ErrorResponseEntity.toResponseEntity(exception.getErrorCode());

    }
}
