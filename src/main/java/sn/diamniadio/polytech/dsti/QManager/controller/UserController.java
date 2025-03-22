package sn.diamniadio.polytech.dsti.QManager.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import sn.diamniadio.polytech.dsti.QManager.entity.TicketEntity;
import sn.diamniadio.polytech.dsti.QManager.model.Service;
import sn.diamniadio.polytech.dsti.QManager.service.TicketService;
import sn.diamniadio.polytech.dsti.QManager.util.DataLoader;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final TicketService ticketService;

    @Autowired
    public UserController(TicketService ticketService) {
        this.ticketService = ticketService;
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
    public TicketEntity getCurrentTicket(@RequestParam String service, @RequestParam String location) {
        return ticketService.getCurrentTicket(service, location);
    }

    @GetMapping("/remaining")
    public int getRemaining(@RequestParam String service, @RequestParam String location) {
        return ticketService.getRemainingCount(service, location);
    }

    @PostMapping("/generateTicketWithInfo")
    public synchronized Map<String, Object> generateTicketWithInfo(@RequestParam String service, @RequestParam String location) {
        Map<String, Object> response = new HashMap<>();

        TicketEntity newTicket = ticketService.generateTicket(service, location);
        List<TicketEntity> queue = ticketService.getActiveQueue(service, location);

        int position = 1;
        for (TicketEntity t : queue) {
            if (t.getId().equals(newTicket.getId())) break;
            position++;
        }

        response.put("ticket", newTicket);
        response.put("position", position);
        response.put("peopleAhead", position - 1);
        response.put("currentTicket", ticketService.getCurrentTicket(service, location));

        System.out.println("🎫 Nouveau ticket généré: " + newTicket.getTicketNumber());

        return response;
    }

    @GetMapping("/debug/all-tickets")
    public List<TicketEntity> getAllTickets() {
        return ticketService.getAllTickets();
    }
}
