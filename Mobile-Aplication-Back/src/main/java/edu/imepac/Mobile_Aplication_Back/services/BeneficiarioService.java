package edu.imepac.Mobile_Aplication_Back.services;
import edu.imepac.Mobile_Aplication_Back.model.BeneficiarioModel;
import edu.imepac.Mobile_Aplication_Back.repository.BeneficiarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BeneficiarioService {

    @Autowired
    private BeneficiarioRepository beneficiarioRepository;

    public BeneficiarioModel salvar(BeneficiarioModel beneficiario) {
        return beneficiarioRepository.save(beneficiario);
    }

    public List<BeneficiarioModel> listarTodos() {
        return beneficiarioRepository.findAll();
    }

    public BeneficiarioModel buscarPorId(Long id) {
        return beneficiarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Beneficiário não encontrado"));
    }

    public BeneficiarioModel atualizar(Long id, BeneficiarioModel beneficiarioAtualizado) {
        BeneficiarioModel existente = buscarPorId(id);
        // Atualiza todos os campos
        existente.setCnpjCpf(beneficiarioAtualizado.getCnpjCpf());
        existente.setNomeRazaoSocial(beneficiarioAtualizado.getNomeRazaoSocial());
        existente.setNomeFantasia(beneficiarioAtualizado.getNomeFantasia());
        existente.setPfPj(beneficiarioAtualizado.getPfPj());
        existente.setEndereco(beneficiarioAtualizado.getEndereco());
        existente.setCep(beneficiarioAtualizado.getCep());
        existente.setBairro(beneficiarioAtualizado.getBairro());
        existente.setCidade(beneficiarioAtualizado.getCidade());
        existente.setUf(beneficiarioAtualizado.getUf());
        existente.setTelefone(beneficiarioAtualizado.getTelefone());
        existente.setEmail(beneficiarioAtualizado.getEmail());
        existente.setObservacoes(beneficiarioAtualizado.getObservacoes());
        return beneficiarioRepository.save(existente);
    }
    public List<BeneficiarioModel> buscarPorNomeOuCnpj(String nome, String cnpjCpf) {
        if ((nome == null || nome.isBlank()) && (cnpjCpf == null || cnpjCpf.isBlank())) {
            return listarTodos();
        }
        return beneficiarioRepository.buscarPorNomeOuCnpj(nome, cnpjCpf);
    }


    public void deletar(Long id) {
        beneficiarioRepository.deleteById(id);
    }
}