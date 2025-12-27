package com.game.server.api;

import java.time.Instant;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @PostMapping("/test-login")
    public ResponseEntity<TestLoginResponse> testLogin() {
        // PoC endpoint: proves the frontend can reach the Java backend.
        // Replace with real auth later (JWT/session, credentials validation, etc.).
        return ResponseEntity.ok(new TestLoginResponse(true, "Backend reachable", Instant.now().toString()));
    }

    public record TestLoginResponse(boolean ok, String message, String serverTime) {}
}