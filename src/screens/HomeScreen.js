import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { scanNetwork } from "../api/networkScanner";

const HomeScreen = ({ navigation }) => {
    const [targetIP, setTargetIP] = useState("");

    const handleScan = async () => {
        if (!targetIP) return alert("⚠️ Enter a valid IP address!");

        const data = await scanNetwork(targetIP);
        navigation.navigate("ResultsScreen", { scanResults: data.open_ports || [] });
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("DashboardScreen")}>
                <Text style={styles.backButtonText}>← Back</Text>
            </TouchableOpacity>
            <Text style={styles.title}>🔹 Enter IP to Scan 🔹</Text>
            <TextInput
                style={styles.input}
                placeholder="e.g. 192.168.70.208"
                placeholderTextColor="#777"
                value={targetIP}
                onChangeText={setTargetIP}
            />
            <TouchableOpacity style={styles.scanButton} onPress={handleScan}>
                <Text style={styles.scanButtonText}>⚡ Scan Network ⚡</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#0d0d0d",
        justifyContent: "center",
    },
    backButton: { position: "absolute", top: 40, left: 20, zIndex: 1 },
    backButtonText: { color: "#0ff", fontSize: 18 },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#0ff",
        textAlign: "center",
        marginBottom: 20,
        textShadowColor: "#0ff",
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: "#0ff",
        backgroundColor: "#111",
        color: "#0ff",
        padding: 10,
        borderRadius: 5,
        textAlign: "center",
        fontSize: 16,
        marginBottom: 20,
        textShadowColor: "#0ff",
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 5,
    },
    scanButton: {
        backgroundColor: "#ff007f",
        padding: 15,
        borderRadius: 5,
        alignItems: "center",
        shadowColor: "#ff007f",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
    },
    scanButtonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
        textShadowColor: "#000",
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 5,
    },
});

export default HomeScreen;