from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from app.db.base import Base


class Document(Base):
    __tablename__ = "documents"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    filename = Column(
        String,
        nullable=False
    )

    filepath = Column(
        String,
        nullable=False
    )

    workspace_id = Column(
        Integer,
        ForeignKey("workspaces.id")
    )

    workspace = relationship(
        "Workspace",
        back_populates="documents"
    )