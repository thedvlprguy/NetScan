import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Linking } from 'react-native';

const OSINTReconResults = ({ route, navigation }) => {
    const { results } = route.params || {};

    const handleUrlPress = (url) => {
        Linking.openURL(url);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity 
                style={styles.backButton} 
                onPress={() => navigation.goBack()}
            >
                <Text style={styles.backButtonText}>← Back</Text>
            </TouchableOpacity>

            <ScrollView style={styles.scrollContainer}>
                <Text style={styles.title}>OSINT Results</Text>

                {/* Social Media Results */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>🌐 Social Media</Text>
                    {results?.socialPresence?.platforms && 
                     Object.entries(results.socialPresence.platforms).length > 0 ? (
                        Object.entries(results.socialPresence.platforms).map(([platform, url], index) => (
                            <TouchableOpacity 
                                key={index} 
                                onPress={() => handleUrlPress(url)}
                            >
                                <Text style={styles.linkText}>
                                    • {platform}: {url}
                                </Text>
                            </TouchableOpacity>
                        ))
                    ) : (
                        <Text style={styles.noDataText}>No social media profiles found</Text>
                    )}
                </View>

                {/* Breach Information */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>🔐 Breach Information</Text>
                    {results?.breachInfo?.found ? (
                        results.breachInfo.results.map((breach, index) => (
                            <Text key={index} style={styles.resultText}>
                                • Source: {breach.source || 'Unknown'}
                                {breach.details && `\n  Details: ${breach.details}`}
                            </Text>
                        ))
                    ) : (
                        <Text style={styles.noDataText}>No breach data found</Text>
                    )}
                </View>

                {/* WHOIS Information */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>📋 WHOIS Information</Text>
                    {results?.whoisInfo?.found ? (
                        <>
                            <Text style={styles.resultText}>Registrar: {results.whoisInfo.registrar || 'N/A'}</Text>
                            <Text style={styles.resultText}>Created: {results.whoisInfo.creation_date || 'N/A'}</Text>
                            <Text style={styles.resultText}>Expires: {results.whoisInfo.expiration_date || 'N/A'}</Text>
                            <Text style={styles.resultText}>Status: {results.whoisInfo.status || 'N/A'}</Text>
                        </>
                    ) : (
                        <Text style={styles.noDataText}>No WHOIS information available</Text>
                    )}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    scrollContainer: {
        flex: 1,
        padding: 20,
        marginTop: 60,
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#0ff',
        marginBottom: 20,
        textAlign: 'center',
    },
    section: {
        backgroundColor: '#1a1a1a',
        padding: 15,
        borderRadius: 8,
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#0ff',
        marginBottom: 10,
    },
    resultText: {
        color: '#fff',
        fontSize: 14,
        marginVertical: 2,
    },
    linkText: {
        color: '#0ff',
        fontSize: 14,
        marginVertical: 2,
        textDecorationLine: 'underline',
    },
    noDataText: {
        color: '#666',
        fontStyle: 'italic',
    },
});

export default OSINTReconResults;