import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const DashboardScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Dashboard</Text>

            <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate("HomeScreen")}>
                <Text style={styles.navButtonText}>🔍 Scanner</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate("OSINTScreen")}>
                <Text style={styles.navButtonText}>🌐 OSINT</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate("ExploitScannerScreen")}>
                <Text style={styles.navButtonText}>💀 Exploits</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#0d0d0d", padding: 20, justifyContent: "center", alignItems: "center" },
    title: { fontSize: 24, fontWeight: "bold", color: "#0ff", marginBottom: 30, textAlign: "center" },
    navButton: { backgroundColor: "#ff007f", padding: 15, borderRadius: 5, width: "80%", alignItems: "center", marginVertical: 10 },
    navButtonText: { color: "#fff", fontWeight: "bold", fontSize: 18 },
});

export default DashboardScreen;