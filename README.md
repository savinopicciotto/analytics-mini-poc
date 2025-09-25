# Analytics Mini-POC

**Book 15 min:** https://calendly.com/savinop/intro

**What it is**  
Tiny analytics proof that turns a REST API into 3 KPI moments fast.

- Data flow: REST → CSV; tables joined in SQL
- Stack: Python, SQL, Postman

## How to run
1. Python 3.11
2. `python -m venv .venv && source .venv/bin/activate`   (Windows: `.\venv\Scripts\activate`)
3. `pip install -r requirements.txt`
4. Set env values in `.env` (copy from `.env.example`)
5. `python scripts/pull_api.py`
6. Open `notebooks/explore.ipynb` or run `python app.py` if exposing an endpoint

## Artifacts
- README (this file)
- Minimal scripts to ingest/join data
- **90-sec Loom:** <PASTE LOOM URL>

## Proof moments (KPIs)
1. **Daily orders** - REST -> CSV ingest, group by day, show a 7 day trend.
2. **Refund rate** - join orders + refunds, compute % and flag outliers.
3. **Avg resolution time** - join tickets + events, compute mean hours to close.

## Acceptance tests
- **AT-1 Daily orders**  
  Run: pipeline on sample data  
  Expect: table `date, orders` with at least 7 rows; values match notebook.

- **AT-2 Refund rate**  
  Run: join `orders.csv` + `refunds.csv` on `order_id`  
  Expect: metric `refund_rate` between 0 and 1; joined row count shown.

- **AT-3 Avg resolution time**  
  Run: join `tickets.csv` + `ticket_events.csv` on `ticket_id`  
  Expect: metric `avg_resolution_hours` printed as a float.
