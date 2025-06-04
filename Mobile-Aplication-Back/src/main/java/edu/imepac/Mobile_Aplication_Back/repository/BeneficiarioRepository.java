package edu.imepac.Mobile_Aplication_Back.repository;
import edu.imepac.Mobile_Aplication_Back.model.BeneficiarioModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface BeneficiarioRepository extends JpaRepository<BeneficiarioModel, Long> {
    Optional<BeneficiarioModel> findByCnpjCpf(String cnpjCpf);
    @Query("SELECT b FROM BeneficiarioModel b WHERE " +
            "(:nome IS NULL OR LOWER(b.nomeRazaoSocial) LIKE LOWER(CONCAT('%', :nome, '%')) " +
            "OR LOWER(b.nomeFantasia) LIKE LOWER(CONCAT('%', :nome, '%'))) AND " +
            "(:cnpjCpf IS NULL OR REPLACE(REPLACE(REPLACE(b.cnpjCpf, '.', ''), '/', ''), '-', '') LIKE CONCAT('%', :cnpjCpf, '%'))")
    List<BeneficiarioModel> buscarPorNomeOuCnpj(@Param("nome") String nome, @Param("cnpjCpf") String cnpjCpf);


}