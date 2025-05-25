package edu.imepac.Mobile_Aplication_Back.model;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class BeneficiarioModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String cnpjCpf;

    private String nomeRazaoSocial;

    private String nomeFantasia;

    @JsonProperty("PF_PJ")
    private Boolean pfPj; // true = PJ, false = PF

    private String endereco;

    private String cep;

    private String bairro;

    private String cidade;

    private String uf;

    private String telefone;

    private String email;

    @Column(length = 1000)
    private String observacoes;
}