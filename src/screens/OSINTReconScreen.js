import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";

const OSINTReconScreen = ({ navigation }) => {
    const [query, setQuery] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = async () => {
        if (!query) return alert("Enter a username or domain");
        setIsLoading(true);

        try {
            const [breachResponse, socialResponse, whoisResponse] = await Promise.all([
                fetch(`http://192.168.70.208:8000/breach/${query}`),
                fetch(`http://192.168.70.208:8000/social/${query}`),
                fetch(`http://192.168.70.208:8000/whois/${query}`)
            ]);

            const [breachData, socialData, whoisData] = await Promise.all([
                breachResponse.json(),
                socialResponse.json(),
                whoisResponse.json()
            ]);

            const results = {
                breachInfo: breachData,
                socialPresence: socialData,
                whoisInfo: whoisData
            };

            navigation.navigate('OSINTReconResults', { results });
        } catch (error) {
            console.error("Error fetching OSINT data:", error);
            alert("Failed to fetch OSINT data");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity 
                style={styles.backButton} 
                onPress={() => navigation.navigate('DashboardScreen')}
            >
                <Text style={styles.backButtonText}>← Back</Text>
            </TouchableOpacity>

            <View style={styles.centerContent}>
                <Text style={styles.title}>🔍 OSINT Recon</Text>
                <Text style={styles.subtitle}>Search for usernames or domains</Text>
                
                <TextInput
                    style={styles.input}
                    placeholder="Enter username or domain"
                    placeholderTextColor="#777"
                    value={query}
                    onChangeText={setQuery}
                    autoCapitalize="none"
                    autoCorrect={false}
                />

                <TouchableOpacity 
                    style={[styles.searchButton, { opacity: isLoading ? 0.7 : 1 }]} 
                    onPress={handleSearch}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <ActivityIndicator color="#000" />
                    ) : (
                        <Text style={styles.searchButtonText}>🔎 Search</Text>
                    )}
                </TouchableOpacity>

                <View style={styles.instructionsContainer}>
                    <Text style={styles.instructionTitle}>This tool will search for:</Text>
                    <Text style={styles.instructionText}>• Data breaches</Text>
                    <Text style={styles.instructionText}>• Social media profiles</Text>
                    <Text style={styles.instructionText}>• Domain information</Text>
                </View>
            </View>

            <Text style={styles.footer}>Use responsibly • Data may be incomplete</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        padding: 20,
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
        zIndex: 1,
    },
    backButtonText: {
        color: '#0ff',
        fontSize: 18,
    },
    centerContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#0ff',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#888',
        marginBottom: 30,
    },
    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#0ff',
        borderRadius: 8,
        padding: 15,
        color: '#fff',
        backgroundColor: '#222',
        marginBottom: 20,
        fontSize: 16,
    },
    searchButton: {
        width: '100%',
        height: 50,
        backgroundColor: '#0ff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
    searchButtonText: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
    },
    instructionsContainer: {
        width: '100%',
        backgroundColor: '#1a1a1a',
        padding: 20,
        borderRadius: 8,
        marginTop: 30,
    },
    instructionTitle: {
        color: '#0ff',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    instructionText: {
        color: '#fff',
        fontSize: 14,
        marginBottom: 5,
    },
    footer: {
        color: '#666',
        fontSize: 12,
        textAlign: 'center',
        marginBottom: 10,
    },
});

export default OSINTReconScreen;