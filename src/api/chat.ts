import client from './client';
import type { QAResponse, Conversation, Message } from '../types';

export const askQuestion = (collectionId: string, question: string, conversationId?: string) =>
  client.post<QAResponse>(`/collections/${collectionId}/ask`, {
    question,
    conversationId,
  });

export const createConversation = (collectionId: string, title?: string) =>
  client.post<Conversation>(`/collections/${collectionId}/conversations`, { title });

export const listConversations = (collectionId: string) =>
  client.get<Conversation[]>(`/collections/${collectionId}/conversations`);

export const getMessages = (conversationId: string) =>
  client.get<Message[]>(`/conversations/${conversationId}/messages`);

export const deleteConversation = (conversationId: string) =>
  client.delete(`/conversations/${conversationId}`);
