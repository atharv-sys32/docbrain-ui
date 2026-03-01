import type { Collection } from '../../types';
import { FolderOpen, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CollectionCardProps {
  collection: Collection;
}

export default function CollectionCard({ collection }: CollectionCardProps) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/collections/${collection.id}`)}
      className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md hover:border-blue-300 transition-all cursor-pointer"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
          <FolderOpen size={20} className="text-blue-600" />
        </div>
        <h3 className="font-semibold text-gray-800 truncate">{collection.name}</h3>
      </div>
      {collection.description && (
        <p className="text-sm text-gray-500 mb-4 line-clamp-2">{collection.description}</p>
      )}
      <div className="flex items-center gap-4 text-xs text-gray-400">
        <span className="flex items-center gap-1">
          <FileText size={12} />
          {collection.documentCount} docs
        </span>
      </div>
    </div>
  );
}
