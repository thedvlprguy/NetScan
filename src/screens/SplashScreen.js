import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

const SplashScreen = ({ navigation }) => {
    useEffect(() => {
        setTimeout(() => {
            navigation.replace("DashboardScreen");
        }, 3000); // 3-second delay
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Text style={styles.appName}>⚡ NetScan ⚡</Text>
            <Text style={styles.tagline}>Cyberpunk Network Scanner</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0d0d0d",
        justifyContent: "center",
        alignItems: "center",
    },
    appName: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#0ff",
        textShadowColor: "#0ff",
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 10,
    },
    tagline: {
        fontSize: 16,
        color: "#ff007f",
        marginTop: 10,
        textShadowColor: "#ff007f",
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 5,
    },
});

export default SplashScreen;