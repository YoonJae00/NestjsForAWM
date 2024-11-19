from langchain.tools import BaseTool
from datetime import datetime
from typing import Optional

class DateTimeTool(BaseTool):
    name: str = "datetime_tool"
    description: str = "현재 날짜와 시간을 알려주는 도구입니다. 입력값은 필요하지 않습니다."

    def _run(self, _: Optional[str] = None) -> str:
        now = datetime.now()
        return now.strftime("%Y년 %m월 %d일 %H시 %M분")

    async def _arun(self, query: str) -> str:
        return self._run(query)