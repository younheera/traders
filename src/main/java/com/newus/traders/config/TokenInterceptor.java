// /**
//  * @author wheesunglee
//  * @create date 2023-10-25 16:02:50
//  * @modify date 2023-10-25 16:02:50
//  */
// package com.newus.traders.config;

// import javax.servlet.http.HttpServletRequest;
// import javax.servlet.http.HttpServletResponse;

// import org.springframework.security.core.Authentication;
// import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.web.servlet.HandlerInterceptor;
// import org.springframework.web.servlet.ModelAndView;

// import com.newus.traders.user.jwt.TokenProvider;

// import lombok.RequiredArgsConstructor;

// @RequiredArgsConstructor
// public class TokenInterceptor implements HandlerInterceptor {
//     private final TokenProvider tokenProvider;

//     @Override
//     public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {

//         String accessToken = request.getHeader("token");

//         if (accessToken == null) {
//             return true;
//         }

//         try {
//             Authentication authentication = tokenProvider.getAuthentication(accessToken);
//             Object principal = authentication.getPrincipal();
//             UserDetails userDetails = (UserDetails) principal;
//             request.setAttribute("username", userDetails.getUsername());
//             return true;
//         } catch (Exception e) {
//             System.out.println(e.getMessage());
//             return false;
//         }
//     }

//     @Override
//     public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
//             ModelAndView modelAndView) throws Exception {
//         // TODO Auto-generated method stub
//         HandlerInterceptor.super.postHandle(request, response, handler, modelAndView);
//     }

// }
