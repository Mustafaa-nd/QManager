package sn.diamniadio.polytech.dsti.QManager.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import sn.diamniadio.polytech.dsti.QManager.service.AdminService;
import sn.diamniadio.polytech.dsti.QManager.model.AgentAction;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping("/login")
    public boolean login(@RequestParam String username, @RequestParam String password) {
        return "greatfather".equals(username) && "alone".equals(password);
    }

    @GetMapping("/actions")
    public List<AgentAction> getActions() {
        return adminService.getActions();
    }
}
