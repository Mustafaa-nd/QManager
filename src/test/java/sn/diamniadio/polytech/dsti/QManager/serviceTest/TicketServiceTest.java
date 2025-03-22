package sn.diamniadio.polytech.dsti.QManager.serviceTest;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import sn.diamniadio.polytech.dsti.QManager.entity.TicketEntity;
import sn.diamniadio.polytech.dsti.QManager.repository.TicketRepository;
import sn.diamniadio.polytech.dsti.QManager.service.TicketService;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class TicketServiceTest {

    @Autowired
    private TicketService ticketService;

    @Autowired
    private TicketRepository ticketRepository;

    @BeforeEach
    public void clearDatabase() {
        ticketRepository.deleteAll();
    }

    @Test
    public void testTicketGenerationAndPosition() {
        String service = "Seneau";
        String location = "Dakar";

        TicketEntity ticket1 = ticketService.generateTicket(service, location);
        TicketEntity ticket2 = ticketService.generateTicket(service, location);

        assertEquals(1, ticket1.getTicketNumber());
        assertEquals(2, ticket2.getTicketNumber());

        TicketEntity current = ticketService.getCurrentTicket(service, location);
        assertEquals(ticket1.getId(), current.getId());

        List<TicketEntity> queue = ticketService.getActiveQueue(service, location);
        assertEquals(2, queue.size());
    }

    @Test
    public void testNextAndPreviousTicket() {
        String service = "Seneau";
        String location = "Dakar";

        ticketRepository.deleteAll();

        ticketService.generateTicket(service, location);
        ticketService.generateTicket(service, location);

        // On désactive les deux
        TicketEntity firstDeactivated = ticketService.nextTicket(service, location); // ticket 1 désactivé
        TicketEntity lastDeactivated = ticketService.nextTicket(service, location);  // ticket 2 désactivé

        // File est vide → on peut restaurer
        TicketEntity restored = ticketService.previousTicket(service, location);

        assertNotNull(restored);
        assertEquals(lastDeactivated.getId(), restored.getId()); // 💯
    }



}
