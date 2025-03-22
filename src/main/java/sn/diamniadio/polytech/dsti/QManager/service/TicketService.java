package sn.diamniadio.polytech.dsti.QManager.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sn.diamniadio.polytech.dsti.QManager.entity.TicketEntity;
import sn.diamniadio.polytech.dsti.QManager.repository.TicketRepository;

import java.util.List;

@Service
public class TicketService {

    @Autowired
    private TicketRepository ticketRepository;

    public TicketEntity generateTicket(String service, String location) {
        int maxNumber = ticketRepository.getMaxTicketNumber(service, location);

        TicketEntity ticket = new TicketEntity();
        ticket.setService(service);
        ticket.setLocation(location);
        ticket.setTicketNumber(maxNumber + 1);
        ticket.setActive(true);

        System.out.println("📨 Sauvegarde ticket : " + ticket.getService() + " - " + ticket.getLocation());

        return ticketRepository.save(ticket);
    }

    public TicketEntity getCurrentTicket(String service, String location) {
        return ticketRepository.findFirstByServiceAndLocationAndActiveTrueOrderByTicketNumberAsc(service, location);

    }

    public int getRemainingCount(String service, String location) {
        return ticketRepository.countByServiceAndLocationAndActiveTrue(service, location);
    }

    public List<TicketEntity> getActiveQueue(String service, String location) {
        return ticketRepository.findByServiceAndLocationAndActiveTrueOrderByTicketNumberAsc(service, location);
    }

    public TicketEntity nextTicket(String service, String location) {
        TicketEntity current = getCurrentTicket(service, location);
        if (current != null) {
            current.setActive(false);
            return ticketRepository.save(current); // retourne le ticket désactivé
        }
        return null;
    }


    public TicketEntity previousTicket(String service, String location) {
        if (!ticketRepository.findByServiceAndLocationAndActiveTrueOrderByTicketNumberAsc(service, location).isEmpty()) {
            return null;
        }

        TicketEntity lastInactive = ticketRepository
                .findFirstByServiceAndLocationAndActiveFalseOrderByCreatedAtDesc(service, location);

        if (lastInactive != null) {
            lastInactive.setActive(true);
            return ticketRepository.save(lastInactive);
        }

        return null;
    }



    public void resetAll() {
        List<TicketEntity> allTickets = ticketRepository.findAll();
        for (TicketEntity ticket : allTickets) {
            ticket.setActive(false);
        }
        ticketRepository.saveAll(allTickets);
    }

    public List<TicketEntity> getAllTickets() {
        return ticketRepository.findAllByOrderByCreatedAtDesc();
    }

}
