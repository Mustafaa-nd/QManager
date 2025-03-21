package sn.diamniadio.polytech.dsti.QManager.model;

public class AgentAction {
    private String action;
    private int ticketNumber;

    public AgentAction(String action, int ticketNumber) {
        this.action = action;
        this.ticketNumber = ticketNumber;
    }

    public String getAction() {
        return action;
    }

    public int getTicketNumber() {
        return ticketNumber;
    }
}
