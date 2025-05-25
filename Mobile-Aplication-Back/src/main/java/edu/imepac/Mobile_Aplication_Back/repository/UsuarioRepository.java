package edu.imepac.Mobile_Aplication_Back.repository;


import edu.imepac.Mobile_Aplication_Back.model.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<UserModel, Long> {
    boolean existsByEmail(String email);
    Optional<UserModel> findByEmail(String email);
}