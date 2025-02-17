import nmap

scanner = nmap.PortScanner()

def scan_network(target):
    scanner.scan(hosts=target, arguments="-sV")
    results = []
    for host in scanner.all_hosts():
        results.append({
            "ip": host,
            "state": scanner[host].state(),
            "open_ports": [
                {"port": port, "service": scanner[host]["tcp"][port]["name"]}
                for port in scanner[host].all_protocols()
            ]
        })
    return results
