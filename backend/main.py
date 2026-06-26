# backend/main.py
import logging
from fastapi import FastAPI, Request, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from backend.schemas import LoginRequest, FlowSchema
from backend.auth import verify_password, create_access_token, get_current_user
from backend.config import ADMIN_USER, ADMIN_PASS_HASH
from backend.classify import classify_flow
from backend.stream import stream_alerts

# Configure logging at WARNING level in production to avoid logging sensitive request details
logging.basicConfig(
    level=logging.WARNING,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)
logger = logging.getLogger(__name__)

# Initialize production-hardened FastAPI app with docs disabled
app = FastAPI(
    title="SentinelAI",
    debug=False,
    docs_url=None,
    redoc_url=None,
    openapi_url=None
)

# CORS middleware locked down to local frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["Authorization", "Content-Type"],
)

# Security headers middleware
@app.middleware("http")
async def add_security_headers(request: Request, call_next):
    response = await call_next(request)
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["X-XSS-Protection"] = "1; mode=block"
    response.headers["Referrer-Policy"] = "no-referrer"
    response.headers["Cache-Control"] = "no-store"
    return response

# Global unhandled exception handler to prevent internal trace leakage
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error("Unhandled exception: %s", str(exc), exc_info=True)
    return JSONResponse(
        status_code=500,
        content={"error": "An internal error occurred", "code": "INTERNAL_ERROR"}
    )

# --- Routes ---

@app.post("/api/auth/login")
async def login(credentials: LoginRequest):
    """Exposes POST /api/auth/login to authenticate administrative users and return JWT access tokens."""
    if credentials.username != ADMIN_USER or not verify_password(credentials.password, ADMIN_PASS_HASH):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={"error": "Invalid username or password", "code": "INVALID_CREDENTIALS"}
        )
    
    access_token = create_access_token(data={"sub": credentials.username})
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/api/classify")
async def classify(flow: FlowSchema, user: str = Depends(get_current_user)):
    """Exposes POST /api/classify to authenticate and classify incoming flow details."""
    return await classify_flow(flow, user)

@app.get("/api/stream")
async def stream(user: str = Depends(get_current_user)):
    """Exposes GET /api/stream to establish an SSE stream for incoming alert feeds."""
    return await stream_alerts(user)
