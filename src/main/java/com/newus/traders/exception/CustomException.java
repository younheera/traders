/**
 * @author wheesunglee
 * @create date 2023-09-23 18:37:09
 * @modify date 2023-09-23 18:37:09
 */

package com.newus.traders.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CustomException extends RuntimeException {

    // 에러 상태와 메세지를 모두 담고 있는 ErrorCode 클래스를 담음
    ErrorCode errorCode;
}
