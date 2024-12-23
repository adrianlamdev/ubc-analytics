from sqlalchemy.orm import sessionmaker
from contextlib import contextmanager
from models import Base
from sqlalchemy import create_engine
import os
from sqlalchemy.pool import QueuePool
from dotenv import load_dotenv

SessionLocal = None


def init_db(engine):
    global SessionLocal
    Base.metadata.create_all(bind=engine)
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


@contextmanager
def get_db():
    """Get database session"""
    if SessionLocal is None:
        raise RuntimeError("Database not initialized. Call init_db first.")

    db = SessionLocal()
    try:
        yield db
        db.commit()
    except Exception as e:
        db.rollback()
        raise
    finally:
        db.close()


def create_db_engine():
    load_dotenv()
    connection_string = os.getenv("DATABASE_URL")
    if not connection_string:
        raise ValueError("DATABASE_URL environment variable not set")

    engine = create_engine(
        connection_string,
        poolclass=QueuePool,
        pool_size=20,
        pool_pre_ping=True,
        pool_timeout=30,
        max_overflow=10,
    )

    return engine
