from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from app.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    full_name = Column(String, nullable=False)

    username = Column(String, unique=True, index=True, nullable=False)

    phone_number = Column(String, unique=True, index=True, nullable=False)

    password_hash = Column(String, nullable=False)

    role = Column(String, default="user")

    # relationships
    heart = relationship("Heart", back_populates="user", uselist=False, cascade="all, delete")

    progress_records = relationship(
        "Progress",
        back_populates="user",
        cascade="all, delete"
    )

    premium = relationship("Premium", back_populates="user", uselist=False, cascade="all, delete")

    subscriptions = relationship("Subscription", back_populates="user", cascade="all, delete")