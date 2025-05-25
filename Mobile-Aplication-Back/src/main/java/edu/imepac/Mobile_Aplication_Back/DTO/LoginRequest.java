package edu.imepac.Mobile_Aplication_Back.DTO;

import lombok.Data;

@Data
public class LoginRequest {
    private String email;
    private String senha;
}