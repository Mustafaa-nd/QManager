package sn.diamniadio.polytech.dsti.QManager.model;

import java.util.List;

public class Service {
    private String name;
    private List<String> locations;

    public Service(String name, List<String> locations) {
        this.name = name;
        this.locations = locations;
    }

    public String getName() {
        return name;
    }

    public List<String> getLocations() {
        return locations;
    }

    @Override
    public String toString() {
        return "Service{name='" + name + "', locations=" + locations + "}";
    }
}
