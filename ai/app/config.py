from pydantic_settings import BaseSettings
from dotenv import load_dotenv
import os

# .env 파일 로드
load_dotenv()

class Settings(BaseSettings):
    OPENAI_API_KEY: str
    TAVILY_API_KEY: str
    MODEL_NAME: str = "gpt-4o"
    HOST: str = "0.0.0.0"
    PORT: int = 8000
    DEBUG: bool = True
    ALLOWED_ORIGINS: str = "http://localhost:3000,http://localhost:5173"
    
    # SMS 관련 설정 추가
    SMS_API_KEY: str
    SMS_API_SECRET: str
    SENDER_NUMBER: str

    class Config:
        env_file = ".env"

settings = Settings() 