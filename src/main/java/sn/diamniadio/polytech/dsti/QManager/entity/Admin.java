package sn.diamniadio.polytech.dsti.QManager.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Admin {
    @Id
    @GeneratedValue
    private Long id;

    private String username;
    private String password; // hashé
}
