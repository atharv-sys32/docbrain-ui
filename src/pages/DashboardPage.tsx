import { useState, useEffect } from 'react';
import { listCollections } from '../api/collections';
import type { Collection } from '../types';
import Navbar from '../components/layout/Navbar';
import CollectionCard from '../components/collections/CollectionCard';
import CreateCollectionModal from '../components/collections/CreateCollectionModal';
import { Plus, FolderOpen } from 'lucide-react';

export default function DashboardPage() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchCollections = () => {
    setLoading(true);
    listCollections()
      .then((res) => setCollections(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #ecfeff 0%, #eff6ff 50%, #f0fdfa 100%)' }}>
      <Navbar />

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#1e293b' }}>Your Collections</h1>
            <p style={{ color: '#64748b', marginTop: '6px', fontSize: '15px' }}>Organize your documents into collections</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '14px 24px',
              backgroundColor: '#2563eb',
              color: '#fff',
              borderRadius: '12px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '15px',
              boxShadow: '0 4px 14px rgba(37,99,235,0.3)',
            }}
          >
            <Plus size={18} />
            New Collection
          </button>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: '#94a3b8', fontSize: '16px' }}>Loading...</div>
        ) : collections.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '100px 0' }}>
            <div
              style={{
                width: '80px',
                height: '80px',
                backgroundColor: '#eff6ff',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px',
              }}
            >
              <FolderOpen size={40} color="#93c5fd" />
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#64748b' }}>No collections yet</h3>
            <p style={{ color: '#94a3b8', marginTop: '8px' }}>Create a collection to start uploading documents</p>
            <button
              onClick={() => setShowModal(true)}
              style={{
                marginTop: '24px',
                padding: '14px 28px',
                backgroundColor: '#2563eb',
                color: '#fff',
                borderRadius: '12px',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '15px',
                boxShadow: '0 4px 14px rgba(37,99,235,0.3)',
              }}
            >
              Create your first collection
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
            {collections.map((c) => (
              <CollectionCard key={c.id} collection={c} />
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <CreateCollectionModal
          onClose={() => setShowModal(false)}
          onCreated={fetchCollections}
        />
      )}
    </div>
  );
}
