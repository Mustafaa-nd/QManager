package sn.diamniadio.polytech.dsti.QManager.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import sn.diamniadio.polytech.dsti.QManager.model.QueueTicket;
import sn.diamniadio.polytech.dsti.QManager.service.QueueService;
import sn.diamniadio.polytech.dsti.QManager.util.DataLoader;
import sn.diamniadio.polytech.dsti.QManager.model.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Queue;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {
    private final QueueService queueService;

    @Autowired
    public UserController(QueueService queueService) {
        this.queueService = queueService;
    }

    @GetMapping("/services")
    public List<Service> getServices() {
        return DataLoader.loadServices();
    }

    @GetMapping("/locations")
    public List<String> getLocations(@RequestParam String service) {
        return DataLoader.loadServices().stream()
                .filter(s -> s.getName().equals(service))
                .findFirst()
                .map(Service::getLocations)
                .orElse(List.of());
    }

    @GetMapping("/currentTicket")
    public QueueTicket getCurrentTicket(@RequestParam String service, @RequestParam String location) {
        return queueService.getCurrentTicket(service, location);
    }

    @GetMapping("/remaining")
    public int getRemainingCount(@RequestParam String service, @RequestParam String location) {
        return queueService.getRemainingCount(service, location);
    }

    @PostMapping("/generateTicketWithInfo")
    public Map<String, Object> generateTicketWithInfo(@RequestParam String service, @RequestParam String location) {
        Map<String, Object> response = new HashMap<>();

        QueueTicket newTicket = queueService.generateTicket(service, location);
        Queue<QueueTicket> queue = queueService.getQueue(service, location);

        // Calculer la position réelle du ticket dans la file
        int position = 1;
        for (QueueTicket t : queue) {
            if (t.getTicketNumber() == newTicket.getTicketNumber()) {
                break;
            }
            position++;
        }

        response.put("ticket", newTicket);
        response.put("position", position);
        response.put("peopleAhead", position - 1);
        response.put("currentTicket", queueService.getCurrentTicket(service, location));

        return response;
    }


}
