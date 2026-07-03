from pydantic import BaseModel


class WorkspaceCreate(BaseModel):
    title: str
    description: str


class WorkspaceResponse(BaseModel):
    id: int
    title: str
    description: str

    class Config:
        from_attributes = True