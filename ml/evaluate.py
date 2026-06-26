import pandas as pd
import joblib
import json
from pathlib import Path
from sklearn.metrics import classification_report, confusion_matrix, f1_score
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import seaborn as sns

ml_dir = Path(__file__).resolve().parent
data_dir = ml_dir / 'data'
report_dir = ml_dir / 'evaluation_report'
report_dir.mkdir(parents=True, exist_ok=True)

print("Loading test data...")
X_test = pd.read_csv(data_dir / 'X_test.csv')
y_test = pd.read_csv(data_dir / 'y_test.csv').squeeze()

print("Loading model and label encoder...")
model = joblib.load(ml_dir / 'model.pkl')
le = joblib.load(ml_dir / 'label_encoder.pkl')

print("Running model predictions...")
y_pred = model.predict(X_test)

# Calculate Weighted F1
wf1 = f1_score(y_test, y_pred, average='weighted')
print(f"\n==================================================")
print(f"Weighted F1-Score: {wf1:.6f}")
print(f"==================================================\n")

# Print classification report
target_names = [str(c) for c in le.classes_]
print("Classification Report:")
report_str = classification_report(y_test, y_pred, target_names=target_names)
print(report_str)

# Save text report
with open(report_dir / 'classification_report.txt', 'w') as f:
    f.write(f"Weighted F1-Score: {wf1:.6f}\n\n")
    f.write("Classification Report:\n")
    f.write(report_str)

# Plot and save confusion matrix
print("Generating Confusion Matrix...")
cm = confusion_matrix(y_test, y_pred)
plt.figure(figsize=(14, 12))
sns.heatmap(
    cm, 
    annot=True, 
    fmt='d', 
    cmap='Blues', 
    xticklabels=target_names, 
    yticklabels=target_names
)
plt.title('SentinelAI — Confusion Matrix')
plt.xlabel('Predicted Label')
plt.ylabel('True Label')
plt.xticks(rotation=45, ha='right')
plt.yticks(rotation=0)
plt.tight_layout()

cm_path = report_dir / 'confusion_matrix.png'
plt.savefig(cm_path, dpi=150)
plt.close()
print(f"Confusion Matrix saved to {cm_path}")
