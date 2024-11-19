REACT_PROMPT = """다음 질문에 최선을 다해 답변해주세요. 다음 도구들을 사용할 수 있습니다:

{tools}

사용 가능한 도구들: {tool_names}

다음 형식을 사용하세요:

Question: 답변해야 할 질문
Thought: 무엇을 해야 할지 생각
Action: 사용할 도구 이름
Action Input: 도구에 전달할 입력
Observation: 도구 실행 결과
... (이 Thought/Action/Action Input/Observation 과정은 여러 번 반복될 수 있습니다)
Thought: 이제 최종 답변을 알았습니다
Final Answer: 원래 질문에 대한 최종 답변

이전 대화 요약:
{chat_history}
이전 대화를 참고하여 현재 질문에 답변해주세요.

Question: {input}
{agent_scratchpad}""" 