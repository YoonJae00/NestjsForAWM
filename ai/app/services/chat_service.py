from langchain import hub
from langchain.agents import AgentExecutor, create_react_agent
from langchain_community.tools.tavily_search import TavilySearchResults
from langchain_openai import ChatOpenAI
from typing import List, Dict, Any
from app.config import settings
from app.models.chat_model import Message
from app.utils.custom_prompt import REACT_PROMPT
from langchain.prompts import PromptTemplate
from langchain.memory import ConversationSummaryBufferMemory
from app.tools.datetime_tool import DateTimeTool
from app.tools.sms_tool import SMSTool

class ChatService:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance._initialized = False
        return cls._instance

    def __init__(self):
        if self._initialized:
            return
            
        self.llm = ChatOpenAI(
            temperature=0,
            model=settings.MODEL_NAME,
            streaming=True
        )
        
        self.memory = ConversationSummaryBufferMemory(
            llm=self.llm,
            memory_key="chat_history",
            max_token_limit=2000,
            return_messages=True,
            summarize_step=3
        )
        
        self.tools = self._initialize_tools()
        self.prompt = PromptTemplate.from_template(REACT_PROMPT)
        self.agent = create_react_agent(self.llm, self.tools, self.prompt)
        self.agent_executor = AgentExecutor(
            agent=self.agent,
            tools=self.tools,
            memory=self.memory,
            verbose=True,
            handle_parsing_errors=True
        )
        self._initialized = True

    def _initialize_tools(self):
        return [
            TavilySearchResults(max_results=1),
            DateTimeTool(),
            SMSTool()
        ]

    async def process_message(self, messages: List[Message]) -> Dict[str, Any]:
        try:
            # 현재 메모리 상태 출력
            current_memory = self.memory.load_memory_variables({})
            print("현재 메모리 상태:", current_memory)
            
            response = await self.agent_executor.ainvoke({
                "input": messages[-1].content
            })
            
            # 응답 후 메모리 상태 출력
            updated_memory = self.memory.load_memory_variables({})
            print("업데이트된 메모리 상태:", updated_memory)

            return {
                "answer": response["output"],
                "thought_process": response.get("intermediate_steps", [])
            }
        except Exception as e:
            return {
                "answer": f"오류가 발생했습니다: {str(e)}",
                "thought_process": None
            } 