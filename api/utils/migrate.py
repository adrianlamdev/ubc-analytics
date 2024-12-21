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
        cursor = conn.cursor()

        cursor.execute("SELECT id, subject_code FROM subjects;")
        subject_mapping = {row[1]: row[0] for row in cursor.fetchall()}

        # Prepare courses data
        logger.info("Processing courses data...")
        courses_data = []
        for _, row in df[["Subject", "Course", "Title"]].drop_duplicates().iterrows():
            if pd.notna(row["Subject"]) and pd.notna(row["Course"]):
                subject_id = subject_mapping.get(row["Subject"])
                if subject_id:
                    courses_data.append(
                        (
                            subject_id,
                            str(row["Course"]),
                            row["Title"] if pd.notna(row["Title"]) else None,
                        )
                    )

        # Insert courses data
        logger.info("Inserting courses data...")
        insert_courses = """
        INSERT INTO courses (subject_id, course_number, title)
        VALUES %s
        ON CONFLICT (subject_id, course_number) DO NOTHING;
        """
        execute_values(cursor, insert_courses, courses_data)

        # Commit the transaction
        conn.commit()
        logger.info("Data migration completed successfully")

    except Exception as e:
        logger.error(f"Migration failed: {e}", exc_info=True)
        if "conn" in locals():
            conn.rollback()
        raise
    finally:
        if "cursor" in locals():
            cursor.close()
        if "conn" in locals():
            connection_pool.putconn(conn)
        # Close the connection pool
        connection_pool.closeall()
        logger.info("Connection pool closed")


if __name__ == "__main__":
    csv_path = "data/ubcv_grades_processed_tableau_all.csv"
    migrate_to_neondb(csv_path)
