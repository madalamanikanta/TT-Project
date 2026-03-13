import json
import urllib.request

# login
url = "http://localhost:8080/api/auth/login"
data = json.dumps({"email": "madalamanikanta38@gmail.com", "password": "madalamani@7075"}).encode("utf-8")
req = urllib.request.Request(url, data=data, headers={"Content-Type": "application/json"})
resp = urllib.request.urlopen(req)
resp_json = json.loads(resp.read().decode("utf-8"))
print("login response:", resp_json)

# use token to call protected endpoint
token = resp_json.get("token")
url2 = "http://localhost:8080/api/admin/dashboard"
req2 = urllib.request.Request(url2, headers={"Authorization": f"Bearer {token}"})
resp2 = urllib.request.urlopen(req2)
print("dashboard response:", resp2.read().decode("utf-8"))
