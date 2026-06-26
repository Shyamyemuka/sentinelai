# backend/stream.py
import asyncio
import json
import logging
from fastapi import Depends
from fastapi.responses import StreamingResponse
from backend.auth import get_current_user

logger = logging.getLogger(__name__)

# Keep a set of active connections (each connection has its own asyncio.Queue)
active_connections: set[asyncio.Queue] = set()

# Broadcast helper to send alerts to all active clients
async def broadcast_alert(alert: dict):
    if not active_connections:
        return
    for queue in list(active_connections):
        await queue.put(alert)

# Proxy queue class to maintain backwards compatibility with classify.py imports
class BroadcastQueue:
    async def put(self, alert: dict):
        await broadcast_alert(alert)

alert_queue = BroadcastQueue()

async def stream_alerts(user: str = Depends(get_current_user)):
    """SSE route handler to stream real-time classification alerts to authenticated clients."""
    queue = asyncio.Queue()
    active_connections.add(queue)

    async def event_generator():
        # Send initial comment to immediately establish connection and flush headers
        yield ": ok\n\n"
        try:
            while True:
                alert = await queue.get()
                yield f"data: {json.dumps(alert)}\n\n"
        except asyncio.CancelledError:
            pass
        finally:
            active_connections.discard(queue)

    return StreamingResponse(event_generator(), media_type="text/event-stream")

