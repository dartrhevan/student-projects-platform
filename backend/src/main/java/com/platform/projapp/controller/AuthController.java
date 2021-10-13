package com.platform.projapp.controller;

import com.platform.projapp.configuration.jwt.JwtUserDetailsService;
import com.platform.projapp.configuration.jwt.JwtUtils;
import com.platform.projapp.dto.AuthRequest;
import com.platform.projapp.dto.JwtResponse;
import com.platform.projapp.dto.RegisterRequest;
import com.platform.projapp.enumarate.AccessRole;
import com.platform.projapp.mock.UserMock;
import com.platform.projapp.mock.UserRepositoryMock;
import com.platform.projapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Set;

/**
 * @author Yarullin Renat
 */
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    UserRepositoryMock userRepositoryMock;
    @Autowired
    UserService userService;
    @Autowired
    JwtUtils jwtUtils;
    @Autowired
    AuthenticationManager authenticationManager;
    @PostMapping("/signin")
    public ResponseEntity<?> authUser(@RequestBody AuthRequest authRequest){

        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword()));

            SecurityContextHolder.getContext().setAuthentication(authentication);

            String jwt = jwtUtils.generateJwtToken(authentication);

            UserMock userMock = (UserMock) authentication.getPrincipal();

            return ResponseEntity.ok(new JwtResponse(jwt,userMock));
        }
        catch (UsernameNotFoundException e){
            return ResponseEntity.ok("все плохо");
        }

    }
    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest registerRequest){
        if (userRepositoryMock.existsByEmail(registerRequest.getEmail())){
            return ResponseEntity.badRequest().body("Пользователь с таким email адресом уже зарегистрирован");
        }
        userService.addUser(registerRequest);
        return ResponseEntity.badRequest().body("Пользователь зарегистрирован успешно");
    }
}
