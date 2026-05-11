import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCollection, deleteCollection } from '../api/collections';
import { getMessages } from '../api/chat';
import type { Collection } from '../types';
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';
import FileUploader from '../components/documents/FileUploader';
import ChatWindow from '../components/chat/ChatWindow';
import { useChat } from '../hooks/useChat';
import { ArrowLeft, Upload, Trash2 } from 'lucide-react';

export default function CollectionPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [collection, setCollection] = useState<Collection | null>(null);
  const [showUpload, setShowUpload] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const { messages, sendMessage, loading, loadConversation, resetChat } = useChat(id!);

  useEffect(() => {
    if (id) {
      getCollection(id).then((res) => setCollection(res.data));
    }
  }, [id]);

  const handleConversationSelect = async (conversationId: string) => {
    const res = await getMessages(conversationId);
    loadConversation(res.data, conversationId);
  };

  const handleNewChat = () => {
    resetChat();
  };

  const handleUploadComplete = () => {
    setShowUpload(false);
    setRefreshTrigger((prev) => prev + 1);
  };

  const handleDeleteCollection = async () => {
    if (window.confirm('Delete this collection and all its documents?')) {
      await deleteCollection(id!);
      navigate('/');
    }
  };

  if (!collection) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-teal-50">
        <Navbar />
        <div className="text-center py-20 text-gray-400 text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-teal-50 flex flex-col">
      <Navbar />

      <div className="border-b border-gray-200/50 bg-white/70 backdrop-blur-sm px-6 py-3.5 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/')}
            className="text-gray-400 hover:text-gray-600 bg-transparent border-none cursor-pointer transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 className="font-bold text-gray-800 text-lg">{collection.name}</h2>
            {collection.description && (
              <p className="text-xs text-gray-500">{collection.description}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowUpload(!showUpload)}
            className="flex items-center gap-1.5 px-4 py-2 text-sm bg-blue-600 text-white rounded-xl hover:bg-blue-700 border-none cursor-pointer font-medium transition-colors shadow-sm"
          >
            <Upload size={14} />
            Upload
          </button>
          <button
            onClick={handleDeleteCollection}
            className="flex items-center gap-1.5 px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-xl bg-transparent border-none cursor-pointer transition-colors"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden h-[calc(100vh-120px)]">
        <Sidebar
          collectionId={id!}
          onConversationSelect={handleConversationSelect}
          onNewChat={handleNewChat}
          refreshTrigger={refreshTrigger}
        />

        <div className="flex-1 flex flex-col min-w-0">
          {showUpload && (
            <div className="p-4 border-b border-gray-200/50 bg-white/70 backdrop-blur-sm flex-shrink-0">
              <FileUploader collectionId={id!} onUploadComplete={handleUploadComplete} />
            </div>
          )}

          <div className="flex-1 overflow-hidden relative">
            <ChatWindow messages={messages} onSend={sendMessage} loading={loading} />
          </div>
        </div>
      </div>
    </div>
  );
}
