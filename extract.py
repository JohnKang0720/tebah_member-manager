import pandas as pd
from sqlalchemy import create_engine

db = create_engine("postgresql://default:LgnO1f8UPHDI@ep-crimson-paper-a45txdup-pooler.us-east-1.aws.neon.tech/verceldb?sslmode=require")

try:
    df = pd.read_sql("SELECT * FROM mytable", db)
    # Save the DataFrame to an Excel file
    df.to_excel("tebah_data.xlsx", index=False)
    print("Data successfully saved to 'tebah_data.xlsx'")
except Exception as e:
    print("An error occurred:", e)
finally:
    db.dispose()
    