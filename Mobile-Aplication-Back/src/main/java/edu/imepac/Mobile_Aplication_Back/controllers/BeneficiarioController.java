package edu.imepac.Mobile_Aplication_Back.controllers;
import edu.imepac.Mobile_Aplication_Back.model.BeneficiarioModel;
import edu.imepac.Mobile_Aplication_Back.services.BeneficiarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/beneficiarios")
@CrossOrigin(origins = "*")
public class BeneficiarioController {

    @Autowired
    private BeneficiarioService beneficiarioService;

    @PostMapping
    public ResponseEntity<BeneficiarioModel> criar(@RequestBody BeneficiarioModel beneficiario) {
        return ResponseEntity.ok(beneficiarioService.salvar(beneficiario));
    }

    @GetMapping
    public ResponseEntity<List<BeneficiarioModel>> listar() {
        return ResponseEntity.ok(beneficiarioService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<BeneficiarioModel> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(beneficiarioService.buscarPorId(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<BeneficiarioModel> atualizar(@PathVariable Long id, @RequestBody BeneficiarioModel beneficiario) {
        return ResponseEntity.ok(beneficiarioService.atualizar(id, beneficiario));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        beneficiarioService.deletar(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/buscar")
    public ResponseEntity<List<BeneficiarioModel>> buscarPorNomeOuCnpj(
            @RequestParam(required = false) String nome,
            @RequestParam(required = false) String cnpjCpf) {
        return ResponseEntity.ok(beneficiarioService.buscarPorNomeOuCnpj(nome, cnpjCpf));
    }

}