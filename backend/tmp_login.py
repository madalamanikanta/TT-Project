import json
import urllib.request

url = "http://localhost:8080/api/auth/login"
data = json.dumps({"email": "madalamanikanta38@gmail.com", "password": "madalamani@7075"}).encode("utf-8")
req = urllib.request.Request(url, data=data, headers={"Content-Type": "application/json"})
resp = urllib.request.urlopen(req)
print(resp.status)
print(resp.read().decode("utf-8"))
