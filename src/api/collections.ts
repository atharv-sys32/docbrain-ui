import client from './client';
import type { Collection } from '../types';

export const createCollection = (name: string, description: string) =>
  client.post<Collection>('/collections', { name, description });

export const listCollections = () =>
  client.get<Collection[]>('/collections');

export const getCollection = (id: string) =>
  client.get<Collection>(`/collections/${id}`);

export const updateCollection = (id: string, name: string, description: string) =>
  client.put<Collection>(`/collections/${id}`, { name, description });

export const deleteCollection = (id: string) =>
  client.delete(`/collections/${id}`);
