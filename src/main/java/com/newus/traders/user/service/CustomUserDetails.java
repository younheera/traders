package com.newus.traders.user.service;


import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.SpringSecurityCoreVersion;
import org.springframework.security.core.userdetails.User;

import java.util.Collection;

@Getter @Setter @ToString
public class CustomUserDetails extends User{

    private static final long serialVersionUID = SpringSecurityCoreVersion.SERIAL_VERSION_UID;

    private String email;
    private String username;

    public CustomUserDetails(String username, String password, boolean enabled,
    boolean accountNonExpired, boolean credentialsNonExpired,
    boolean accountNonLocked,
    String email,
    Collection<? extends GrantedAuthority> grantedAuthorities) {
        super(username, password, enabled, accountNonExpired, credentialsNonExpired, accountNonLocked,grantedAuthorities);
        this.email = email;
    }
    public String getEmail() {
        return email;
    }
    public String setEmail() {
        return email;
    }
    public String getUserName() {
        return username;
    }
    public String setUserName() {
        return username;
    }
    
}
