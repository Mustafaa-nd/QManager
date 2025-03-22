package sn.diamniadio.polytech.dsti.QManager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sn.diamniadio.polytech.dsti.QManager.entity.Agent;
import sn.diamniadio.polytech.dsti.QManager.entity.Location;
import sn.diamniadio.polytech.dsti.QManager.entity.ServiceEntity;

import java.util.List;
import java.util.Optional;

public interface AgentRepository extends JpaRepository<Agent, Long> {
    boolean existsByUsername(String username);
    Optional<Agent> findByUsername(String username);
    List<Agent> findByServiceAndLocation(ServiceEntity service, Location location);

}
