package com.prepbuddy.config;
import com.prepbuddy.security.CustomAccessDeniedHandler;
import com.prepbuddy.security.JwtAuthenticationEntryPoint;
import com.prepbuddy.security.JwtAuthenticationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.List;


import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.Customizer;

import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {
    private final JwtAuthenticationEntryPoint authenticationEntryPoint;
    private final CustomAccessDeniedHandler accessDeniedHandler;
    private final JwtAuthenticationFilter jwtFilter;
    public SecurityConfig(
            JwtAuthenticationEntryPoint authenticationEntryPoint, CustomAccessDeniedHandler accessDeniedHandler, JwtAuthenticationFilter jwtFilter){
        this.authenticationEntryPoint = authenticationEntryPoint;
        this.accessDeniedHandler = accessDeniedHandler;
        this.jwtFilter=jwtFilter;
    }
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

   @Bean
   public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

       http
               .csrf(csrf->csrf.disable())
               .csrf(csrf -> csrf.disable())
               .cors(Customizer.withDefaults())
               .sessionManagement(session->
                       session.sessionCreationPolicy(
                               SessionCreationPolicy.STATELESS))
               .exceptionHandling(exception -> exception

                       .authenticationEntryPoint(authenticationEntryPoint)

                       .accessDeniedHandler(accessDeniedHandler)
               )
               .authorizeHttpRequests(auth->

                       auth

                               .requestMatchers(
                                       "/auth/**",
                                       "/swagger-ui/**",
                                       "/swagger-ui.html",
                                       "/v3/api-docs/**",
                                       "/error",
                                       "/v3/api-docs")

                               .permitAll()

                               .anyRequest()

                               .authenticated())

               .addFilterBefore(jwtFilter,
                       UsernamePasswordAuthenticationFilter.class

               );

       return http.build();
   }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration configuration)
            throws Exception {

        return configuration.getAuthenticationManager();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowedOriginPatterns(List.of("http://localhost:*"));

        configuration.setAllowedMethods(List.of(
                "GET",
                "POST",
                "PUT",
                "DELETE",
                "OPTIONS"
        ));

        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration("/**", configuration);

        return source;
    }
}
