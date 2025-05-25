import { Button, StyleSheet } from "react-native";

export const style = StyleSheet.create({
    container:{
        flex:1,
        padding: 20,
        justifyContent: "center",
        backgroundColor: "#f5f5f5",
    },
    title:{
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 30,
    },
    label:{
        fontSize:16,
        marginBottom: 5,
        marginTop:15,
    },
    inputContainer:{
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 10,
        paddingHorizontal: 10,
        backgroundColor: "#fff",
    },
    input:{
        flex:1,
        height:40,
        marginRight:10,
    },
    button: {
        backgroundColor: '#67aec8', // Azul claro
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
      },
    
      buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
      },
})