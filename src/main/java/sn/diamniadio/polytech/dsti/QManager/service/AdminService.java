package sn.diamniadio.polytech.dsti.QManager.service;

import org.springframework.stereotype.Service;
import sn.diamniadio.polytech.dsti.QManager.model.AgentAction;

import java.util.ArrayList;
import java.util.List;

@Service
public class AdminService {
    private final List<AgentAction> actions = new ArrayList<>();

    public void logAction(String action, int ticketNumber) {
        actions.add(new AgentAction(action, ticketNumber));
    }

    public List<AgentAction> getActions() {
        return actions;
    }
}
