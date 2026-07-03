from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel

from app.db.session import get_db
from app.models.workspace import Workspace
from app.models.document import Document
from app.models.user import User

from app.auth.dependencies import get_current_user

from app.ai.pdf_reader import extract_text_from_pdf
from app.ai.gemini import ask_gemini

router = APIRouter(
    prefix="/chat",
    tags=["AI Chat"]
)


class ChatRequest(BaseModel):
    question: str


@router.post("/{workspace_id}")
def chat(
    workspace_id: int,
    request: ChatRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    workspace = (
        db.query(Workspace)
        .filter(
            Workspace.id == workspace_id,
            Workspace.user_id == current_user.id
        )
        .first()
    )

    if not workspace:
        raise HTTPException(
            status_code=404,
            detail="Workspace not found"
        )

    documents = (
        db.query(Document)
        .filter(Document.workspace_id == workspace_id)
        .all()
    )

    if len(documents) == 0:
        raise HTTPException(
            status_code=404,
            detail="No documents uploaded."
        )

    context = ""

    for doc in documents:
        context += extract_text_from_pdf(doc.filepath)
        context += "\n\n"

    prompt = f"""
You are an AI assistant.

Use ONLY the following document to answer.

Document:
{context}

Question:
{request.question}
"""

    answer = ask_gemini(prompt)

    return {
        "answer": answer
    }