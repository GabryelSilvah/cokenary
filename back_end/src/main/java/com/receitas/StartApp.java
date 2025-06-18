package com.receitas;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class StartApp {

	public static void main(String[] args) {
		SpringApplication.run(StartApp.class, args);
	}

	// Configuração de Cross-Origin Resource Sharing (CORS)
	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**")
						.allowedMethods("GET", "POST", "PUT", "DELETE","OPTIONS")
						.allowedOrigins("http://localhost:8081"); // Aceita requisições de qualquer origem
			}
		};
	}
}

