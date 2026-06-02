from pathlib import Path

REQUIRED_DIRS = [
    'data/raw', 'data/interim', 'data/processed', 'data/external',
    'notebooks', 'scripts', 'docs', 'outputs/figures', 'outputs/tables',
    'outputs/maps', 'outputs/models', 'qgis', 'config'
]

REQUIRED_FILES = [
    'README.md', 'requirements.txt', 'environment.yml', 'CITATION.cff',
    'config/config_template.yaml'
]

root = Path.cwd()
missing = []
for d in REQUIRED_DIRS:
    if not (root / d).exists():
        missing.append(d)
for f in REQUIRED_FILES:
    if not (root / f).exists():
        missing.append(f)

if missing:
    print('Missing items:')
    for item in missing:
        print(' -', item)
    raise SystemExit(1)
else:
    print('Repository structure looks complete.')
