package sn.diamniadio.polytech.dsti.QManager.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;
import sn.diamniadio.polytech.dsti.QManager.entity.Agent;
import sn.diamniadio.polytech.dsti.QManager.entity.TicketEntity;
import sn.diamniadio.polytech.dsti.QManager.repository.AgentRepository;
import sn.diamniadio.polytech.dsti.QManager.service.TicketService;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/agent")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class AgentController {

    private final TicketService ticketService;
    private final AgentRepository agentRepository;

    // Récupère l'agent connecté et vérifie qu'il existe bien en base
    private Agent getConnectedAgent(User user) {
        return agentRepository.findByUsername(user.getUsername())
                .orElseThrow(() -> new RuntimeException("Agent introuvable"));
    }

    @PostMapping("/nextTicket")
    public TicketEntity nextTicket(@AuthenticationPrincipal User user) {
        Agent agent = getConnectedAgent(user);
        String service = agent.getService().getName();
        String location = agent.getLocation().getName();

        ticketService.nextTicket(service, location);
        return ticketService.getCurrentTicket(service, location);
    }

    @PostMapping("/previousTicket")
    public TicketEntity previousTicket(@AuthenticationPrincipal User user) {
        Agent agent = getConnectedAgent(user);
        String service = agent.getService().getName();
        String location = agent.getLocation().getName();

        ticketService.previousTicket(service, location);
        return ticketService.getCurrentTicket(service, location);
    }

    @GetMapping("/current")
    public Map<String, Object> getCurrent(@AuthenticationPrincipal User user) {
        Agent agent = getConnectedAgent(user);
        String service = agent.getService().getName();
        String location = agent.getLocation().getName();

        Map<String, Object> response = new HashMap<>();
        response.put("currentTicket", ticketService.getCurrentTicket(service, location));
        response.put("remaining", ticketService.getRemainingCount(service, location));

        return response;
    }
}
