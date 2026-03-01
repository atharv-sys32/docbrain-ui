import client from './client';
import type { Document } from '../types';

export const uploadDocument = (collectionId: string, file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  return client.post(`/collections/${collectionId}/documents`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const listDocuments = (collectionId: string) =>
  client.get<Document[]>(`/collections/${collectionId}/documents`);

export const getDocument = (id: string) =>
  client.get<Document>(`/documents/${id}`);

export const getDocumentStatus = (id: string) =>
  client.get<{ id: string; status: string; totalChunks: number }>(`/documents/${id}/status`);

export const deleteDocument = (id: string) =>
  client.delete(`/documents/${id}`);
