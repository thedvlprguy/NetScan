import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import SplashScreen from "./screens/SplashScreen";
import DashboardScreen from "./screens/DashboardScreen";
import HomeScreen from "./screens/HomeScreen";
import ResultsScreen from "./screens/ResultsScreen";
import OSINTReconScreen from "./screens/OSINTReconScreen";
import ExploitScannerScreen from "./screens/ExploitScannerScreen";
import OSINTReconResults from "./screens/OSINTReconResults";

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator 
                screenOptions={{ headerShown: false }} 
                initialRouteName="SplashScreen"
            >
                <Stack.Screen name="SplashScreen" component={SplashScreen} />
                <Stack.Screen name="DashboardScreen" component={DashboardScreen} />
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
                <Stack.Screen name="ResultsScreen" component={ResultsScreen} />
                <Stack.Screen name="OSINTScreen" component={OSINTReconScreen} />
                <Stack.Screen name="ExploitScannerScreen" component={ExploitScannerScreen} />
                <Stack.Screen name="OSINTReconResults" component={OSINTReconResults} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}