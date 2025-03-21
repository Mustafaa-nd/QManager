package sn.diamniadio.polytech.dsti.QManager.util;

import sn.diamniadio.polytech.dsti.QManager.model.Service;

import java.util.ArrayList;
import java.util.List;

public class DataLoader {
    public static List<Service> loadServices() {
        List<Service> services = new ArrayList<>();
        services.add(new Service("Seneau", List.of("Dakar", "Thies", "Kaolack")));
        services.add(new Service("Orange", List.of("Dakar", "Saint-Louis", "Ziguinchor")));
        services.add(new Service("Senelec", List.of("Mbour", "Rufisque", "Louga")));
        services.add(new Service("BankCentrale", List.of("Dakar", "Tambacounda", "Fatick")));
        services.add(new Service("Free", List.of("Kolda", "Matam", "Podor")));
        services.add(new Service("Expresso", List.of("Touba", "Kaffrine", "Sedhiou")));
        services.add(new Service("ProMobile", List.of("Dakar", "Diourbel", "Kedougou")));
        return services;
    }
}
