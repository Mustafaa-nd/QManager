package sn.diamniadio.polytech.dsti.QManager.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import sn.diamniadio.polytech.dsti.QManager.service.QueueService;
import sn.diamniadio.polytech.dsti.QManager.util.DataLoader;
import sn.diamniadio.polytech.dsti.QManager.model.Service;
import sn.diamniadio.polytech.dsti.QManager.model.AgentAction;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/agent")
@CrossOrigin(origins = "http://localhost:5173")
public class AgentController {

    @Autowired
    private QueueService queueService;

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
    public void nextTicket(@RequestParam String service, @RequestParam String location) {
        queueService.nextTicket(service, location);
    }

    @PostMapping("/previousTicket")
    public void previousTicket(@RequestParam String service, @RequestParam String location) {
        queueService.previousTicket(service, location);
    }
}
