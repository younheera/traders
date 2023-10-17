package com.newus.traders.user.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Getter
@NoArgsConstructor
@Table(name = "refresh_token")
@Entity
public class RefreshToken {
//RDB 로 구현하게 된다면 생성/수정 시간 컬럼을 추가하여 배치 작업으로 만료된 토큰들을 삭제해야 함
    @Id
    @Column(name = "rt_key")
    private String key;//userid

    @Column(name = "rt_value")
    private String value;//refresh token string

    @Builder
    public RefreshToken(String key, String value) {
        this.key = key;
        this.value = value;
    }

    public RefreshToken updateValue(String token) {
        this.value = token;
        return this;
    }
}