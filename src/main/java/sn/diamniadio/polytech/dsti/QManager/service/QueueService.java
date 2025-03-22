package sn.diamniadio.polytech.dsti.QManager.service;

import org.springframework.stereotype.Service;
import sn.diamniadio.polytech.dsti.QManager.model.QueueTicket;

import java.util.*;

@Service
public class QueueService {
    private final Map<String, Queue<QueueTicket>> queues = new HashMap<>();
    private final Map<String, Stack<QueueTicket>> history = new HashMap<>(); // Historique des tickets passés
    private final Map<String, Integer> ticketNumbers = new HashMap<>();

    public synchronized QueueTicket generateTicket(String service, String location) {
        String key = service + "-" + location;
        queues.putIfAbsent(key, new LinkedList<>());
        history.putIfAbsent(key, new Stack<>());
        ticketNumbers.putIfAbsent(key, 1);

        int ticketNumber = ticketNumbers.get(key);
        QueueTicket ticket = new QueueTicket(ticketNumber, service, location);

        Queue<QueueTicket> queue = queues.get(key);

        // Ne pas ajouter un ticket déjà présent
        boolean alreadyExists = queue.stream()
                .anyMatch(t -> t.getTicketNumber() == ticketNumber);

        if (!alreadyExists) {
            queue.add(ticket);
            ticketNumbers.put(key, ticketNumber + 1);
            System.out.println("✔️ Ticket ajouté : #" + ticketNumber);
        } else {
            System.out.println("⚠️ Ticket déjà présent : #" + ticketNumber);
        }

        return ticket;
    }


    public QueueTicket getCurrentTicket(String service, String location) {
        String key = service + "-" + location;
        return queues.getOrDefault(key, new LinkedList<>()).peek();
    }

    public int getRemainingCount(String service, String location) {
        String key = service + "-" + location;
        return queues.getOrDefault(key, new LinkedList<>()).size();
    }

    public void nextTicket(String service, String location) {
        String key = service + "-" + location;
        Queue<QueueTicket> queue = queues.get(key);
        Stack<QueueTicket> stack = history.get(key);

        if (queue != null && !queue.isEmpty()) {
            QueueTicket removedTicket = queue.poll(); // Supprime le ticket en tête de la file
            stack.push(removedTicket); // Sauvegarde le ticket en historique
        }
    }

    public void previousTicket(String service, String location) {
        String key = service + "-" + location;
        Queue<QueueTicket> queue = queues.get(key);
        Stack<QueueTicket> stack = history.get(key);

        if (stack != null && !stack.isEmpty()) {
            QueueTicket lastTicket = stack.pop(); // Récupère le dernier ticket traité
            LinkedList<QueueTicket> linkedQueue = (LinkedList<QueueTicket>) queue;
            linkedQueue.addFirst(lastTicket); // Replace le ticket en tête de la file
        }
    }

    public Queue<QueueTicket> getQueue(String service, String location) {
        String key = service + "-" + location;
        return queues.getOrDefault(key, new LinkedList<>());
    }
}
