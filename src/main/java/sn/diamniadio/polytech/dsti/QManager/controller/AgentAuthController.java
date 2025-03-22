package sn.diamniadio.polytech.dsti.QManager.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import sn.diamniadio.polytech.dsti.QManager.entity.Agent;
import sn.diamniadio.polytech.dsti.QManager.repository.AgentRepository;
import sn.diamniadio.polytech.dsti.QManager.security.JwtUtil;

import java.util.Map;

@RestController
@RequestMapping("/api/agent")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AgentAuthController {

    private final PasswordEncoder passwordEncoder;
    private final AgentRepository agentRepository;
    private final JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        String username = body.get("username");
        String password = body.get("password");
        String service = body.get("service");
        String location = body.get("location");

        Agent agent = agentRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Agent introuvable"));

        // Vérification du service et de la localisation
        if (!agent.getService().getName().equals(service) || !agent.getLocation().getName().equals(location)) {
            return ResponseEntity.status(403).body("Service ou localisation incorrect(e).");
        }

        // Vérifier le mot de passe
        if (!passwordEncoder.matches(password, agent.getPassword())) {
            return ResponseEntity.status(401).body("Mot de passe incorrect.");
        }

        // Générer un token JWT
        String token = jwtUtil.generateToken(username);

        return ResponseEntity.ok(Map.of("token", token));
    }

}
