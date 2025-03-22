package sn.diamniadio.polytech.dsti.QManager.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;


@Entity
@Table(name = "tickets")
public class TicketEntity {

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int ticketNumber;

    private String service;

    private String location;

    private boolean active = true; // encore dans la file

    // --- Getters & Setters ---
    public Long getId() {
        return id;
    }

    public int getTicketNumber() {
        return ticketNumber;
    }

    public void setTicketNumber(int ticketNumber) {
        this.ticketNumber = ticketNumber;
    }

    public String getService() {
        return service;
    }

    public void setService(String service) {
        this.service = service;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }
}
