from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import requests
import whois
import subprocess
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
LEAKCHECK_API_KEY = os.getenv("LEAKCHECK_API_KEY")

# Initialize FastAPI
app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def check_social_profile(url: str) -> bool:
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/91.0.4472.124',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
    }
    try:
        response = requests.get(url, headers=headers, timeout=5)
        return response.status_code == 200
    except:
        return False

@app.get("/social/{username}")
def check_social(username: str):
    social_platforms = {
        "Twitter": f"https://twitter.com/{username}",
        "Instagram": f"https://instagram.com/{username}",
        "GitHub": f"https://github.com/{username}",
        "LinkedIn": f"https://linkedin.com/in/{username}"
    }
    
    found_accounts = {}
    for platform, url in social_platforms.items():
        if check_social_profile(url):
            found_accounts[platform] = url
    
    return {
        "found": bool(found_accounts),
        "platforms": found_accounts,
        "count": len(found_accounts)
    }

@app.get("/breach/{query}")
async def check_breach(query: str):
    if not LEAKCHECK_API_KEY:
        return {"found": False, "message": "LeakCheck API key not configured"}
    
    # Handle both email and username
    email = query if "@" in query else f"{query}@gmail.com"
    
    url = "https://leakcheck.net/api"
    params = {
        "key": LEAKCHECK_API_KEY,
        "check": email,
        "type": "email"
    }
    
    try:
        response = requests.get(url, params=params, timeout=10)
        if response.status_code == 200:
            data = response.json()
            return {
                "found": data.get("success", False),
                "results": data.get("result", []),
                "count": len(data.get("result", [])),
                "query": email
            }
        return {
            "found": False,
            "message": "No breaches found or API error",
            "query": email
        }
    except Exception as e:
        return {
            "found": False,
            "message": str(e),
            "query": email
        }

@app.get("/whois/{query}")
def whois_lookup(query: str):
    try:
        # Check multiple domains for usernames
        if "." not in query:
            domains_to_check = [f"{query}.com", f"{query}.net", f"{query}.org"]
            for domain in domains_to_check:
                try:
                    domain_info = whois.whois(domain)
                    if domain_info.domain_name:
                        return {
                            "found": True,
                            "registrar": domain_info.registrar,
                            "creation_date": str(domain_info.creation_date),
                            "expiration_date": str(domain_info.expiration_date),
                            "status": domain_info.status,
                            "domain": domain
                        }
                except:
                    continue
            return {
                "found": False,
                "message": f"No domain information found for {query}"
            }
        
        # Direct domain lookup
        domain_info = whois.whois(query)
        return {
            "found": True,
            "registrar": domain_info.registrar,
            "creation_date": str(domain_info.creation_date),
            "expiration_date": str(domain_info.expiration_date),
            "status": domain_info.status,
            "domain": query
        }
    except Exception as e:
        return {
            "found": False,
            "message": str(e)
        }

@app.get("/scan/nmap/{target_ip}")
async def scan_nmap(target_ip: str):
    try:
        command = ["nmap", "-p-", "-T4", target_ip]
        result = subprocess.run(command, capture_output=True, text=True)
        
        open_ports = []
        for line in result.stdout.split("\n"):
            if "/tcp" in line and "open" in line:
                port = line.split("/")[0].strip()
                open_ports.append(port)
        
        return {
            "found": bool(open_ports),
            "open_ports": open_ports,
            "count": len(open_ports)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)