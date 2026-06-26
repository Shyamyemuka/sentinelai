# backend/config.py
from dotenv import load_dotenv
import os
from pathlib import Path

# Load environment variables
load_dotenv()

def _require(key: str) -> str:
    value = os.getenv(key)
    if not value:
        raise RuntimeError(f"Required environment variable '{key}' is not set. Check your .env file.")
    return value

# JWT configuration
SECRET_KEY = _require("SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_HOURS = 8

# Admin credentials
ADMIN_USER = _require("ADMIN_USER")
ADMIN_PASS_HASH = _require("ADMIN_PASS_HASH")

# Model configurations
MODEL_PATH = _require("MODEL_PATH")
LABEL_ENCODER_PATH = _require("LABEL_ENCODER_PATH")
FEATURE_IMPORTANCE_PATH = os.getenv("FEATURE_IMPORTANCE_PATH", "ml/feature_importance.json")
