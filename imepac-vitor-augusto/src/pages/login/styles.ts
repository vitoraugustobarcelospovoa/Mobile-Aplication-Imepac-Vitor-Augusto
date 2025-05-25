import { StyleSheet, Dimensions } from "react-native";
import { themas } from "../../global/themes";

export const style = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
        backgroundColor: themas.cordefundo || "#f5f5f5",
    },
    logo: {
        width: 80,
        height: 80,
        marginBottom: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        color: themas.primaryText || "#000",
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        marginTop: 15,
        color: themas.secondaryText || "#333",
    },
    boxTop: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    boxMid: {
        width: "100%",
        marginBottom: 30,
    },
    boxBottom: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 10,
        paddingHorizontal: 10,
        backgroundColor: "#fff",
        height: 40,
    },
    input: {
        flex: 1,
        height: "100%",
        marginRight: 10,
    },
    button: {
        backgroundColor: themas.primary || '#67aec8',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
        width: "100%",
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});