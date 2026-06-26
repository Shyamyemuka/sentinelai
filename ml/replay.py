import pandas as pd
import requests
import time
import argparse
import sys
from pathlib import Path

def get_token(base_url: str, username: str, password: str) -> str:
    try:
        response = requests.post(
            f"{base_url}/api/auth/login",
            json={"username": username, "password": password},
            timeout=10
        )
        if response.status_code != 200:
            print(f"Login failed: {response.status_code} - {response.text}")
            sys.exit(1)
        return response.json()["access_token"]
    except Exception as e:
        print(f"Failed to connect to backend: {e}")
        sys.exit(1)

def main():
    parser = argparse.ArgumentParser(description="SentinelAI traffic replay")
    parser.add_argument("--delay", type=float, default=0.2, help="Delay between flows in seconds")
    parser.add_argument("--limit", type=int, default=None, help="Max flows to send (None = all)")
    parser.add_argument("--base-url", default="http://localhost:8000")
    parser.add_argument("--username", default="admin")
    parser.add_argument("--password", required=True)
    args = parser.parse_args()

    ml_dir = Path(__file__).resolve().parent
    data_dir = ml_dir / 'data'

    print("Authenticating...")
    token = get_token(args.base_url, args.username, args.password)
    headers = {"Authorization": f"Bearer {token}"}

    print("Loading test set...")
    if not (data_dir / 'X_test.csv').exists() or not (data_dir / 'y_test.csv').exists():
        print(f"Error: test set files not found in {data_dir}. Please run preprocess.py first.")
        sys.exit(1)

    X_test = pd.read_csv(data_dir / 'X_test.csv')
    y_test = pd.read_csv(data_dir / 'y_test.csv')
    
    # Load label mapping to display true class names in replay logs
    label_mapping = {}
    if (ml_dir / 'label_mapping.json').exists():
        import json
        with open(ml_dir / 'label_mapping.json') as f:
            # Keys in JSON are strings, convert them back to integers
            label_mapping = {int(k): v for k, v in json.load(f).items()}

    # Merge features and labels for row-by-row iteration
    df = pd.concat([X_test, y_test], axis=1)

    if args.limit:
        df = df.head(args.limit)

    label_col = "Label"
    feature_cols = [c for c in df.columns if c != label_col]

    print(f"Sending {len(df)} flows with {args.delay}s delay...\n")

    attack_counts = {}
    benign_count = 0

    for i, (_, row) in enumerate(df.iterrows(), 1):
        payload = row[feature_cols].to_dict()
        true_label_idx = int(row[label_col])
        true_label = label_mapping.get(true_label_idx, str(true_label_idx))

        try:
            response = requests.post(
                f"{args.base_url}/api/classify",
                json=payload,
                headers=headers,
                timeout=5
            )
            
            if response.status_code == 200:
                result = response.json()
                attack_type = result.get("attack_type", "ERROR")
                severity = result.get("severity", "-")
                confidence = result.get("confidence", 0)

                if attack_type == "BENIGN":
                    benign_count += 1
                else:
                    attack_counts[attack_type] = attack_counts.get(attack_type, 0) + 1

                # Console output for demo visibility
                marker = "[HIGH]" if severity == "High" else "[MED ]" if severity == "Medium" else "[LOW ]" if severity == "Low" else "[OK  ]"
                print(f"[{i:04d}] {marker} {attack_type:<30} {confidence*100:.1f}%  (true: {true_label})")
            else:
                print(f"[{i:04d}] [ERR ] Server error: {response.status_code} - {response.text}")

        except requests.exceptions.RequestException as e:
            print(f"[{i:04d}] [ERR ] Request failed: {e}")

        time.sleep(args.delay)

    # Summary
    print("\n" + "="*50)
    print(f"BENIGN flows:   {benign_count}")
    print("ATTACK detections:")
    for attack, count in sorted(attack_counts.items(), key=lambda x: -x[1]):
        print(f"  {attack:<30} {count}")


if __name__ == "__main__":
    main()
