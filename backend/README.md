# SentinelAI — FastAPI Backend Server

This directory contains the Python-based FastAPI backend classification engine and streaming alerts broker.

---

## Technical Specifications

* **Web Framework:** FastAPI
* **Server Runner:** Uvicorn
* **Schema Validation:** Pydantic v2
* **Authentication:** JWT (JSON Web Tokens) with HS256 signing and local Bcrypt password verification.
* **Network Classifier:** Real-time ML inference wrapper that loads the pre-trained `model.pkl` and `label_encoder.pkl` once at startup.
* **SSE Stream Broker:** Server-Sent Events (SSE) dispatcher that broadcasts threat alert payloads in real-time to active subscribers.
* **Simulator Integration:** Native background loop execution wrapper (`simulator.py`) that handles CSV traffic flow iteration for local analyst console demonstrations.

---

## Directory Context

```text
backend/
├── main.py            # FastAPI entrypoint, routing table, and CORS middleware configuration.
├── auth.py            # JWT encryption, secure cookie decoding, and Bcrypt validation helper.
├── classify.py        # real-time flow features extraction and XGBoost inference scoring wrapper.
├── stream.py          # SSE connection list management and event broadcasting loops.
├── simulator.py       # Asynchronous background csv-flow simulator manager.
├── schemas.py         # 78-feature Pydantic validation models mapping CICIDS feature lists.
└── config.py          # Secure environment variable loading validation via Pydantic-Settings.
```

---

## Local Development Execution

Make sure your virtual environment is active before starting:

```bash
# 1. Install local dependencies
pip install -r requirements.txt

# 2. Launch FastAPI web server on default port 8000
python -m uvicorn main.py:app --host 127.0.0.1 --port 8000 --reload
```
