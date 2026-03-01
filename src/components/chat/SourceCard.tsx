import type { SourceCitation } from '../../types';
import { FileText } from 'lucide-react';

interface SourceCardProps {
  source: SourceCitation;
}

export default function SourceCard({ source }: SourceCardProps) {
  const score = Math.round(source.relevanceScore * 100);

  return (
    <div className="border border-gray-200 rounded-lg p-3 bg-gray-50 text-sm">
      <div className="flex items-center gap-2 mb-1">
        <FileText size={14} className="text-blue-500" />
        <span className="font-medium text-blue-600">{source.documentName}</span>
        <span className="text-xs text-gray-400">Chunk {source.chunkIndex}</span>
        <span className="ml-auto text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
          {score}% match
        </span>
      </div>
      <p className="text-gray-600 text-xs leading-relaxed">{source.snippet}</p>
    </div>
  );
}
