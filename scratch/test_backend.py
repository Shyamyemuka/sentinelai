import requests
import json
import time

base_url = "http://127.0.0.1:8000"

print("--- Testing POST /api/auth/login ---")
# Test incorrect login
bad_login = requests.post(f"{base_url}/api/auth/login", json={"username": "admin", "password": "wrongpassword"})
print("Bad Login Status:", bad_login.status_code)
print("Bad Login Body:", bad_login.json())

# Test correct login
good_login = requests.post(f"{base_url}/api/auth/login", json={"username": "admin", "password": "sentinelaipass"})
print("Good Login Status:", good_login.status_code)
login_data = good_login.json()
print("Good Login Body:", "access_token" in login_data)

token = login_data["access_token"]
headers = {"Authorization": f"Bearer {token}"}

print("\n--- Testing POST /api/classify (Unauthorized) ---")
unauth_classify = requests.post(f"{base_url}/api/classify", json={})
print("Unauth Classify Status:", unauth_classify.status_code)
print("Unauth Classify Body:", unauth_classify.json())

print("\n--- Testing POST /api/classify (Authorized, malformed) ---")
malformed_classify = requests.post(f"{base_url}/api/classify", json={"Destination Port": "not_an_int"}, headers=headers)
print("Malformed Classify Status:", malformed_classify.status_code)
print("Malformed Classify Body:", malformed_classify.json())

print("\n--- Testing POST /api/classify (Authorized, valid) ---")
# Let's read a single line of test data to get a realistic network flow
import pandas as pd
test_df = pd.read_csv("ml/data/X_test.csv", nrows=1)
valid_payload = test_df.to_dict(orient="records")[0]

valid_classify = requests.post(f"{base_url}/api/classify", json=valid_payload, headers=headers)
print("Valid Classify Status:", valid_classify.status_code)
classify_result = valid_classify.json()
print("Valid Classify Result:")
print(json.dumps(classify_result, indent=2))

print("\nBackend testing complete.")
