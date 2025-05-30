import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { style } from "./style";
import {DrawerScreenProps} from "@react-navigation/drawer";
import {RootStackParamList} from "../AppNavigation"

type Props = DrawerScreenProps<RootStackParamList, 'Cadastro'>

export default function Cadastro({ navigation }: Props) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function handleCadastro() {
  if (!nome || !email || !senha) {
    return Alert.alert("Preencha todos os campos");
  }

  fetch("http://192.168.1.23:8080/api/usuarios", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ nome, email, senha })
  })
    .then(async response => {
      if (response.ok) {
        Alert.alert("Cadastro realizado com sucesso!", "", [
          {
            text: "OK",
            onPress: () => navigation.navigate("Login"),
          },
        ]);
      } else {
        // Pega mensagem de erro do backend, se tiver
        const errorText = await response.text();
        Alert.alert("Erro ao cadastrar", errorText || "Erro desconhecido");
      }
    })
    .catch(error => {
      console.log("Erro ao cadastrar:", error);
      Alert.alert("Erro", "Não foi possível realizar o cadastro.");
    });
}

  return (
    <View style={style.container}>
      <Text style={style.title}>Página de Cadastro</Text>

      <Text style={style.label}>Nome</Text>
      <View style={style.inputContainer}>
        <TextInput
          style={style.input}
          value={nome}
          onChangeText={setNome}
          placeholder="Digite seu nome"
        />
        <MaterialIcons name="person" size={20} color="gray" />
      </View>

      <Text style={style.label}>Email</Text>
      <View style={style.inputContainer}>
        <TextInput
          style={style.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Digite seu email"
          keyboardType="email-address"
        />
        <MaterialIcons name="email" size={20} color="gray" />
      </View>

      <Text style={style.label}>Senha</Text>
      <View style={style.inputContainer}>
        <TextInput
          style={style.input}
          value={senha}
          onChangeText={setSenha}
          placeholder="Digite sua senha"
          secureTextEntry
        />
        <MaterialIcons name="lock" size={20} color="gray" />
      </View>

      <TouchableOpacity style={style.button} onPress={handleCadastro}>
        <Text style={style.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}