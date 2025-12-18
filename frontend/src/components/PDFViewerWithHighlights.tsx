'use client';

import { useEffect, useRef, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';

// Configure PDF.js worker
if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.js`;
}

interface PDFViewerWithHighlightsProps {
  pdfUrl: string;
  keywords?: string[];
  title?: string;
  highlightColor?: 'green' | 'red' | 'blue';
  syncedPage?: number;
  onPageChange?: (page: number) => void;
}

export default function PDFViewerWithHighlights({
  pdfUrl,
  keywords = [],
  title,
  highlightColor = 'green',
  syncedPage,
  onPageChange
}: PDFViewerWithHighlightsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [scale, setScale] = useState(0.5);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const pdfDocRef = useRef<any>(null);
  const renderTaskRef = useRef<any>(null);

  const renderPage = async (pageNum: number) => {
    if (!pdfDocRef.current || !canvasRef.current) return;

    try {
      // Cancel any ongoing render task
      if (renderTaskRef.current) {
        renderTaskRef.current.cancel();
      }

      const page = await pdfDocRef.current.getPage(pageNum);
      const viewport = page.getViewport({ scale });
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      if (!context) return;

      canvas.height = viewport.height;
      canvas.width = viewport.width;

      // Render PDF page
      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };

      renderTaskRef.current = page.render(renderContext);
      
      try {
        await renderTaskRef.current.promise;
      } catch (err: any) {
        // Ignore RenderingCancelledException - it's expected when switching pages
        if (err.name === 'RenderingCancelledException') {
          return;
        }
        throw err;
      }
      
      renderTaskRef.current = null;

      // Draw highlights on top based on keywords
      if (keywords && keywords.length > 0) {
        const textContent = await page.getTextContent();
        
        // Set highlight color based on type
        let fillStyle = 'rgba(34, 197, 94, 0.4)'; // green
        let strokeStyle = 'rgba(34, 197, 94, 0.8)';
        
        if (highlightColor === 'red') {
          fillStyle = 'rgba(239, 68, 68, 0.4)';
          strokeStyle = 'rgba(239, 68, 68, 0.8)';
        } else if (highlightColor === 'blue') {
          fillStyle = 'rgba(59, 130, 246, 0.4)';
          strokeStyle = 'rgba(59, 130, 246, 0.8)';
        }

        textContent.items.forEach((item: any) => {
          if (!item.str) return;
          
          const text = item.str.toLowerCase();
          
          // Check if any keyword matches this text item
          const matchedKeyword = keywords.find(keyword => {
            const cleanKeyword = keyword.toLowerCase().trim();
            return cleanKeyword && text.includes(cleanKeyword);
          });

          if (matchedKeyword) {
            // Get text position
            const transform = item.transform;
            const x = transform[4];
            const y = transform[5];
            const textWidth = item.width;
            const textHeight = item.height;

            // Convert coordinates to canvas space
            const [canvasX, canvasY] = viewport.convertToViewportPoint(x, y);
            const heightScale = viewport.scale;
            const scaledHeight = textHeight * heightScale;
            const scaledWidth = textWidth * heightScale;

            // Draw highlight
            context.save();
            context.fillStyle = fillStyle;
            context.strokeStyle = strokeStyle;
            context.lineWidth = 2;
            
            // Draw rectangle
            context.fillRect(canvasX, canvasY - scaledHeight, scaledWidth, scaledHeight);
            context.strokeRect(canvasX, canvasY - scaledHeight, scaledWidth, scaledHeight);
            context.restore();
          }
        });
      }
    } catch (err) {
      console.error('Error rendering page:', err);
      setError('เกิดข้อผิดพลาดในการแสดง PDF');
    }
  };

  useEffect(() => {
    let isMounted = true;

    const loadPDF = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const loadingTask = pdfjsLib.getDocument(pdfUrl);
        const pdf = await loadingTask.promise;
        
        if (!isMounted) return;
        
        pdfDocRef.current = pdf;
        setTotalPages(pdf.numPages);
        setIsLoading(false);
        await renderPage(currentPage);
      } catch (err) {
        if (!isMounted) return;
        console.error('Error loading PDF:', err);
        setError('ไม่สามารถโหลด PDF ได้');
        setIsLoading(false);
      }
    };

    if (pdfUrl) {
      loadPDF();
    }

    return () => {
      isMounted = false;
      // Cancel any ongoing render task on cleanup
      if (renderTaskRef.current) {
        renderTaskRef.current.cancel();
        renderTaskRef.current = null;
      }
    };
  }, [pdfUrl]);

  // Sync page from parent component
  useEffect(() => {
    if (syncedPage && syncedPage !== currentPage && syncedPage <= totalPages) {
      setCurrentPage(syncedPage);
    }
  }, [syncedPage, totalPages]);

  useEffect(() => {
    let isMounted = true;

    const render = async () => {
      if (pdfDocRef.current && !isLoading && isMounted) {
        await renderPage(currentPage);
      }
    };

    render();

    return () => {
      isMounted = false;
      // Cancel render task when dependencies change
      if (renderTaskRef.current) {
        renderTaskRef.current.cancel();
        renderTaskRef.current = null;
      }
    };
  }, [currentPage, scale, keywords]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      if (onPageChange) {
        onPageChange(newPage);
      }
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      if (onPageChange) {
        onPageChange(newPage);
      }
    }
  };

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.25, 0.5));
  };

  return (
    <div className="flex flex-col h-full">
      {/* Controls */}
      <div className="bg-black/30 p-3 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center space-x-2">
          {title && (
            <span className="text-white text-sm noto-sans-thai-medium mr-4">{title}</span>
          )}
          <button
            onClick={handlePrevPage}
            disabled={currentPage <= 1}
            className="px-3 py-1 bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded text-sm"
          >
            ←
          </button>
          <span className="text-white text-sm">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage >= totalPages}
            className="px-3 py-1 bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded text-sm"
          >
            →
          </button>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={handleZoomOut}
            className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded text-sm"
          >
            −
          </button>
          <span className="text-white text-sm">{Math.round(scale * 100)}%</span>
          <button
            onClick={handleZoomIn}
            className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded text-sm"
          >
            +
          </button>
        </div>
      </div>

      {/* Canvas Container */}
      <div 
        ref={containerRef}
        className="flex-1 overflow-auto bg-gray-900/50 flex items-center justify-center p-4"
      >
        {isLoading && (
          <div className="text-white noto-sans-thai-regular flex items-center space-x-2">
            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>กำลังโหลด PDF...</span>
          </div>
        )}
        
        {error && (
          <div className="text-red-300 noto-sans-thai-regular">{error}</div>
        )}
        
        <canvas
          ref={canvasRef}
          className={`shadow-2xl ${isLoading || error ? 'hidden' : ''}`}
        />
      </div>

      {/* Legend */}
      {keywords && keywords.length > 0 && (
        <div className="bg-black/30 p-3 border-t border-white/10">
          <div className="flex items-center justify-center space-x-4 text-xs">
            <div className="flex items-center space-x-2">
              {highlightColor === 'green' && (
                <>
                  <div className="w-4 h-4 bg-green-500/40 border-2 border-green-500/80 rounded"></div>
                  <span className="text-white/70 noto-sans-thai-regular">เพิ่ม</span>
                </>
              )}
              {highlightColor === 'red' && (
                <>
                  <div className="w-4 h-4 bg-red-500/40 border-2 border-red-500/80 rounded"></div>
                  <span className="text-white/70 noto-sans-thai-regular">ลบ</span>
                </>
              )}
              {highlightColor === 'blue' && (
                <>
                  <div className="w-4 h-4 bg-blue-500/40 border-2 border-blue-500/80 rounded"></div>
                  <span className="text-white/70 noto-sans-thai-regular">แก้ไข</span>
                </>
              )}
            </div>
            <span className="text-white/50 noto-sans-thai-regular">
              {keywords.length} คำที่ไฮไลท์
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
