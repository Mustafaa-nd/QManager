package sn.diamniadio.polytech.dsti.QManager.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import sn.diamniadio.polytech.dsti.QManager.entity.*;
import sn.diamniadio.polytech.dsti.QManager.repository.*;
import sn.diamniadio.polytech.dsti.QManager.service.TicketService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class AdminController {

    private final ServiceRepository serviceRepo;
    private final LocationRepository locationRepo;
    private final AgentRepository agentRepo;
    private final TicketRepository ticketRepository;
    private final TicketService ticketService;


    // Routes Services
    @GetMapping("/services")
    public ResponseEntity<List<ServiceEntity>> getAllServices() {
        return ResponseEntity.ok(serviceRepo.findAll());
    }

    @PostMapping("/services")
    public ResponseEntity<ServiceEntity> createService(@RequestBody ServiceEntity service) {
        if (serviceRepo.existsByName(service.getName())) {
            return ResponseEntity.badRequest().build();
        }
        ServiceEntity saved = serviceRepo.save(service);
        return ResponseEntity.ok(saved);
    }

    @DeleteMapping("/services/{id}")
    public ResponseEntity<?> deleteService(@PathVariable Long id) {
        Optional<ServiceEntity> serviceOpt = serviceRepo.findById(id);

        if (serviceOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        ServiceEntity service = serviceOpt.get();

        // Vérifie s’il contient des localisations (et donc potentiellement des agents)
        if (service.getLocations() != null && !service.getLocations().isEmpty()) {
            return ResponseEntity.status(409).body("Impossible de supprimer ce service : des localisations y sont encore associées.");
        }

        serviceRepo.delete(service);
        return ResponseEntity.noContent().build();
    }


    // Routes Locations pour les services
    @PostMapping("/services/{serviceId}/locations")
    public ResponseEntity<Location> addLocation(@PathVariable Long serviceId, @RequestBody Location location) {
        Optional<ServiceEntity> serviceOpt = serviceRepo.findById(serviceId);
        if (serviceOpt.isEmpty()) return ResponseEntity.notFound().build();

        location.setService(serviceOpt.get());
        return ResponseEntity.ok(locationRepo.save(location));
    }

    @GetMapping("/services/{serviceId}/locations")
    public ResponseEntity<List<Location>> getLocationsByService(@PathVariable Long serviceId) {
        Optional<ServiceEntity> serviceOpt = serviceRepo.findById(serviceId);
        if (serviceOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(serviceOpt.get().getLocations());
    }

    @GetMapping("/locations")
    public List<Location> getAllLocations() {
        return locationRepo.findAll();
    }

    @DeleteMapping("/services/{serviceId}/locations/{locationId}")
    public ResponseEntity<?> deleteLocationFromService(@PathVariable Long serviceId, @PathVariable Long locationId) {
        Optional<Location> locationOpt = locationRepo.findById(locationId);

        if (locationOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Location location = locationOpt.get();


        if (!location.getService().getId().equals(serviceId)) {
            return ResponseEntity.badRequest().body("Cette localisation n'appartient pas au service spécifié.");
        }


        if (location.getAgents() != null && !location.getAgents().isEmpty()) {
            return ResponseEntity.status(409).body("Impossible de supprimer cette localisation : des agents y sont encore assignés.");
        }

        locationRepo.delete(location);
        return ResponseEntity.noContent().build();
    }


    @Autowired
    private PasswordEncoder passwordEncoder;

    // Routes Agents par service/location
    @PostMapping("/services/{serviceId}/locations/{locationId}/agents")
    public ResponseEntity<Agent> createAgent(@PathVariable Long serviceId, @PathVariable Long locationId, @RequestBody Agent agent) {
        if (agentRepo.existsByUsername(agent.getUsername())) {
            return ResponseEntity.badRequest().build();
        }

        Optional<ServiceEntity> serviceOpt = serviceRepo.findById(serviceId);
        Optional<Location> locationOpt = locationRepo.findById(locationId);

        if (serviceOpt.isEmpty() || locationOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        agent.setPassword(passwordEncoder.encode(agent.getPassword()));

        agent.setService(serviceOpt.get());
        agent.setLocation(locationOpt.get());
        return ResponseEntity.ok(agentRepo.save(agent));
    }

    @GetMapping("/agents")
    public List<Agent> getAllAgents() {
        return agentRepo.findAll();
    }

    @GetMapping("/services/{serviceId}/locations/{locationId}/agents")
    public ResponseEntity<List<Agent>> getAgentsByServiceAndLocation(@PathVariable Long serviceId, @PathVariable Long locationId) {
        Optional<ServiceEntity> serviceOpt = serviceRepo.findById(serviceId);
        Optional<Location> locationOpt = locationRepo.findById(locationId);

        if (serviceOpt.isEmpty() || locationOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(agentRepo.findByServiceAndLocation(serviceOpt.get(), locationOpt.get()));
    }

    @DeleteMapping("/agents/{agentId}")
    public ResponseEntity<Void> deleteAgent(@PathVariable Long agentId) {
        if (!agentRepo.existsById(agentId)) {
            return ResponseEntity.notFound().build();
        }
        agentRepo.deleteById(agentId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/tickets/history")
    public List<TicketEntity> getProcessedTickets(
            @RequestParam String service,
            @RequestParam String location
    ) {
        return ticketService.getProcessedTickets(service, location);
    }

    @GetMapping("/tickets/all")
    public List<TicketEntity> getAllTickets() {
        return ticketService.getAllTickets();
    }

    // Voir les files d'attente (tickets actifs par service/location)
    @GetMapping("/queues")
    public ResponseEntity<?> getQueueDetails(@RequestParam String service, @RequestParam String location,
                                             @Autowired TicketRepository ticketRepository) {

        List<TicketEntity> activeTickets = ticketRepository.findByServiceAndLocationAndActiveTrueOrderByTicketNumberAsc(service, location);

        TicketEntity current = activeTickets.isEmpty() ? null : activeTickets.get(0);
        List<TicketEntity> waitingList = activeTickets.size() > 1 ? activeTickets.subList(1, activeTickets.size()) : List.of();

        Map<String, Object> response = new HashMap<>();
        response.put("current", current);
        response.put("waiting", waitingList);
        response.put("count", activeTickets.size());

        return ResponseEntity.ok(response);
    }

}
