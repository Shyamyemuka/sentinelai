# SentinelAI

**AI-Based Intrusion Detection System**  
Cyber Defense & Security Analyst Internship — Blackbucks · 2026

SentinelAI is a full-stack intrusion detection platform that classifies malicious network traffic in real time using a trained XGBoost model and surfaces prioritized alerts through a live analyst dashboard. Built on the CICIDS 2017 benchmark dataset, it targets ≥95% F1-score across eight attack categories while maintaining a hardened, production-grade application security posture.

---

## Architecture

```
[CICIDS 2017 Dataset]
        │
        ▼
[ML Training Pipeline]  ──────────►  model.pkl
        
[Demo Replay Script]
        │  POST /api/classify
        ▼
[FastAPI Backend]
   JWT Auth · Pydantic Validation · XGBoost Inference
        │  SSE stream
        ▼
[Next.js Dashboard]
   Live Alert Feed · Attack Charts · Feature Importance
```

---

## Model Performance

| Metric | Score |
|--------|-------|
| Weighted F1 | ≥ 0.95 |
| False Positive Rate | < 5% |
| Dataset | CICIDS 2017 |
| Classifier | XGBoost 2.1 |
| Classes | 8 (BENIGN + 7 attack types) |

Confusion matrix and per-class breakdown: see `/ml/evaluation_report/`

---

## Attack Classes Detected

- BENIGN
- DoS GoldenEye / Hulk / Slowhttptest / Slowloris
- DDoS
- FTP-Patator · SSH-Patator (Brute Force)
- PortScan
- Web Attack — Brute Force · XSS · SQL Injection

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| ML | Python 3.12 · XGBoost 2.1 · Scikit-learn 1.5 · SMOTE |
| Backend | FastAPI 0.115 · Uvicorn · Pydantic v2 · JWT |
| Frontend | Next.js 15 · TypeScript · Recharts · Tailwind CSS |

---

## Setup

### Prerequisites
- Python 3.12+
- Node.js 20 LTS+
- CICIDS 2017 dataset CSVs (see Dataset section)

### 1. Clone and configure environment

```bash
git clone https://github.com/yourusername/sentinelai.git
cd sentinelai
cp .env.example .env
# Fill in values in .env — see .env.example for required keys
```

### 2. Train the model

```bash
cd ml
pip install -r requirements.txt
python train.py
# Outputs: model.pkl, label_encoder.pkl, feature_importance.json
```

### 3. Start the backend

```bash
cd backend
uvicorn main:app --host 0.0.0.0 --port 8000
```

### 4. Start the frontend

```bash
cd frontend
npm install
npm run dev
# Dashboard at http://localhost:3000
```

### 5. Run the demo replay

```bash
# In a separate terminal, after logging into the dashboard
cd ml
python replay.py --delay 200
```

---

## Dataset

CICIDS 2017 is available from the Canadian Institute for Cybersecurity:  
https://www.unb.ca/cic/datasets/ids-2017.html

Download all five day-CSVs and place them in `ml/data/raw/`. The training script loads and concatenates them automatically.

---

## Environment Variables

See `.env.example` for the full list. Required keys:

```
SECRET_KEY=          # JWT signing secret (generate with: openssl rand -hex 32)
ADMIN_USER=          # Dashboard login username
ADMIN_PASS_HASH=     # bcrypt hash of admin password
MODEL_PATH=          # Path to model.pkl
```

**Never commit `.env`.** It is gitignored by default.

---

## Security Design

- JWT authentication required on all API routes except `/api/auth/login`
- All inputs validated via Pydantic v2 before reaching the model
- No secrets in source code — loaded exclusively from environment variables
- Production FastAPI runs with `debug=False` — no stack traces exposed
- Security headers (`X-Content-Type-Options`, `X-Frame-Options`) on all responses
- CORS restricted to `localhost:3000` in development
- httpOnly cookie for JWT storage — not accessible via JavaScript

---

## Project Structure

```
sentinelai/
├── ml/
│   ├── train.py
│   ├── evaluate.py
│   ├── replay.py
│   ├── preprocess.py
│   └── data/raw/          # CICIDS CSVs (gitignored)
├── backend/
│   ├── main.py
│   ├── auth.py
│   ├── classify.py
│   ├── stream.py
│   ├── schemas.py
│   └── config.py
├── frontend/
│   ├── app/
│   └── components/
├── .env.example
├── .gitignore
├── CLAUDE.md
└── README.md
```

---

## Author

**Shyam** · B.Tech CSE (Data Science) · AITS Rajampet  
Cyber Defense & Security Analyst Intern · Blackbucks · 2026
