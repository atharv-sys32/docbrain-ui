import { CheckCircle, Loader2, XCircle } from 'lucide-react';

interface ProcessingStatusProps {
  status: 'PROCESSING' | 'READY' | 'FAILED';
}

export default function ProcessingStatus({ status }: ProcessingStatusProps) {
  switch (status) {
    case 'READY':
      return <CheckCircle size={16} className="text-green-500 flex-shrink-0" />;
    case 'PROCESSING':
      return <Loader2 size={16} className="text-blue-500 animate-spin flex-shrink-0" />;
    case 'FAILED':
      return <XCircle size={16} className="text-red-500 flex-shrink-0" />;
  }
}
