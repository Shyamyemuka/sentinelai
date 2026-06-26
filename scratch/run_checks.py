# scratch/run_checks.py
import requests
import json
import re
from pathlib import Path

base_url = "http://127.0.0.1:8000"

print("==================================================")
print("             SENTINELAI DIAGNOSTICS               ")
print("==================================================")

# Test 2 — Login Works
print("\n--- Test 2: Login Works ---")
login_res = requests.post(f"{base_url}/api/auth/login", json={"username": "admin", "password": "sentinelaipass"})
print("Status Code:", login_res.status_code)
token_data = login_res.json()
token = token_data.get("access_token")
print("Response JSON:", {"access_token": token[:20] + "..." if token else None, "token_type": token_data.get("token_type")})

# Test 3 — Login Rejects Wrong Credentials
print("\n--- Test 3: Login Rejects Wrong Credentials ---")
bad_login = requests.post(f"{base_url}/api/auth/login", json={"username": "admin", "password": "wrongpassword"})
print("Status Code:", bad_login.status_code)
print("Response:", bad_login.json())

# Test 4 — Classify Rejects No Token
print("\n--- Test 4: Classify Rejects No Token ---")
no_token = requests.post(f"{base_url}/api/classify", json={})
print("Status Code:", no_token.status_code)
print("Response (Raw):", no_token.text[:100])

# Test 5 — Classify Works With Valid Token
print("\n--- Test 5: Classify Works With Valid Token ---")
import pandas as pd
df = pd.read_csv('ml/data/X_test.csv', nrows=1)
row = df.iloc[0].to_dict()
headers = {"Authorization": f"Bearer {token}"}
valid_classify = requests.post(f"{base_url}/api/classify", json=row, headers=headers)
print("Status Code:", valid_classify.status_code)
print("Payload Output:")
print(json.dumps(valid_classify.json(), indent=2))

# Test 7 — Security Header Check
print("\n--- Test 7: Security Header Check ---")
head_res = requests.post(f"{base_url}/api/auth/login", json={"username": "admin", "password": "sentinelaipass"})
print("x-content-type-options:", head_res.headers.get("x-content-type-options"))
print("x-frame-options:", head_res.headers.get("x-frame-options"))
print("x-xss-protection:", head_res.headers.get("x-xss-protection"))
print("referrer-policy:", head_res.headers.get("referrer-policy"))
print("cache-control:", head_res.headers.get("cache-control"))

# Test 8 — No Secrets in Code
print("\n--- Test 8: No Secrets in Code ---")
secret_pattern = re.compile(r"(SECRET|PASSWORD|PASS_HASH)\s*=")
found_secrets = []
for p in Path('backend').glob('**/*.py'):
    with open(p) as f:
        for idx, line in enumerate(f, 1):
            if secret_pattern.search(line) and not any(k in line for k in ["os.getenv", "config.", "def verify_password", "#"]):
                found_secrets.append(f"{p}:{idx}: {line.strip()}")
print(f"Secret audit found {len(found_secrets)} results.")
for s in found_secrets:
    print(s)

# Test 9 — No Print Statements
print("\n--- Test 9: No Print Statements ---")
print_pattern = re.compile(r"^[ \t]*print\(")
found_prints = []
for p in Path('backend').glob('**/*.py'):
    with open(p) as f:
        for idx, line in enumerate(f, 1):
            if print_pattern.search(line) and not line.strip().startswith("#"):
                found_prints.append(f"{p}:{idx}: {line.strip()}")
print(f"Print audit found {len(found_prints)} results.")
for pr in found_prints:
    print(pr)
print("\n==================================================")
