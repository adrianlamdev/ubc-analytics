import pandas as pd
from psycopg2 import pool
from psycopg2.extras import execute_values
from tqdm import tqdm
import os
from dotenv import load_dotenv
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def migrate_to_neondb(csv_path):
    """
    Migrate grades data from CSV to NeonDB using connection pooling.
    """
    # Load environment variables
    load_dotenv()

    # Get database URL
    connection_string = os.getenv("DATABASE_URL")
    if not connection_string:
        raise ValueError("DATABASE_URL environment variable not set")

    # Create connection pool
    connection_pool = pool.SimpleConnectionPool(
        1,  # minimum connections
        20,  # maximum connections
        connection_string,
    )

    logger.info("Connection pool created successfully")

    try:
        # Read CSV file
        logger.info("Reading CSV file...")
        df = pd.read_csv(csv_path)

        # Get a connection from the pool
        conn = connection_pool.getconn()

    except Exception as e:
        logger.error(f"Migration failed: {e}", exc_info=True)
        raise

    finally:
        # Close the connection pool
        connection_pool.closeall()
        logger.info("Connection pool closed")


if __name__ == "__main__":
    csv_path = "data/ubcv_grades_processed_tableau_all.csv"
    migrate_to_neondb(csv_path)
