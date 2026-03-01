import { useState } from 'react';
import { askQuestion } from '../api/chat';
import type { Message, SourceCitation } from '../types';

interface ChatMessage {
  id: string;
  role: 'USER' | 'ASSISTANT';
  content: string;
  sources?: SourceCitation[];
}

export function useChat(collectionId: string) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (question: string) => {
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'USER',
      content: question,
    };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const res = await askQuestion(collectionId, question, conversationId ?? undefined);
      const data = res.data;

      if (!conversationId) {
        setConversationId(data.conversationId);
      }

      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'ASSISTANT',
        content: data.answer,
        sources: data.sources,
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'ASSISTANT',
        content: err.response?.data?.message || 'An error occurred. Please try again.',
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const loadConversation = (msgs: Message[], convId: string) => {
    setConversationId(convId);
    setMessages(
      msgs.map((m) => ({
        id: m.id,
        role: m.role,
        content: m.content,
        sources: m.sources ? JSON.parse(m.sources) : undefined,
      }))
    );
  };

  const resetChat = () => {
    setMessages([]);
    setConversationId(null);
  };

  return { messages, sendMessage, loading, conversationId, loadConversation, resetChat };
}
