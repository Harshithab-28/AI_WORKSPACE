from pathlib import Path
import shutil
import os

from fastapi import (
    APIRouter,
    Depends,
    UploadFile,
    File,
    HTTPException
)
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.document import Document
from app.models.workspace import Workspace
from app.models.user import User
from app.schemas.document import DocumentResponse
from app.auth.dependencies import get_current_user

router = APIRouter(
    prefix="/documents",
    tags=["Documents"]
)

UPLOAD_DIR = "uploads"

Path(UPLOAD_DIR).mkdir(exist_ok=True)


# -----------------------------
# Upload Document
# -----------------------------
@router.post("/{workspace_id}", response_model=DocumentResponse)
def upload_document(
    workspace_id: int,
    file: UploadFile = File(...),
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

    file_path = f"{UPLOAD_DIR}/{file.filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    document = Document(
        filename=file.filename,
        filepath=file_path,
        workspace_id=workspace.id
    )

    db.add(document)
    db.commit()
    db.refresh(document)

    return document


# -----------------------------
# Get All Documents
# -----------------------------
@router.get("/{workspace_id}", response_model=list[DocumentResponse])
def get_documents(
    workspace_id: int,
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

    return documents


# -----------------------------
# Delete Document
# -----------------------------
@router.delete("/{document_id}/delete")
def delete_document(
    document_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    document = (
        db.query(Document)
        .join(Workspace)
        .filter(
            Document.id == document_id,
            Workspace.user_id == current_user.id
        )
        .first()
    )

    if not document:
        raise HTTPException(
            status_code=404,
            detail="Document not found"
        )

    if os.path.exists(document.filepath):
        os.remove(document.filepath)

    db.delete(document)
    db.commit()

    return {
        "message": "Document deleted successfully"
    }