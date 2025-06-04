package edu.imepac.Mobile_Aplication_Back.controllers;


import edu.imepac.Mobile_Aplication_Back.DTO.LoginRequest;
import edu.imepac.Mobile_Aplication_Back.model.UserModel;
import edu.imepac.Mobile_Aplication_Back.repository.UsuarioRepository;
import edu.imepac.Mobile_Aplication_Back.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostMapping
    public UserModel cadastrar(@RequestBody UserModel usuario) {
        return usuarioService.cadastrar(usuario);
    }

    @GetMapping
    public List<UserModel> listar() {
        return usuarioService.listar();
    }

    @GetMapping("/{id}")
    public UserModel buscarPorId(@PathVariable Long id) {
        return usuarioService.buscarPorId(id);
    }

    @PutMapping("/{id}")
    public UserModel atualizar(@PathVariable Long id, @RequestBody UserModel usuario) {
        return usuarioService.atualizar(id, usuario);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        usuarioService.deletar(id);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest login) {
        try {
            UserModel user = usuarioService.autenticar(login);
            return ResponseEntity.ok("Login realizado com sucesso!");
        } catch (RuntimeException ex) {
            return ResponseEntity.status(401).body(ex.getMessage());
        }
    }
    @GetMapping("/buscar")
    public ResponseEntity<List<UserModel>> buscarUsuarios(
            @RequestParam(required = false) String nome,
            @RequestParam(required = false) String email) {
        return ResponseEntity.ok(usuarioService.buscarPorNomeOuEmail(nome, email));
    }
}

