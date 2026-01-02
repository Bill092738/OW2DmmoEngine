package com.game.server.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
            // Adjust for your deployed frontend origin(s)
            .allowedOrigins(
                "http://localhost:3000",
                "http://127.0.0.1:3000",
                "http://3.110.236.159:3000",
		        "http://demo.tftcloud.eu.org:3000"
            )
            .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
            .allowedHeaders("*");
    }
}
