package sn.diamniadio.polytech.dsti.QManager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sn.diamniadio.polytech.dsti.QManager.entity.Location;

public interface LocationRepository extends JpaRepository<Location, Long> {
}