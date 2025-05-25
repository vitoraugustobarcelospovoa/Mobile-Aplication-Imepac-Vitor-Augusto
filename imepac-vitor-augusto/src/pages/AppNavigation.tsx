import { NavigationContainer } from "@react-navigation/native";
import Login from './login';
import Cadastro from './cadastro';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState } from "react";
import { Alert } from "react-native";
import handleHome from "./home";
import CadastroBeneficiario from "./cadastro-beneficiario";

type RootStackParamList = {
    Login: undefined;
    Cadastro: undefined;
    Home:undefined;
}

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigation() {
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Cadastro" component={Cadastro} />
                <Stack.Screen name="Home" component={handleHome} />
                <Stack.Screen name="BeneficiarioCadastro" component={CadastroBeneficiario} />



            </Stack.Navigator>
        </NavigationContainer>
    )
}

