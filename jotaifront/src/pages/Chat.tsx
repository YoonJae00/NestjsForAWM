import React, { useState, useRef, useEffect } from 'react';
import { useAtom } from 'jotai';
import { chatMessagesAtom, sendMessageAtom } from '../atoms/chatAtom';
import '../styles/Chat.css';

const Chat = () => {
  const [input, setInput] = useState('');
  const [messages] = useAtom(chatMessagesAtom);
  const [, sendMessage] = useAtom(sendMessageAtom);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentTask, setCurrentTask] = useState<string>('');

  const tasks = [
    '데이터 수집 중...',
    '정보 분석 중...',
    '결과 검증 중...',
    '응답 생성 중...'
  ];

  useEffect(() => {
    let taskIndex = 0;
    if (isProcessing) {
      const interval = setInterval(() => {
        setCurrentTask(tasks[taskIndex]);
        taskIndex = (taskIndex + 1) % tasks.length;
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isProcessing]);

  useEffect(() => {
    // 별 생성
    const container = document.querySelector('.space-background');
    for (let i = 0; i < 100; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.width = `${Math.random() * 3}px`;
      star.style.height = star.style.width;
      container?.appendChild(star);
    }

    // 우주인 생성
    for (let i = 0; i < 3; i++) {
      const astronaut = document.createElement('div');
      astronaut.className = 'astronaut';
      astronaut.style.animationDelay = `${i * 3}s`;
      astronaut.innerHTML = '<img src="/astronaut.png" alt="우주인" />';
      container?.appendChild(astronaut);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;
    
    const button = e.currentTarget.querySelector('button');
    button?.classList.add('sending');
    
    setIsProcessing(true);
    await sendMessage(input);
    setIsProcessing(false);
    
    button?.classList.remove('sending');
    setInput('');
  };

  const getTaskTags = (content: string) => {
    // 실제 작업 내용에 따라 태그 동적 생성
    const tags = [];
    if (content.includes('수집')) tags.push('데이터 수집');
    if (content.includes('분석')) tags.push('분석');
    if (content.includes('실행')) tags.push('실행');
    return tags;
  };

  return (
    <div className="auto-gpt-container">
      <div className="space-background"></div>
      <div className="chat-workspace">
        <div className="task-status-bar">
          <div className="task-status">
            <div className={`status-indicator ${isProcessing ? 'active' : ''}`}>
              <div className="pulse-ring"></div>
              <i className="bi bi-cpu"></i>
            </div>
            <div className="status-text">
              {isProcessing ? currentTask : ''}
            </div>
          </div>
          <div className="task-progress">
            {isProcessing && (
              <div className="progress-bar">
                <div className="progress-fill"></div>
              </div>
            )}
          </div>
        </div>

        <div className="messages-area">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.role}`}>
              {msg.role === 'assistant' && (
                <div className="ai-indicator">
                  <i className="bi bi-robot"></i>
                  <div className="ai-badge">AutoGPT</div>
                </div>
              )}
              <div className="message-content">
                <div className="message-text">{msg.content}</div>
                {msg.role === 'assistant' && (
                  <div className="task-tags">
                    {getTaskTags(msg.content).map((tag, i) => (
                      <span key={i} className="tag">{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="command-input">
          <div className="input-wrapper">
            <i className="bi bi-terminal"></i>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="명령어를 입력하세요 (예: '비트코인 가격 조회 후 010-XXXX-XXXX로 전송')"
              disabled={isProcessing}
            />
          </div>
          <button type="submit" disabled={isProcessing}>
            <i className="bi bi-play-fill"></i>
            실행
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;