package sn.diamniadio.polytech.dsti.QManager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sn.diamniadio.polytech.dsti.QManager.entity.Admin;

import java.util.Optional;

public interface AdminRepository extends JpaRepository<Admin, Long> {
    Optional<Admin> findByUsername(String username);
}