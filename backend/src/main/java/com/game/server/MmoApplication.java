package com.game.server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MmoApplication {

    public static void main(String[] args) {
        SpringApplication.run(MmoApplication.class, args);
        System.out.println("=========================================");
        System.out.println("🚀 MMO Game Server Started on Port 8080");
        System.out.println("⚔️  Connected to PostGIS Database");
        System.out.println("=========================================");
    }
}