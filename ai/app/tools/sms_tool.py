from langchain.tools import BaseTool
from typing import Optional, Dict
from sdk.api.message import Message
from sdk.exceptions import CoolsmsException
import os
from dotenv import load_dotenv
import json
import re
import unicodedata

load_dotenv()

class SMSTool(BaseTool):
    name: str = "sms_tool"
    description: str = "SMS를 전송하는 도구입니다. JSON 형식으로 'phone_number'와 'message'를 포함해야 합니다. 예: {'phone_number': '01012345678', 'message': '안녕하세요'}"

    def _run(self, request_str: str) -> str:
        try:
            # JSON 문자열을 파싱
            request = json.loads(request_str)
            
            # 메시지 전처리
            message = request.get("message", "")
            message = re.sub(r'[^\uAC00-\uD7A3\u0000-\u007F]', '', message)
            message = unicodedata.normalize('NFC', message)

            print(request.get("phone_number"))
            
            # SMS 파라미터 설정
            params = {
                "type": "SMS",
                "to": request.get("phone_number"),
                "from": os.getenv("SENDER_NUMBER"),
                "text": message,
                "charset": "utf8"
            }

            cool = Message(
                os.getenv("SMS_API_KEY"),
                os.getenv("SMS_API_SECRET")
            )

            response = cool.send(params)
            
            if response["success_count"] > 0:
                return f"SMS 전송 성공: {message}"
            else:
                return "SMS 전송 실패"

        except json.JSONDecodeError:
            return "잘못된 JSON 형식입니다."
        except CoolsmsException as e:
            return f"SMS 전송 오류: {e.msg}"
        except Exception as e:
            return f"오류 발생: {str(e)}"

    async def _arun(self, request_str: str) -> str:
        return self._run(request_str)