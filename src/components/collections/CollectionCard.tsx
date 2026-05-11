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
      style={{
        backgroundColor: 'rgba(255,255,255,0.9)',
        borderRadius: '16px',
        border: '1px solid #e5e7eb',
        padding: '28px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.08)';
        e.currentTarget.style.borderColor = '#93c5fd';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.borderColor = '#e5e7eb';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            backgroundColor: '#eff6ff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <FolderOpen size={24} color="#2563eb" />
        </div>
        <h3 style={{ fontWeight: 700, fontSize: '18px', color: '#1e293b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {collection.name}
        </h3>
      </div>
      {collection.description && (
        <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '16px', lineHeight: 1.5 }}>
          {collection.description}
        </p>
      )}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#94a3b8', fontWeight: 500 }}>
        <FileText size={14} />
        <span>{collection.documentCount} docs</span>
      </div>
    </div>
  );
}
