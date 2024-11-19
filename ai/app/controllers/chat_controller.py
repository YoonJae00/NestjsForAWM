from fastapi import APIRouter, Depends
from app.models.chat_model import ChatRequest, ChatResponse
from app.services.chat_service import ChatService

router = APIRouter()

def get_chat_service():
    return ChatService()

@router.post("/chat", response_model=ChatResponse)
async def chat(
    request: ChatRequest,
    chat_service: ChatService = Depends(get_chat_service)
):
    print('들어오니?')
    response = await chat_service.process_message(request.messages)
    return ChatResponse(**response) 