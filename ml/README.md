# SentinelAI — Machine Learning Pipeline

This directory contains the machine learning preprocessing, training, evaluation, and traffic simulation scripts built on the CICIDS 2017 benchmark dataset.

---

## Pipeline Overview

### 1. Data Preprocessing (`preprocess.py`)
* Cleans data irregularities, infs, NaNs, and corrects corrupt Unicode characters.
* Implements a balanced downsampling of majority classes (to 50,000 samples) and balances minority categories using SMOTE oversampling to eliminate class bias.
* Outputs the balanced train sets and split `X_test.csv` / `y_test.csv` files.

### 2. Model Training (`train.py`)
* Trains a multi-class classification model using XGBoost 2.1.
* Generates the serialized `model.pkl` classifier, `label_encoder.pkl`, and the mapped ranking indexes at `feature_importance.json`.

### 3. Metric Evaluation (`evaluate.py`)
* Conducts static evaluations on unseen test sets.
* Outputs precision, recall, and F1 classifications, alongside a confusion matrix plot at `evaluation_report/confusion_matrix.png`.

### 4. Standalone Simulator Replay (`replay.py`)
* Optional standalone script that mimics live packet flow by reading split test rows and POSTing them to the classification endpoints in a loop.

---

## Directory Context

```text
ml/
├── preprocess.py        # Cleans, downsamples, and balances the dataset
├── train.py             # Configures and trains the XGBoost ensemble classifier
├── evaluate.py          # Validates F1 performance and generates matrix graphics
├── replay.py            # Local command-line traffic stream simulation utility
├── data/
│   ├── raw/             # Directory for raw CICIDS 2017 CSV files (gitignored)
│   ├── X_test.csv       # Preprocessed test flow features (gitignored)
│   └── y_test.csv       # Split ground truth test label index (gitignored)
└── evaluation_report/
    └── confusion_matrix.png # Generated validation confusion matrix
```

---

## Local Pipeline Execution

```bash
# 1. Install ML dependencies inside virtual environment
pip install -r requirements.txt

# 2. Run data cleaning and balancing preprocessing
python preprocess.py

# 3. Train XGBoost classifier model
python train.py

# 4. Generate evaluation reports and confusion matrix plots
python evaluate.py
```
