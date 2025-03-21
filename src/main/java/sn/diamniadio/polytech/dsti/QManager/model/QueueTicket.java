package sn.diamniadio.polytech.dsti.QManager.model;

public class QueueTicket {
    private int ticketNumber;
    private String service;
    private String location;

    public QueueTicket(int ticketNumber, String service, String location) {
        this.ticketNumber = ticketNumber;
        this.service = service;
        this.location = location;
    }

    public int getTicketNumber() {
        return ticketNumber;
    }

    public String getService() {
        return service;
    }

    public String getLocation() {
        return location;
    }
}
