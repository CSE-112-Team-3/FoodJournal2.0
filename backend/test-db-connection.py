import os
from sqlalchemy import create_engine, inspect

# Load environment variables (if using .env file)
from dotenv import load_dotenv
load_dotenv()

# Connection details
DATABASE_URL = f'mysql+mysqlconnector://{os.getenv("DB_USERNAME")}:{os.getenv("DB_PASSWORD")}@{os.getenv("DB_HOST")}/{os.getenv("DB_NAME")}'

# Create the engine and test connection
engine = create_engine(DATABASE_URL)
print(engine)

try:
    with engine.connect() as connection:
        # Example query to test connection
        inspector = inspect(engine)
        tables = inspector.get_table_names()

        print("Connection successful!")
        print("Existing tables:", tables)

except Exception as e:
    print("Failed to connect to the database:", str(e))
