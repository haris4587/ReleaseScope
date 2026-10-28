"""Independently recompute report hash links from an exported JSON report."""
import hashlib
import json
from pathlib import Path
history=json.loads(Path('docs/live-report.json').read_text())
previous=''
for revision, entry in enumerate(history,1):
    assert entry['revision']==revision
    assert entry['previous_hash']==previous
    claimed=entry.pop('report_hash')
    canonical=json.dumps(entry,sort_keys=True,separators=(',',':'))
    assert hashlib.sha256(canonical.encode()).hexdigest()==claimed
    previous=claimed
print(f'Verified {len(history)} report hashes and append-only links.')
