'use client';

import { changeLog, ChangeLogEntry } from '@/data/mockData';
import Link from 'next/link';
import { useState, useMemo } from 'react';

export default function ChangelogPage() {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter changelog entries based on search query
  const filteredChangeLog = useMemo(() => {
    if (!searchQuery.trim()) {
      return changeLog;
    }

    const lowerQuery = searchQuery.toLowerCase();
    return changeLog.filter((log: ChangeLogEntry) => {
      // Search in announcement
      const announcementMatch = log.announcement.toLowerCase().includes(lowerQuery);
      
      // Search in date
      const dateMatch = log.date.toLowerCase().includes(lowerQuery);
      
      // Search in changes
      const changesMatch = log.changes.some(change => 
        change.field.toLowerCase().includes(lowerQuery) ||
        change.from.toLowerCase().includes(lowerQuery) ||
        change.to.toLowerCase().includes(lowerQuery)
      );

      return announcementMatch || dateMatch || changesMatch;
    });
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is handled by useMemo above
  };

  // Highlight search terms in text
  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;
    
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) => 
      part.toLowerCase() === query.toLowerCase() ? 
        <mark key={index} className="bg-yellow-200 text-gray-900 px-1 rounded">{part}</mark> : 
        part
    );
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/"
            className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            กลับสู่หน้าหลัก
          </Link>
          <h1 className="text-4xl font-bold text-white noto-sans-thai-bold mb-2">
            ประวัติการเปลี่ยนแปลงทั้งหมด
            <span className="text-2xl text-white/60 ml-3">({changeLog.length} รายการ)</span>
          </h1>
          <p className="text-white/80 noto-sans-thai-regular">
            ติดตามการอัปเดตและการเปลี่ยนแปลงของระบบทั้งหมด
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400 group-focus-within:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ค้นหาในประวัติการเปลี่ยนแปลง..."
                className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white/95 backdrop-blur-md text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/60 focus:bg-white text-base shadow-xl noto-sans-thai-regular border border-white/20 transition-all duration-300"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </form>
          
          {/* Search Results Info */}
          {searchQuery && (
            <div className="mt-4 text-center">
              <p className="text-white/70 noto-sans-thai-regular">
                พบ {filteredChangeLog.length} รายการจากการค้นหา "{searchQuery}"
              </p>
            </div>
          )}
        </div>

        {/* Changelog Entries */}
        {filteredChangeLog.length > 0 ? (
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl noto-sans-thai-semibold text-white mb-6">รายการการเปลี่ยนแปลง</h3>
            <div className="space-y-4">
              {filteredChangeLog.map((log: ChangeLogEntry, logIndex: number) => (
                <div key={logIndex} className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <span className="bg-blue-500/30 text-blue-200 px-3 py-1 rounded-full text-sm noto-sans-thai-medium">
                        Version 3.0
                      </span>
                      <span className="text-white/70 noto-sans-thai-regular">
                        {highlightText(log.date, searchQuery)}
                      </span>
                    </div>
                  </div>
                  
                  {/* Announcement */}
                  <h4 className="text-lg text-white noto-sans-thai-semibold mb-4">
                    {highlightText(log.announcement, searchQuery)}
                  </h4>

                  <div className="space-y-3">
                    {log.changes.map((change: { field: string; from: string; to: string }, changeIndex: number) => (
                      <div key={changeIndex} className="bg-blue-500/10 border-blue-500/30 rounded-lg p-4 border">
                        <div className="flex items-start space-x-3">
                          <div className="mt-1 px-2 py-1 rounded text-xs noto-sans-thai-medium bg-blue-500/20 text-blue-300">
                            ~ แก้ไข
                          </div>
                          <div className="flex-1">
                            <p className="text-white noto-sans-thai-semibold mb-1">
                              {highlightText(change.field, searchQuery)}
                            </p>
                            <p className="text-white/80 noto-sans-thai-regular text-sm mb-2">
                              อัปเดตข้อมูลและปรับปรุงเนื้อหา
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                              <div className="bg-red-500/10 rounded p-3 border border-red-500/20">
                                <div className="flex items-center space-x-2 mb-1">
                                  <span className="text-red-300 text-xs noto-sans-thai-medium">- ก่อน:</span>
                                </div>
                                <span className="text-white/70 text-sm noto-sans-thai-regular">
                                  {highlightText(change.from, searchQuery)}
                                </span>
                              </div>
                              <div className="bg-green-500/10 rounded p-3 border border-green-500/20">
                                <div className="flex items-center space-x-2 mb-1">
                                  <span className="text-green-300 text-xs noto-sans-thai-medium">+ หลัง:</span>
                                </div>
                                <span className="text-white/70 text-sm noto-sans-thai-regular">
                                  {highlightText(change.to, searchQuery)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* No Results */
          <div className="text-center py-12">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 max-w-md mx-auto">
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

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-white/60 noto-sans-thai-regular">
            หากมีคำถามเกี่ยวกับการเปลี่ยนแปลงใดๆ กรุณาติดต่อทีมงาน
          </p>
        </div>
      </div>
    </div>
  );
}