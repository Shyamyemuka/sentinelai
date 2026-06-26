import pandas as pd
import joblib
from xgboost import XGBClassifier
from pathlib import Path

ml_dir = Path(__file__).resolve().parent
data_dir = ml_dir / 'data'

# Load preprocessed data
X_train = pd.read_csv(data_dir / 'X_train.csv')
y_train = pd.read_csv(data_dir / 'y_train.csv').squeeze()

# Train model
model = XGBClassifier(
    n_estimators=200,
    max_depth=6,
    learning_rate=0.1,
    subsample=0.8,
    colsample_bytree=0.8,
    eval_metric='mlogloss',
    n_jobs=-1,
    random_state=42
)

print("Training started...")
model.fit(X_train, y_train)
print("Training complete.")

# Save model
joblib.dump(model, ml_dir / 'model.pkl')
print(f"Model saved to {ml_dir / 'model.pkl'}")

# Save feature importance
import json
import numpy as np
feature_names = X_train.columns.tolist()
importances = model.feature_importances_.tolist()
fi = [{"feature": f, "importance": round(float(i), 6)} 
      for f, i in sorted(zip(feature_names, importances), key=lambda x: -x[1])]
with open(ml_dir / 'feature_importance.json', 'w') as f:
    json.dump(fi, f, indent=2)
print("Feature importance saved.")
