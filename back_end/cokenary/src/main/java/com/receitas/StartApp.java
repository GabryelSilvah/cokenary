package com.receitas;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class StartApp {

	public static void main(String[] args) {

		SpringApplication.run(StartApp.class, args);
	}


	//Configuração de cross origin
	@Bean
	public WebMvcConfigurer cors() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**")
						.allowedMethods("GET","POST","PUT","DELETE")
<<<<<<< HEAD
						.allowedOrigins("http://localhost:8082");




=======
						.allowedOrigins("*");
>>>>>>> eb4a1a3f139953775bb779a85dd1629c8f97a62f
			}
		};
	}
}