package sn.diamniadio.polytech.dsti.QManager.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import sn.diamniadio.polytech.dsti.QManager.entity.TicketEntity;
import sn.diamniadio.polytech.dsti.QManager.service.TicketService;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/agent")
@CrossOrigin(origins = "http://localhost:5173")
public class AgentController {

    @Autowired
    private TicketService ticketService;

    private static final Map<String, String> agents = new HashMap<>();

    static {
        agents.put("Seneau-Dakar-agent1", "password123");
        agents.put("Orange-Saint-Louis-agent2", "pass456");
        agents.put("Senelec-Mbour-agent3", "secure789");
    }

    @PostMapping("/login")
    public boolean login(@RequestParam String service, @RequestParam String location,
                         @RequestParam String username, @RequestParam String password) {
        String key = service + "-" + location + "-" + username;
        return agents.containsKey(key) && agents.get(key).equals(password);
    }

    @PostMapping("/nextTicket")
    public TicketEntity nextTicket(@RequestParam String service, @RequestParam String location) {
        ticketService.nextTicket(service, location);
        return ticketService.getCurrentTicket(service, location);
    }

    @PostMapping("/previousTicket")
    public TicketEntity previousTicket(@RequestParam String service, @RequestParam String location) {
        ticketService.previousTicket(service, location);
        return ticketService.getCurrentTicket(service, location);
    }

    @GetMapping("/current")
    public Map<String, Object> getCurrent(@RequestParam String service, @RequestParam String location) {
        Map<String, Object> map = new HashMap<>();
        map.put("currentTicket", ticketService.getCurrentTicket(service, location));
        map.put("remaining", ticketService.getRemainingCount(service, location));
        return map;
    }
}
