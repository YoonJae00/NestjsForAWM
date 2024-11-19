from pydantic import BaseModel
from typing import List, Optional, Dict, Any

class Message(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[Message]
    stream: Optional[bool] = False

class ChatResponse(BaseModel):
    answer: str
    thought_process: Optional[List[Dict[str, Any]]] = None 