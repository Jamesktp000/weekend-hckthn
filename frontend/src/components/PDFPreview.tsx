'use client';

import { useState, useEffect, useRef } from 'react';

interface PDFPreviewProps {
  pdfUrl: string;
  title: string;
  className?: string;
}

export default function PDFPreview({ pdfUrl, title, className = '' }: PDFPreviewProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let isMounted = true;

    const loadPDF = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('Loading PDF from:', pdfUrl);
        
        // Dynamically import pdfjs-dist legacy build (better Next.js compatibility)
        const pdfjsLib = await import('pdfjs-dist/legacy/build/pdf');
        
        // Set worker source to use legacy build
        const workerVersion = '3.11.174';
        pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${workerVersion}/pdf.worker.min.js`;
        
        console.log('PDF.js loaded');
        
        // Load PDF with CORS configuration
        const loadingTask = pdfjsLib.getDocument({
          url: pdfUrl,
          cMapUrl: `https://cdnjs.cloudflare.com/ajax/libs/pdfjs-dist/${workerVersion}/cmaps/`,
          cMapPacked: true,
        });
        
        const pdf = await loadingTask.promise;
        console.log('PDF loaded successfully, pages:', pdf.numPages);
        
        if (!isMounted) return;
        
        // Get first page
        const page = await pdf.getPage(1);
        console.log('First page loaded');
        
        if (!isMounted) return;
        
        // Prepare canvas
        const canvas = canvasRef.current;
        if (!canvas) {
          console.error('Canvas not found');
          return;
        }
        
        const context = canvas.getContext('2d');
        if (!context) {
          console.error('Canvas context not found');
          return;
        }
        
        // Calculate scale to fit container width (300px typical card width)
        const containerWidth = 400;
        const originalViewport = page.getViewport({ scale: 1 });
        const scale = containerWidth / originalViewport.width;
        const viewport = page.getViewport({ scale });
        
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        
        console.log('Rendering PDF page...');
        
        // Render PDF page to canvas
        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };
        
        await page.render(renderContext).promise;
        console.log('PDF page rendered');
        
        if (!isMounted) return;
        
        // Convert canvas to image URL
        const imageUrl = canvas.toDataURL('image/jpeg', 0.85);
        setPreviewUrl(imageUrl);
        setLoading(false);
        
        console.log('Preview generated successfully');
      } catch (err) {
        console.error('Error loading PDF preview:', err);
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Unknown error');
          setLoading(false);
        }
      }
    };

    loadPDF();

    return () => {
      isMounted = false;
    };
  }, [pdfUrl]);

  return (
    <div className={`relative bg-white/5 overflow-hidden ${className}`}>
      {loading ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-white/20 border-t-pink-500"></div>
          <span className="text-white/60 text-sm noto-sans-thai-regular">กำลังโหลด...</span>
        </div>
      ) : previewUrl ? (
        <img 
          src={previewUrl} 
          alt={title}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
          <svg className="w-16 h-16 text-white/30 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          <span className="text-white/50 text-sm noto-sans-thai-regular text-center">ไม่สามารถโหลด Preview</span>
          {error && (
            <span className="text-white/40 text-xs noto-sans-thai-regular mt-2 text-center">{error}</span>
          )}
        </div>
      )}
      
      {/* Hidden canvas for PDF rendering */}
      <canvas ref={canvasRef} className="hidden" />
      
      {/* Gradient overlay */}
      {previewUrl && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
      )}
    </div>
  );
}
