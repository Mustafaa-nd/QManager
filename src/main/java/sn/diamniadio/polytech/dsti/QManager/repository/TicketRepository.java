package sn.diamniadio.polytech.dsti.QManager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import sn.diamniadio.polytech.dsti.QManager.entity.TicketEntity;

import java.util.List;

public interface TicketRepository extends JpaRepository<TicketEntity, Long> {

    List<TicketEntity> findByServiceAndLocationAndActiveTrueOrderByTicketNumberAsc(String service, String location);

    List<TicketEntity> findAllByOrderByCreatedAtDesc();

    int countByServiceAndLocationAndActiveTrue(String service, String location);

    TicketEntity findFirstByServiceAndLocationAndActiveTrueOrderByTicketNumberAsc(String service, String location);


    @Query("SELECT COALESCE(MAX(t.ticketNumber), 0) FROM TicketEntity t WHERE t.service = :service AND t.location = :location")
    int getMaxTicketNumber(@Param("service") String service, @Param("location") String location);

    TicketEntity findFirstByServiceAndLocationAndActiveFalseOrderByCreatedAtDesc(String service, String location);

}
