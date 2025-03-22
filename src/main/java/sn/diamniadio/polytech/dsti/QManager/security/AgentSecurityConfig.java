package sn.diamniadio.polytech.dsti.QManager.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@Order(2)
@RequiredArgsConstructor
public class AgentSecurityConfig {

    private final AgentJwtAuthFilter agentJwtAuthFilter;

    @Bean
    public SecurityFilterChain agentFilterChain(HttpSecurity http) throws Exception {
        http
                .securityMatcher("/api/agent/**")
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth.anyRequest().permitAll())
                .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(agentJwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
}
