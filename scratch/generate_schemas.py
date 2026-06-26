import pandas as pd
from pathlib import Path

# Paths
root_dir = Path(__file__).resolve().parents[1]
X_train_path = root_dir / 'ml' / 'data' / 'X_train.csv'
schemas_path = root_dir / 'backend' / 'schemas' / '..' / 'schemas.py'  # backend/schemas.py

# Read columns
df = pd.read_csv(X_train_path, nrows=1)
columns = df.columns.tolist()

# Helper to create safe python variable names
def make_safe_name(name):
    safe = name.replace(' ', '_').replace('/', '_').replace('.', '_').replace('-', '_')
    if safe[0].isdigit():
        safe = '_' + safe
    return safe.lower()

# Generate python file content
content = []
content.append("# backend/schemas.py")
content.append("from pydantic import BaseModel, Field")
content.append("import numpy as np")
content.append("")
content.append("class LoginRequest(BaseModel):")
content.append("    username: str")
content.append("    password: str")
content.append("")
content.append("class FlowSchema(BaseModel):")

# Track generated names to prevent duplicates
seen_names = set()
for col in columns:
    safe_name = make_safe_name(col)
    
    # Handle duplicates just in case
    orig_safe = safe_name
    counter = 1
    while safe_name in seen_names:
        safe_name = f"{orig_safe}_{counter}"
        counter += 1
    seen_names.add(safe_name)
    
    # Determine type and constraints
    col_lower = col.lower()
    if "port" in col_lower:
        field_type = "int"
        constraints = "ge=0, le=65535"
    elif "flag" in col_lower:
        field_type = "int"
        constraints = "ge=0"
    elif "packet" in col_lower or "count" in col_lower or "bytes" in col_lower:
        field_type = "float"  # float is safer for counts/bytes as they can be large or coerced
        constraints = "ge=0.0"
    else:
        field_type = "float"
        constraints = ""

    if constraints:
        content.append(f"    {safe_name}: {field_type} = Field(..., alias={repr(col)}, {constraints})")
    else:
        content.append(f"    {safe_name}: {field_type} = Field(..., alias={repr(col)})")

content.append("")
content.append("    def to_feature_array(self) -> np.ndarray:")
content.append("        return np.array([[")
for col in columns:
    safe_name = make_safe_name(col)
    content.append(f"            self.{safe_name},")
content.append("        ]], dtype=np.float64)")
content.append("")
content.append("    model_config = {")
content.append("        'extra': 'forbid',")
content.append("        'populate_by_name': True")
content.append("    }")

# Write to file
with open(schemas_path, 'w') as f:
    f.write('\n'.join(content) + '\n')

print("Schemas file generated successfully at backend/schemas.py")
