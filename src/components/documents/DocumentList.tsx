import { useState, useEffect } from 'react';
import { listDocuments, deleteDocument } from '../../api/documents';
import type { Document } from '../../types';
import ProcessingStatus from './ProcessingStatus';
import { Trash2, FileText } from 'lucide-react';

interface DocumentListProps {
  collectionId: string;
  refreshTrigger?: number;
}

export default function DocumentList({ collectionId, refreshTrigger }: DocumentListProps) {
  const [documents, setDocuments] = useState<Document[]>([]);

  const fetchDocuments = () => {
    listDocuments(collectionId).then((res) => setDocuments(res.data));
  };

  useEffect(() => {
    fetchDocuments();
  }, [collectionId, refreshTrigger]);

  const handleDelete = async (id: string) => {
    await deleteDocument(id);
    fetchDocuments();
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  if (documents.length === 0) {
    return <p className="text-gray-400 text-sm">No documents uploaded yet.</p>;
  }

  return (
    <div className="space-y-2">
      {documents.map((doc) => (
        <div key={doc.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg group">
          <FileText size={20} className="text-gray-400 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{doc.fileName}</p>
            <p className="text-xs text-gray-400">
              {formatSize(doc.fileSize)} {doc.totalChunks > 0 && `| ${doc.totalChunks} chunks`}
            </p>
          </div>
          <ProcessingStatus status={doc.status} />
          <button
            onClick={() => handleDelete(doc.id)}
            className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-500 bg-transparent border-none cursor-pointer"
          >
            <Trash2 size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}
