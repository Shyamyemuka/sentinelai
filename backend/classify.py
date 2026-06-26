# backend/classify.py
import uuid
from datetime import datetime, timezone
import json
from pathlib import Path
from fastapi import Depends, HTTPException
import joblib
import numpy as np
import logging

from backend.schemas import FlowSchema
from backend.auth import get_current_user
from backend.config import MODEL_PATH, LABEL_ENCODER_PATH, FEATURE_IMPORTANCE_PATH
from backend.stream import alert_queue

logger = logging.getLogger(__name__)

# Resolve absolute paths based on workspace root
root_dir = Path(__file__).resolve().parents[1]

# Load model, label encoder, and feature importance rank ONCE at startup
try:
    model = joblib.load(root_dir / MODEL_PATH)
    label_encoder = joblib.load(root_dir / LABEL_ENCODER_PATH)
    with open(root_dir / FEATURE_IMPORTANCE_PATH) as f:
        feature_importance = json.load(f)
    logger.warning("Model and assets loaded successfully")
except Exception as e:
    raise RuntimeError(f"Failed to load model artifacts: {e}")

def _severity(attack_type: str, confidence: float) -> str | None:
    """Helper to score alert severity based on confidence thresholds."""
    if attack_type == "BENIGN":
        return None
    if confidence >= 0.90:
        return "High"
    if confidence >= 0.70:
        return "Medium"
    return "Low"

async def classify_flow(flow: FlowSchema, user: str = Depends(get_current_user)) -> dict:
    """Classifies a network flow, scores its severity, and registers the alert event."""
    try:
        features = flow.to_feature_array()
        proba = model.predict_proba(features)[0]
        class_idx = int(np.argmax(proba))
        confidence = float(proba[class_idx])
        attack_type = label_encoder.inverse_transform([class_idx])[0]
    except Exception as e:
        logger.warning(f"Inference failed: {e}")
        raise HTTPException(
            status_code=500,
            detail={"error": "Classification failed", "code": "INFERENCE_ERROR"}
        )

    # Construct the alert object
    alert = {
        "id": str(uuid.uuid4()),
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "attack_type": attack_type,
        "confidence": round(confidence, 4),
        "severity": _severity(attack_type, confidence),
        "top_features": feature_importance[:5],  # Surfacing top-5 feature importances
    }

    # Drop alert into the live streaming queue
    await alert_queue.put(alert)
    return alert
