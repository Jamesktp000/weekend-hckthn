'use client';

import { useState } from 'react';

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="text-center mb-12">
      <h1 className="text-5xl md:text-6xl noto-sans-thai-bold text-white mb-4">
        ค้นหาสิ่งที่คุณต้องการ
      </h1>
      <p className="text-xl text-white/90 mb-8 noto-sans-thai-regular">
        ค้นหาอัจฉริยะในเอกสาร นโยบาย และประกาศทั้งหมดของคุณ
      </p>

      {/* Advanced Search Bar */}
      <form onSubmit={handleSearch} className="max-w-3xl mx-auto">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ค้นหาเอกสาร นโยบาย หรือถามคำถาม..."
            className="w-full pl-12 pr-32 py-5 rounded-2xl bg-white/95 backdrop-blur-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/50 text-lg shadow-2xl noto-sans-thai-regular"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl noto-sans-thai-medium transition shadow-lg"
          >
            ค้นหา
          </button>
        </div>
      </form>
    </div>
  );
}
