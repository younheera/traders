/**
 * @author wheesunglee
 * @create date 2023-09-23 18:36:56
 * @modify date 2023-09-23 18:36:56
 */

package com.newus.traders.exception;

import org.springframework.http.HttpStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {

    // HttpStatus.NOT_FOUND: 404 에러
    PRODUCT_NOT_FOUND(HttpStatus.NOT_FOUND, "해당하는 물품을 찾을 수 없습니다.");

    private final HttpStatus httpStatus;
    private final String message;
}
