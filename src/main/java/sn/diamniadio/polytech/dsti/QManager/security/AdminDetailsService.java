package sn.diamniadio.polytech.dsti.QManager.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Primary;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import sn.diamniadio.polytech.dsti.QManager.entity.Admin;
import sn.diamniadio.polytech.dsti.QManager.repository.AdminRepository;

import java.util.Collections;

@Service
@Primary
@RequiredArgsConstructor
public class AdminDetailsService implements UserDetailsService {

    private final AdminRepository adminRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Admin admin = adminRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Admin non trouvé: " + username));

        return new User(admin.getUsername(), admin.getPassword(), Collections.emptyList());
    }
}
