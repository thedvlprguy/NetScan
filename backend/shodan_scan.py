import shodan
from config import SHODAN_API_KEY

shodan_client = shodan.Shodan(SHODAN_API_KEY)

def scan_ip(ip):
    try:
        result = shodan_client.host(ip)
        return {
            "ip": result["ip_str"],
            "ports": result.get("ports", []),
            "org": result.get("org", "N/A"),
            "os": result.get("os", "Unknown"),
            "vulnerabilities": result.get("vulns", [])
        }
    except shodan.APIError as e:
        return {"error": str(e)}
