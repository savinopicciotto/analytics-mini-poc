# Analytics Mini-POC

Goal: surface 3 KPI proof moments from a REST API.

- Data: API -> CSV; tables joined in SQL
- Stack: Python, SQL, Postman

## Proof moments
- Leading-indicator trend
- Stuck cohort
- Fast-win suggestion

## How to run
1. Python 3.11
2. `python -m venv .venv && source .venv/bin/activate`
3. `pip install -r requirements.txt`
4. Set env values in `.env` (copy from `.env.example`)
5. `python scripts/pull_api.py`
6. Open `notebooks/explore.ipynb` or run `python app.py` if exposing an endpoint

## Artifacts
- README (this file)
- Repo with minimal scripts
- 90-sec Loom: https://example-loom-link

## Book a 15-min intro[https://calendly.com/savinop/intro]
https://calendly.com/savinop/intro
