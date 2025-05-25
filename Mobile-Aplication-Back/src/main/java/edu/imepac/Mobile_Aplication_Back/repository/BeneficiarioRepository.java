package edu.imepac.Mobile_Aplication_Back.repository;
import edu.imepac.Mobile_Aplication_Back.model.BeneficiarioModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BeneficiarioRepository extends JpaRepository<BeneficiarioModel, Long> {
    Optional<BeneficiarioModel> findByCnpjCpf(String cnpjCpf);
}