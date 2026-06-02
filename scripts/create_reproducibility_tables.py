"""Create simple reproducibility manifest tables for the repository."""
from pathlib import Path
import hashlib
import pandas as pd

root = Path.cwd()
rows = []
for path in root.rglob('*'):
    if path.is_file() and '.git' not in path.parts:
        try:
            h = hashlib.sha256(path.read_bytes()).hexdigest()
        except Exception:
            h = None
        rows.append({
            'relative_path': str(path.relative_to(root)),
            'size_mb': round(path.stat().st_size / (1024 * 1024), 4),
            'sha256': h,
        })

df = pd.DataFrame(rows).sort_values('relative_path')
out_dir = root / 'outputs' / 'tables'
out_dir.mkdir(parents=True, exist_ok=True)
df.to_csv(out_dir / 'repository_file_manifest.csv', index=False)
print('Saved:', out_dir / 'repository_file_manifest.csv')
