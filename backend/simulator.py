# backend/simulator.py
import asyncio
import logging
import pandas as pd
from pathlib import Path

from backend.schemas import FlowSchema
from backend.classify import classify_flow

logger = logging.getLogger(__name__)

root_dir = Path(__file__).resolve().parents[1]
data_dir = root_dir / "ml" / "data"

class SimulatorManager:
    def __init__(self):
        self.df = None
        self.current_task = None
        self.current_index = 0
        self.is_running = False

    def load_data(self):
        if self.df is not None:
            return
        
        logger.warning("Loading simulator dataset...")
        X_test_path = data_dir / "X_test.csv"
        y_test_path = data_dir / "y_test.csv"
        
        if not X_test_path.exists() or not y_test_path.exists():
            raise FileNotFoundError(f"Test set files not found in {data_dir}")

        X_test = pd.read_csv(X_test_path)
        y_test = pd.read_csv(y_test_path)
        self.df = pd.concat([X_test, y_test], axis=1)
        logger.warning(f"Simulator dataset loaded: {len(self.df)} rows")

    async def run_loop(self):
        try:
            self.load_data()
        except Exception as e:
            logger.error(f"Failed to load simulator data: {e}")
            self.is_running = False
            return

        label_col = "Label"
        feature_cols = [c for c in self.df.columns if c != label_col]

        logger.warning("Starting simulation loop...")
        while self.is_running:
            if self.current_index >= len(self.df):
                self.current_index = 0  # Loop back to start

            row = self.df.iloc[self.current_index]
            payload = row[feature_cols].to_dict()
            
            try:
                # Construct FlowSchema using the CSV column headers as aliases
                flow = FlowSchema(**payload)
                # Call classify_flow to run XGBoost inference and broadcast via SSE alert queue
                await classify_flow(flow, user="system")
            except Exception as e:
                logger.error(f"Simulator flow inference failed at index {self.current_index}: {e}")

            self.current_index += 1
            await asyncio.sleep(1.0)

    def start(self):
        if self.is_running:
            return
        self.is_running = True
        self.current_task = asyncio.create_task(self.run_loop())
        logger.warning("Simulation loop started")

    def stop(self):
        if not self.is_running:
            return
        self.is_running = False
        if self.current_task:
            self.current_task.cancel()
            self.current_task = None
        logger.warning("Simulation loop stopped")

    def status(self) -> dict:
        return {
            "is_running": self.is_running,
            "current_index": self.current_index,
            "total_rows": len(self.df) if self.df is not None else 0
        }

# Global simulator manager instance
simulator = SimulatorManager()
