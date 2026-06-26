#Download CICIDS dataset from kagglehub
import kagglehub
path = kagglehub.dataset_download("chethuhn/network-intrusion-dataset")

#Find all CSV files at that path and load them

import os, pandas as pd

csv_files = [f for f in os.listdir(path) if f.endswith('.csv')]
dataframes = []
for f in csv_files:
    df = pd.read_csv(os.path.join(path, f), low_memory=False)
    dataframes.append(df)

df = pd.concat(dataframes, ignore_index=True)
print(f"Total rows loaded: {len(df)}")
print(f"Columns: {df.columns.tolist()}")

#Clean column names

df.columns = df.columns.str.strip()

#Remove bad values

import numpy as np
df.replace([np.inf, -np.inf], np.nan, inplace=True)
df.dropna(inplace=True)
df.drop_duplicates(inplace=True)
print(f"Rows after cleaning: {len(df)}")

# Clean Label strings to replace corrupted/non-standard unicode characters (like \ufffd / em-dash) with a standard dash
df['Label'] = df['Label'].str.replace('\ufffd', '-', regex=False)

#Encode labels (The Label column has text like "BENIGN", "DoS Hulk". The model needs numbers.)

from pathlib import Path
ml_dir = Path(__file__).resolve().parent
data_dir = ml_dir / 'data'
data_dir.mkdir(parents=True, exist_ok=True)

from sklearn.preprocessing import LabelEncoder
le = LabelEncoder()
df['Label'] = le.fit_transform(df['Label'])

# Save the encoder — you'll need it later to decode numbers back to names
import joblib
joblib.dump(le, ml_dir / 'label_encoder.pkl')

# Save the label mapping so you can read it
import json
mapping = {int(i): str(label) for i, label in enumerate(le.classes_)}
with open(ml_dir / 'label_mapping.json', 'w') as f:
    json.dump(mapping, f, indent=2)
print("Labels:", mapping)


#Split into train and test

from sklearn.model_selection import train_test_split

X = df.drop('Label', axis=1)
y = df['Label']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)
print(f"Training rows: {len(X_train)}, Test rows: {len(X_test)}")

#Apply SMOTE to training data only. Downsample large classes first to prevent memory errors.

max_samples = 50000
train_df = pd.concat([X_train, y_train], axis=1)

downsampled_parts = []
for label in train_df['Label'].unique():
    class_subset = train_df[train_df['Label'] == label]
    if len(class_subset) > max_samples:
        class_subset = class_subset.sample(n=max_samples, random_state=42)
    downsampled_parts.append(class_subset)

train_df_downsampled = pd.concat(downsampled_parts, ignore_index=True)
X_train_down = train_df_downsampled.drop('Label', axis=1)
y_train_down = train_df_downsampled['Label']

from imblearn.over_sampling import SMOTE

# Ensure k_neighbors is safe for very small classes (though minimum class count is 11 in training, k=5 is safe)
smote = SMOTE(random_state=42, k_neighbors=5)
X_train_bal, y_train_bal = smote.fit_resample(X_train_down, y_train_down)
print(f"Training rows after downsampling and SMOTE: {len(X_train_bal)}")


#Save cleaned splits

X_train_bal.to_csv(data_dir / 'X_train.csv', index=False)
y_train_bal.to_csv(data_dir / 'y_train.csv', index=False)
X_test.to_csv(data_dir / 'X_test.csv', index=False)
y_test.to_csv(data_dir / 'y_test.csv', index=False)

# Save combined test set with labels for standard replay script mapping
test_combined = X_test.copy()
test_combined['Label'] = y_test.values
test_combined.to_csv(data_dir / 'test_set.csv', index=False)

print(f"Preprocessing complete. Combined test set saved to {data_dir / 'test_set.csv'}. All files saved to {data_dir}")


