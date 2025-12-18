'use client';

import { useState } from 'react';
import { mockSearchResults } from '@/data/mockData';

interface SearchResult {
  id: string;
  title: string;
  url: string;
  description: string;
  relevanceScore: number;
}

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Try to call the real API first
      const response = await fetch('http://mock.ntbx.tech:8012/hackaton/search/frontend', {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('API not available');
      }

      const data = await response.json();
      setSearchResults(data.results || data || []);
    } catch (err) {
      // Fallback to mock data for testing
      console.log('Using mock data for search results');
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Filter mock results based on search query
      const filteredResults = mockSearchResults.filter(result =>
        result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        result.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      setSearchResults(filteredResults.length > 0 ? filteredResults : mockSearchResults);
    } finally {
      setIsLoading(false);
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
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-6 py-3 rounded-2xl noto-sans-thai-medium transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
          >
            ค้นหา
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
      {searchResults.length > 0 && (
        <div className="mt-12 max-w-6xl mx-auto">
          <div className="mb-6">
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
                onClick={() => window.open(result.url, '_blank')}
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 noto-sans-thai-bold group-hover:text-purple-600 transition-colors line-clamp-2">
                    {result.title}
                  </h3>
                  <div className="flex items-center space-x-1 ml-2 flex-shrink-0">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-xs text-gray-500 noto-sans-thai-regular">
                      {Math.round(result.relevanceScore * 100)}%
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-600 noto-sans-thai-regular text-sm mb-4 line-clamp-3">
                  {result.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400 noto-sans-thai-regular truncate">
                    {result.url}
                  </span>
                  <svg className="w-4 h-4 text-gray-400 group-hover:text-purple-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}