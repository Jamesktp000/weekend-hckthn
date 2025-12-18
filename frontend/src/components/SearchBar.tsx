'use client';

import { useState } from 'react';

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    // Implement your search logic here
    // This should handle:
    // - Text, PDF, Images
    // - Fuzzy matching (typos, similar words)
    // - Synonyms and colloquial terms
    // - Natural language queries
    
    console.log('Searching for:', searchQuery);
    
    // Simulate search delay
    setTimeout(() => {
      setIsSearching(false);
    }, 1000);
  };

  return (
    <div className="w-full bg-white/5 backdrop-blur-sm py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <form onSubmit={handleSearch} className="relative">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for documents, announcements, policies... (supports natural language, typos, and synonyms)"
              className="block w-full pl-12 pr-32 py-4 text-base bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-2">
              <button
                type="submit"
                disabled={isSearching || !searchQuery.trim()}
                className="px-6 py-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-medium rounded-lg hover:from-pink-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isSearching ? 'Searching...' : 'Search'}
              </button>
            </div>
          </div>
        </form>
        
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="text-xs text-gray-400">Supports:</span>
          <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-white/10 text-gray-300">
            📄 Text
          </span>
          <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-white/10 text-gray-300">
            📑 PDF
          </span>
          <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-white/10 text-gray-300">
            🖼️ Images
          </span>
          <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-white/10 text-gray-300">
            🔍 Fuzzy Search
          </span>
          <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-white/10 text-gray-300">
            💬 Natural Language
          </span>
        </div>
      </div>
    </div>
  );
}
