package sn.diamniadio.polytech.dsti.QManager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sn.diamniadio.polytech.dsti.QManager.entity.ServiceEntity;

public interface ServiceRepository extends JpaRepository<ServiceEntity, Long> {
    boolean existsByName(String name);
}