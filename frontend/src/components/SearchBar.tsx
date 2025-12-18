'use client';

import { useState } from 'react';
import { topics, getDocumentUrl, type Document } from '@/data/mockData';

interface SearchResult {
  id: string;
  title: string;
  url: string;
  description: string;
  relevanceScore: number;
  category: string;
  lastUpdated: string;
  documentType?: string;
}

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get all documents from topics
  const getAllDocuments = (): Document[] => {
    const allDocs: Document[] = [];
    
    topics.forEach(topic => {
      topic.subtopics.forEach(subtopic => {
        subtopic.documents.forEach(doc => {
          allDocs.push({
            ...doc,
            category: topic.name // Add category from topic name
          });
        });
      });
    });
    
    return allDocs;
  };

  // Calculate relevance score
  const calculateRelevanceScore = (doc: Document, query: string): number => {
    if (!query.trim()) return 0.5;
    
    const lowerQuery = query.toLowerCase();
    let score = 0;
    
    // Title match (highest weight)
    if (doc.title.toLowerCase().includes(lowerQuery)) {
      score += 0.5;
      if (doc.title.toLowerCase() === lowerQuery) {
        score += 0.3;
      }
    }
    
    // Preview match
    if (doc.preview.toLowerCase().includes(lowerQuery)) {
      score += 0.2;
    }
    
    // Content match
    if (doc.fullContent?.toLowerCase().includes(lowerQuery)) {
      score += 0.15;
    }
    
    // Category match
    if (doc.category?.toLowerCase().includes(lowerQuery)) {
      score += 0.1;
    }
    
    return Math.min(score, 1);
  };

  // Search documents
  const searchInDocuments = (query: string): Document[] => {
    if (!query.trim()) {
      return getAllDocuments();
    }
    
    const lowerQuery = query.toLowerCase();
    const allDocs = getAllDocuments();
    
    return allDocs.filter(doc => {
      const titleMatch = doc.title.toLowerCase().includes(lowerQuery);
      const previewMatch = doc.preview.toLowerCase().includes(lowerQuery);
      const contentMatch = doc.fullContent?.toLowerCase().includes(lowerQuery);
      const categoryMatch = doc.category?.toLowerCase().includes(lowerQuery);
      
      return titleMatch || previewMatch || contentMatch || categoryMatch;
    });
  };

  // Convert Document to SearchResult
  const convertToSearchResult = (doc: Document, query: string): SearchResult => {
    return {
      id: doc.id,
      title: doc.title,
      url: getDocumentUrl(doc),
      description: doc.preview,
      relevanceScore: calculateRelevanceScore(doc, query),
      category: doc.category || 'ทั่วไป',
      lastUpdated: doc.lastUpdated,
      documentType: doc.documentType
    };
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Search documents from topics
      const foundDocuments = searchInDocuments(searchQuery);
      
      // Convert to SearchResult format with relevance scores
      const results = foundDocuments
        .map(doc => convertToSearchResult(doc, searchQuery))
        .sort((a, b) => b.relevanceScore - a.relevanceScore) // Sort by relevance
        .slice(0, 12); // Limit to top 12 results
      
      setSearchResults(results);
      
    } catch (err) {
      console.error('Search error:', err);
      setError('เกิดข้อผิดพลาดในการค้นหา กรุณาลองใหม่อีกครั้ง');
    } finally {
      setIsLoading(false);
    }
  };

  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;
    
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) => 
      part.toLowerCase() === query.toLowerCase() ? 
        <mark key={index} className="bg-yellow-200 text-gray-900 px-1 rounded">{part}</mark> : 
        part
    );
  };

  const getFileIcon = (documentType?: string) => {
    switch (documentType) {
      case 'pdf':
        return (
          <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
          </svg>
        );
      case 'png':
      case 'jpg':
      case 'webp':
        return (
          <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
          </svg>
        );
      default:
        return (
          <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  return (
    <div className="text-center mb-16">
      {/* Hero Section with Enhanced Typography */}
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl noto-sans-thai-bold text-white mb-6 leading-tight">
          ค้นหาสิ่งที่คุณต้องการ
        </h1>
        <p className="text-2xl text-white/90 mb-4 noto-sans-thai-regular max-w-4xl mx-auto leading-relaxed">
          ค้นหาอัจฉริยะในเอกสาร นโยบาย และประกาศทั้งหมดของคุณ
        </p>
      </div>

      {/* Enhanced Search Bar */}
      <form onSubmit={handleSearch} className="max-w-4xl mx-auto">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
            <svg className="h-6 w-6 text-gray-400 group-focus-within:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ค้นหาเอกสาร นโยบาย หรือถามคำถาม..."
            className="w-full pl-16 pr-36 py-4 rounded-3xl bg-white/98 backdrop-blur-md text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/60 focus:bg-white text-lg shadow-2xl noto-sans-thai-regular border border-white/20 transition-all duration-300"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-6 py-3 rounded-2xl noto-sans-thai-medium transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'กำลังค้นหา...' : 'ค้นหา'}
          </button>
        </div>
      </form>

      {/* Search Features */}
      <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-white/80">
        <div className="flex items-center space-x-2 bg-white/15 backdrop-blur-sm px-5 py-3 rounded-full border border-white/20 hover:bg-white/20 transition-all">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          <span className="noto-sans-thai-medium">พิมพ์ผิดก็หาเจอ</span>
        </div>
        <div className="flex items-center space-x-2 bg-white/15 backdrop-blur-sm px-5 py-3 rounded-full border border-white/20 hover:bg-white/20 transition-all">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          <span className="noto-sans-thai-medium">ครอบคลุมทุกไฟล์</span>
        </div>
        <div className="flex items-center space-x-2 bg-white/15 backdrop-blur-sm px-5 py-3 rounded-full border border-white/20 hover:bg-white/20 transition-all">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          <span className="noto-sans-thai-medium">ถามเป็นประโยคได้</span>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="mt-8 flex justify-center">
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              <span className="text-white noto-sans-thai-medium">กำลังค้นหา...</span>
            </div>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="mt-8 max-w-2xl mx-auto">
          <div className="bg-red-500/20 backdrop-blur-sm rounded-2xl p-6 border border-red-400/30">
            <div className="flex items-center space-x-3">
              <svg className="w-6 h-6 text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-red-100 noto-sans-thai-medium">{error}</span>
            </div>
          </div>
        </div>
      )}

      {/* Search Results */}
      {searchResults.length > 0 && !isLoading && (
        <div className="mt-12 max-w-6xl mx-auto">
          <div className="mb-6 text-left">
            <h2 className="text-2xl text-white noto-sans-thai-bold mb-2">
              ผลการค้นหา ({searchResults.length} รายการ)
            </h2>
            <p className="text-white/70 noto-sans-thai-regular">
              คำค้นหา: "{searchQuery}"
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchResults.map((result) => (
              <div
                key={result.id}
                className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
                onClick={() => {
                  const fullUrl = result.url.startsWith('http') 
                    ? result.url 
                    : `${window.location.origin}${result.url}`;
                  window.open(fullUrl, '_blank');
                }}
              >
                {/* Category Badge & Relevance Score */}
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 noto-sans-thai-medium">
                    {result.category}
                  </span>
                  <div className="flex items-center space-x-1 bg-gradient-to-r from-green-400 to-emerald-500 px-3 py-1 rounded-full">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-xs font-bold text-white noto-sans-thai-bold">
                      {Math.round(result.relevanceScore * 100)}%
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-800 noto-sans-thai-bold group-hover:text-purple-600 transition-colors line-clamp-2 mb-3">
                  {highlightText(result.title, searchQuery)}
                </h3>
                
                {/* Description */}
                <p className="text-gray-600 noto-sans-thai-regular text-sm mb-4 line-clamp-3">
                  {highlightText(result.description, searchQuery)}
                </p>
                
                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-2">
                    {getFileIcon(result.documentType)}
                    <span className="text-xs text-gray-500 noto-sans-thai-regular">
                      {result.lastUpdated}
                    </span>
                  </div>
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* No Results */}
      {searchResults.length === 0 && searchQuery && !isLoading && (
        <div className="mt-12 max-w-2xl mx-auto">
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 border border-white/30">
            <svg className="w-16 h-16 text-white/50 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl text-white noto-sans-thai-bold mb-2">ไม่พบผลการค้นหา</h3>
            <p className="text-white/70 noto-sans-thai-regular">
              ลองใช้คำค้นหาอื่น หรือตรวจสอบการสะกดคำ
            </p>
          </div>
        </div>
      )}
    </div>
  );
}