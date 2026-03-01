import { useEffect, useState } from 'react';
import { listDocuments } from '../../api/documents';
import { listConversations, deleteConversation } from '../../api/chat';
import type { Document, Conversation } from '../../types';
import ProcessingStatus from '../documents/ProcessingStatus';
import { MessageSquare, Plus, Trash2 } from 'lucide-react';

interface SidebarProps {
  collectionId: string;
  onConversationSelect: (conversationId: string) => void;
  onNewChat: () => void;
  refreshTrigger?: number;
}

export default function Sidebar({ collectionId, onConversationSelect, onNewChat, refreshTrigger }: SidebarProps) {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);

  const fetchData = () => {
    listDocuments(collectionId).then((res) => setDocuments(res.data));
    listConversations(collectionId).then((res) => setConversations(res.data));
  };

  useEffect(() => {
    fetchData();
  }, [collectionId, refreshTrigger]);

  // Poll for processing documents
  useEffect(() => {
    const hasProcessing = documents.some((d) => d.status === 'PROCESSING');
    if (!hasProcessing) return;

    const interval = setInterval(() => {
      listDocuments(collectionId).then((res) => setDocuments(res.data));
    }, 2000);

    return () => clearInterval(interval);
  }, [documents, collectionId]);

  const handleDeleteConversation = async (e: React.MouseEvent, convId: string) => {
    e.stopPropagation();
    await deleteConversation(convId);
    fetchData();
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-full overflow-y-auto">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Documents</h3>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="p-2">
          {documents.length === 0 ? (
            <p className="text-sm text-gray-400 p-2">No documents yet</p>
          ) : (
            documents.map((doc) => (
              <div key={doc.id} className="flex items-center gap-2 p-2 text-sm rounded hover:bg-gray-50">
                <ProcessingStatus status={doc.status} />
                <span className="truncate flex-1" title={doc.fileName}>{doc.fileName}</span>
              </div>
            ))
          )}
        </div>

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Chats</h3>
            <button
              onClick={onNewChat}
              className="p-1 text-blue-600 hover:bg-blue-50 rounded bg-transparent border-none cursor-pointer"
              title="New Chat"
            >
              <Plus size={16} />
            </button>
          </div>
          {conversations.length === 0 ? (
            <p className="text-sm text-gray-400">No conversations yet</p>
          ) : (
            conversations.map((conv) => (
              <div
                key={conv.id}
                onClick={() => onConversationSelect(conv.id)}
                className="flex items-center gap-2 p-2 text-sm rounded hover:bg-gray-50 cursor-pointer group"
              >
                <MessageSquare size={14} className="text-gray-400" />
                <span className="truncate flex-1">{conv.title}</span>
                <button
                  onClick={(e) => handleDeleteConversation(e, conv.id)}
                  className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-500 bg-transparent border-none cursor-pointer"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
