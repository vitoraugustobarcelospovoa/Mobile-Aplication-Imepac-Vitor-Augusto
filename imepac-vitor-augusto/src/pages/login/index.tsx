import React, { useState } from "react";
import {
    Text, View, Image, TextInput,
    TouchableOpacity,
    Alert
} from "react-native";
import { style } from './styles';
import { MaterialIcons } from '@expo/vector-icons';
import Logo from '../../assets/favicon.png';
import { themas } from "../../global/themes";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { RootStackParamList } from "../AppNavigation";

type Props = DrawerScreenProps<RootStackParamList, 'login'>;

export default function Login({ navigation }: Props) {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    function getLogin() {
    if (!email || !senha) {
        return Alert.alert('Preencha todos os campos');
    }

    fetch("http://192.168.1.23:8080/api/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, senha: senha })
    })
    .then(async response => {
        if (response.ok) {
            Alert.alert('Logado com sucesso!', '', [
                {
                    text: 'OK',
                    onPress: () => navigation.navigate('Home')
                }
            ]);
        } else {
            const errorText = await response.text();
            Alert.alert('Erro', errorText || 'Não foi possível realizar o login.');
        }
    })
    .catch(error => {
        console.log('Erro ao logar:', error);
        Alert.alert('Erro', 'Não foi possível realizar o login.');
    });
}
    return (
        <View style={style.container}>
            <View style={style.boxTop}>
                <Image source={Logo} style={style.logo} />
                <Text style={style.title}>Bem-vindo</Text>
            </View>

            <View style={style.boxMid}>
               <Text style={style.label}>Email</Text>
            <View style={style.inputContainer}>
                <TextInput
                    style={style.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Digite seu email"
                    autoCapitalize="none"
                    keyboardType="email-address"
                />
            <MaterialIcons name="email" size={20} color={themas.black} />
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
                    <MaterialIcons name="lock" size={20} color={themas.black} />
                </View>
            </View>

            <View style={style.boxBottom}>
                <TouchableOpacity style={style.button} onPress={getLogin}>
                    <Text style={style.buttonText}>Entrar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={style.button} onPress={() => navigation.navigate("Cadastro")}>
                    <Text style={style.buttonText}>Não tem conta? Cadastre-se</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}