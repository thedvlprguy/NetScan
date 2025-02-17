import React from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";

const ResultsScreen = ({ route, navigation }) => {
    const { scanResults } = route.params;

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Text style={styles.backButtonText}>← Back</Text>
            </TouchableOpacity>
            <Text style={styles.title}>⚡ Scan Results ⚡</Text>
            {scanResults.length === 0 ? (
                <Text style={styles.noResults}>🚫 No open ports found.</Text>
            ) : (
                <FlatList
                    data={scanResults}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <Text style={styles.resultItem}>🔍 {item}</Text>
                    )}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#0d0d0d",
    },
    backButton: { position: "absolute", top: 40, left: 20, zIndex: 1 },
    backButtonText: { color: "#0ff", fontSize: 18 },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#0ff",
        textAlign: "center",
        marginBottom: 10,
        textShadowColor: "#0ff",
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 10,
    },
    noResults: {
        fontSize: 16,
        color: "#ff0044",
        textAlign: "center",
        fontWeight: "bold",
        textShadowColor: "#ff0044",
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 5,
    },
    resultItem: {
        fontSize: 16,
        padding: 8,
        color: "#00ff99",
        backgroundColor: "#222",
        marginVertical: 4,
        borderRadius: 5,
        textShadowColor: "#00ff99",
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 5,
    },
});

export default ResultsScreen;