package sn.diamniadio.polytech.dsti.QManager.security;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;
import sn.diamniadio.polytech.dsti.QManager.entity.Agent;
import sn.diamniadio.polytech.dsti.QManager.repository.AgentRepository;

import java.util.Collections;

@Service
@RequiredArgsConstructor
public class AgentDetailsService implements UserDetailsService {

    private final AgentRepository agentRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Agent agent = agentRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Agent non trouvé : " + username));

        return User.builder()
                .username(agent.getUsername())
                .password(agent.getPassword()) // déjà hashé avec BCrypt
                .roles("AGENT") // rôle utile pour @PreAuthorize etc.
                .build();
    }
}
