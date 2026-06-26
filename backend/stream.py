# backend/stream.py
import asyncio
import json
from fastapi import Depends
from fastapi.responses import StreamingResponse
from backend.auth import get_current_user

# Global async queue for active alerts
alert_queue: asyncio.Queue = asyncio.Queue()

async def event_generator():
    """Continuously fetches alerts from the queue and yields SSE formatted text data."""
    while True:
        alert = await alert_queue.get()
        yield f"data: {json.dumps(alert)}\n\n"

async def stream_alerts(user: str = Depends(get_current_user)):
    """SSE route handler to stream real-time classification alerts to authenticated clients."""
    return StreamingResponse(event_generator(), media_type="text/event-stream")
