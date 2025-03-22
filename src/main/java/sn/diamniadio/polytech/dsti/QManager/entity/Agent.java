package sn.diamniadio.polytech.dsti.QManager.entity;

import jakarta.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Agent {
    @Id
    @GeneratedValue
    private Long id;

    private String username;
    private String password;

    @ManyToOne
    @JsonIgnore
    private ServiceEntity service;

    @ManyToOne
    @JsonIgnore
    private Location location;
}
