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
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Your Collections</h1>
            <p className="text-gray-500 text-sm mt-1">Organize your documents into collections</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm border-none cursor-pointer"
          >
            <Plus size={18} />
            New Collection
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-400">Loading...</div>
        ) : collections.length === 0 ? (
          <div className="text-center py-20">
            <FolderOpen size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-500">No collections yet</h3>
            <p className="text-sm text-gray-400 mt-1">Create a collection to start uploading documents</p>
            <button
              onClick={() => setShowModal(true)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm border-none cursor-pointer"
            >
              Create your first collection
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
