import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { uploadDocument } from '../../api/documents';
import { Upload, Loader2 } from 'lucide-react';

interface FileUploaderProps {
  collectionId: string;
  onUploadComplete: () => void;
}

export default function FileUploader({ collectionId, onUploadComplete }: FileUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setError(null);
      setUploading(true);

      try {
        for (const file of acceptedFiles) {
          await uploadDocument(collectionId, file);
        }
        onUploadComplete();
      } catch (err: any) {
        setError(err.response?.data?.message || 'Upload failed');
      } finally {
        setUploading(false);
      }
    },
    [collectionId, onUploadComplete]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt'],
    },
    maxSize: 20 * 1024 * 1024,
    disabled: uploading,
  });

  return (
    <div>
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'}
          ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <input {...getInputProps()} />
        {uploading ? (
          <div className="flex flex-col items-center gap-2">
            <Loader2 size={32} className="text-blue-500 animate-spin" />
            <p className="text-sm text-gray-600">Uploading...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <Upload size={32} className="text-gray-400" />
            <p className="text-sm text-gray-600">
              {isDragActive ? 'Drop files here...' : 'Drag & drop files, or click to select'}
            </p>
            <p className="text-xs text-gray-400">PDF, DOCX, TXT (max 20MB)</p>
          </div>
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}
