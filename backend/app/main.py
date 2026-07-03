from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.workspace import router as workspace_router
from app.db.database import engine
from app.db.base import Base
from app.api.documents import router as document_router
import app.models
from app.api.chat import router as chat_router
from app.api.auth import router as auth_router

Base.metadata.create_all(bind=engine)

app = FastAPI(title="AI Workspace")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(document_router)
app.include_router(auth_router)
app.include_router(workspace_router)
app.include_router(chat_router)
@app.get("/")
def root():
    return {
        "message": "AI Workspace Backend Running"
    }