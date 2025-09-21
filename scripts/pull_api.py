import os, requests, pandas as pd
from dotenv import load_dotenv

load_dotenv()
BASE = os.getenv("API_BASE_URL")
KEY = os.getenv("API_KEY")

def run():
    if not BASE or not KEY:
        raise SystemExit("Please set API_BASE_URL and API_KEY in .env")
    # Example endpoint - replace with real ones
    r = requests.get(f"{BASE}/items", headers={"Authorization": f"Bearer {KEY}"})
    r.raise_for_status()
    df = pd.DataFrame(r.json())
    df.to_csv("data/items.csv", index=False)
    print("Wrote data/items.csv")

if __name__ == "__main__":
    run()