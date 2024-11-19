import { atom } from 'jotai';
import axios from 'axios';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatResponse {
  answer: string;
  thought_process: string[];
}

export const chatMessagesAtom = atom<ChatMessage[]>([]);

export const sendMessageAtom = atom(
  (get) => get(chatMessagesAtom),
  async (get, set, message: string) => {
    const newUserMessage: ChatMessage = {
      role: 'user',
      content: message,
      timestamp: new Date()
    };
    
    set(chatMessagesAtom, [...get(chatMessagesAtom), newUserMessage]);

    try {
      const response = await axios.post<ChatResponse>('http://localhost:8000/api/chat', {
        messages: [{ role: 'user', content: message }],
        stream: false
      });

      const newAssistantMessage: ChatMessage = {
        role: 'assistant',
        content: response.data.answer,
        timestamp: new Date()
      };

      set(chatMessagesAtom, [...get(chatMessagesAtom), newAssistantMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: '죄송합니다. 요청을 처리하는 중 오류가 발생했습니다.',
        timestamp: new Date()
      };
      set(chatMessagesAtom, [...get(chatMessagesAtom), errorMessage]);
    }
  }
);