from sqlalchemy import Column, Integer, Float, DateTime, String
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime, UTC

Base = declarative_base()


class RequestLog(Base):
    """Request log model"""

    __tablename__ = "request_logs"

    id = Column(Integer, primary_key=True)
    timestamp = Column(DateTime, default=lambda: datetime.now(UTC))
    endpoint = Column(String)
    response_time = Column(Float)
    memory_usage = Column(Float)
    status_code = Column(Integer)
    error = Column(String, nullable=True)
    prediction = Column(Float, nullable=True)
    subject = Column(String, nullable=True)
    course = Column(Integer, nullable=True)
