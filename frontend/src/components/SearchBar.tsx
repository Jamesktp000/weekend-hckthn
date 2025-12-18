'use client';

import { useState } from 'react';

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="text-center mb-16">
      {/* Hero Section with Enhanced Typography */}
      <div className="mb-12">
        <h1 className="text-6xl md:text-7xl noto-sans-thai-bold text-white mb-6 leading-tight">
          ค้นหาสิ่งที่คุณต้องการ
        </h1>
        <p className="text-2xl text-white/90 mb-4 noto-sans-thai-regular max-w-4xl mx-auto leading-relaxed">
          ค้นหาอัจฉริยะในเอกสาร นโยบาย และประกาศทั้งหมดของคุณ
        </p>
        <p className="text-lg text-white/70 noto-sans-thai-light max-w-2xl mx-auto">
          ระบบค้นหาที่ทันสมัยด้วยปัญญาประดิษฐ์ที่เข้าใจภาษาไทย
        </p>
      </div>

      {/* Enhanced Search Bar */}
      <form onSubmit={handleSearch} className="max-w-4xl mx-auto">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
            <svg className="h-7 w-7 text-gray-400 group-focus-within:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ค้นหาเอกสาร นโยบาย หรือถามคำถาม..."
            className="w-full pl-16 pr-36 py-6 rounded-3xl bg-white/98 backdrop-blur-md text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/60 focus:bg-white text-xl shadow-2xl noto-sans-thai-regular border border-white/20 transition-all duration-300"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-10 py-4 rounded-2xl noto-sans-thai-medium transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
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
          <span className="noto-sans-thai-medium">ทนต่อการพิมพ์ผิด</span>
        </div>
        <div className="flex items-center space-x-2 bg-white/15 backdrop-blur-sm px-5 py-3 rounded-full border border-white/20 hover:bg-white/20 transition-all">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          <span className="noto-sans-thai-medium">ค้นหาความหมาย</span>
        </div>
        <div className="flex items-center space-x-2 bg-white/15 backdrop-blur-sm px-5 py-3 rounded-full border border-white/20 hover:bg-white/20 transition-all">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          <span className="noto-sans-thai-medium">หลายรูปแบบไฟล์</span>
        </div>
        <div className="flex items-center space-x-2 bg-white/15 backdrop-blur-sm px-5 py-3 rounded-full border border-white/20 hover:bg-white/20 transition-all">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          <span className="noto-sans-thai-medium">ภาษาธรรมชาติ</span>
        </div>
      </div>
    </div>
  );
}
