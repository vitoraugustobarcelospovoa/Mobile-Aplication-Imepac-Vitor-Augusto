package edu.imepac.Mobile_Aplication_Back.services;

import edu.imepac.Mobile_Aplication_Back.DTO.LoginRequest;
import edu.imepac.Mobile_Aplication_Back.model.UserModel;
import edu.imepac.Mobile_Aplication_Back.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public UserModel cadastrar(UserModel usuario) {
        if (usuarioRepository.existsByEmail(usuario.getEmail())) {
            throw new RuntimeException("Email já cadastrado!");
        }
        return usuarioRepository.save(usuario);
    }

    public List<UserModel> listar() {
        return usuarioRepository.findAll();
    }

    public UserModel buscarPorId(Long id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado!"));
    }

    public UserModel atualizar(Long id, UserModel usuario) {
        UserModel existente = buscarPorId(id);
        existente.setNome(usuario.getNome());
        existente.setEmail(usuario.getEmail());
        existente.setSenha(usuario.getSenha());
        return usuarioRepository.save(existente);
    }

    public void deletar(Long id) {
        usuarioRepository.deleteById(id);
    }

    public UserModel autenticar(LoginRequest login) {
        Optional<UserModel> userOpt = usuarioRepository.findByEmail(login.getEmail());
        if (userOpt.isEmpty()) {
            throw new RuntimeException("Usuário não encontrado");
        }

        UserModel user = userOpt.get();
        if (!user.getSenha().equals(login.getSenha())) {
            throw new RuntimeException("Senha incorreta");
        }

        return user; // Ou só retorne uma string se preferir, mas retornar o user é mais útil para JWT ou pegar dados
    }
    public List<UserModel> buscarPorNomeOuEmail(String nome, String email) {
        if ((nome == null || nome.isBlank()) && (email == null || email.isBlank())) {
            return listar();
        }
        return usuarioRepository.buscarPorNomeOuEmail(nome, email);
    }
}