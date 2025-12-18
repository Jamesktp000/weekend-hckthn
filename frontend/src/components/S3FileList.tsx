'use client';

import { useState, useEffect } from 'react';
import { listBucketObjects, getPresignedUrl, S3Object } from '@/services/s3Service';

export default function S3FileList() {
  const [files, setFiles] = useState<S3Object[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadFiles();
  }, []);

  const loadFiles = async () => {
    try {
      setLoading(true);
      setError(null);
      const objects = await listBucketObjects();
      setFiles(objects);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load files');
    } finally {
      setLoading(false);
    }
  };

  const handleFileClick = async (key: string) => {
    try {
      const url = await getPresignedUrl(key);
      window.open(url, '_blank');
    } catch (err) {
      alert('Failed to open file: ' + (err instanceof Error ? err.message : 'Unknown error'));
    }
  };

  if (loading) {
    return <div className="p-4">Loading files from S3...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-600">Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">S3 Bucket: weekend-knowledge</h2>
      <div className="space-y-2">
        {files.length === 0 ? (
          <p className="text-gray-500">No files found in bucket</p>
        ) : (
          files.map((file) => (
            <div
              key={file.key}
              className="p-3 border rounded hover:bg-gray-50 cursor-pointer"
              onClick={() => handleFileClick(file.key)}
            >
              <div className="font-medium">{file.key}</div>
              <div className="text-sm text-gray-500">
                {file.size ? `${(file.size / 1024).toFixed(2)} KB` : ''} 
                {file.lastModified ? ` • ${file.lastModified.toLocaleDateString()}` : ''}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
