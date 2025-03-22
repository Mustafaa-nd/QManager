package sn.diamniadio.polytech.dsti.QManager.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import sn.diamniadio.polytech.dsti.QManager.entity.TicketEntity;
import sn.diamniadio.polytech.dsti.QManager.service.TicketService;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

    @Autowired
    private TicketService ticketService;

    @PostMapping("/login")
    public boolean login(@RequestParam String username, @RequestParam String password) {
        return "greatfather".equals(username) && "alone".equals(password);
    }

    @GetMapping("/all")
    public List<TicketEntity> getAllTickets() {
        return ticketService.getAllTickets();
    }


    @DeleteMapping("/reset")
    public void resetAllTickets() {
        ticketService.resetAll();
    }
}
