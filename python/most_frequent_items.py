"""
Simple CLI to query most frequent items and save a bar chart.
Reads DATABASE_URL from environment.
"""
import os
import psycopg2
import pandas as pd
import matplotlib.pyplot as plt

DATABASE_URL = os.environ.get('DATABASE_URL', 'postgres://postgres:postgres@localhost:5432/grocary')

def main():
    conn = psycopg2.connect(DATABASE_URL)
    sql = "SELECT name, COUNT(*) as cnt FROM items GROUP BY name ORDER BY cnt DESC LIMIT 5;"
    df = pd.read_sql(sql, conn)
    if df.empty:
        print("No items found.")
        return
    plt.figure(figsize=(8,5))
    plt.bar(df['name'], df['cnt'], color='green')
    plt.title('Top 5 most frequent grocery items')
    plt.xlabel('Item')
    plt.ylabel('Count')
    plt.tight_layout()
    out = 'top5_items.png'
    plt.savefig(out)
    print(f"Saved chart to {out}")
    conn.close()

if __name__ == '__main__':
    main()
