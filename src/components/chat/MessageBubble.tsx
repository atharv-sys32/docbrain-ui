import ReactMarkdown from 'react-markdown';
import type { SourceCitation } from '../../types';
import SourceCard from './SourceCard';
import { User, Bot } from 'lucide-react';

interface MessageBubbleProps {
  role: 'USER' | 'ASSISTANT';
  content: string;
  sources?: SourceCitation[];
}

export default function MessageBubble({ role, content, sources }: MessageBubbleProps) {
  const isUser = role === 'USER';

  return (
    <div className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
          <Bot size={16} className="text-blue-600" />
        </div>
      )}
      <div className={`max-w-[75%] ${isUser ? 'order-first' : ''}`}>
        <div
          className={`rounded-2xl px-4 py-3 ${
            isUser
              ? 'bg-blue-600 text-white rounded-br-md'
              : 'bg-white border border-gray-200 text-gray-800 rounded-bl-md'
          }`}
        >
          {isUser ? (
            <p className="text-sm">{content}</p>
          ) : (
            <div className="text-sm prose prose-sm max-w-none">
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          )}
        </div>
        {sources && sources.length > 0 && (
          <div className="mt-2 space-y-2">
            {sources.map((source, i) => (
              <SourceCard key={i} source={source} />
            ))}
          </div>
        )}
      </div>
      {isUser && (
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
          <User size={16} className="text-gray-600" />
        </div>
      )}
    </div>
  );
}
