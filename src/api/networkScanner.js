const API_BASE_URL = "http://192.168.70.208:8000"; // Use your local IP

export const scanNetwork = async (targetIP) => {
    try {
        const response = await fetch(`http://192.168.70.208:8000/scan/nmap/${targetIP}`);
        const data = await response.json();
        console.log("Nmap Scan Response:", data); // Debugging
        return data;
    } catch (error) {
        console.error("Network scan error:", error);
        return { error: "Failed to scan network" };
    }
};


export const scanWithShodan = async (targetIP) => {
    try {
        const response = await fetch(`${API_BASE_URL}/scan/shodan/${targetIP}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Shodan scan error:", error);
        return { error: "Failed to fetch data from Shodan" };
    }
};
