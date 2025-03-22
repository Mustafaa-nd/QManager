package sn.diamniadio.polytech.dsti.QManager;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;
import sn.diamniadio.polytech.dsti.QManager.entity.Admin;
import sn.diamniadio.polytech.dsti.QManager.repository.AdminRepository;

@SpringBootApplication
public class QManagerApplication {
	public static void main(String[] args) {
		SpringApplication.run(QManagerApplication.class, args);
	}

	@Bean
	CommandLineRunner initAdmin(AdminRepository adminRepository, PasswordEncoder encoder) {
		return args -> {
			if (adminRepository.findByUsername("admin").isEmpty()) {
				Admin admin = new Admin();
				admin.setUsername("admin");
				admin.setPassword(encoder.encode("secret")); // 🔐 mot de passe hashé
				adminRepository.save(admin);
				System.out.println("✅ Admin initial créé : admin / secret");
			}
		};
	}
}