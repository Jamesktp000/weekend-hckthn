'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import AnnouncementBar from '@/components/AnnouncementBar';
import { searchDocuments, SearchSource } from '@/services/bedrockSearch';
import { matchSearchSourcesToDocuments, buildDocumentUrl, MatchedDocument } from '@/utils/documentMatcher';

function SearchContent() {
  const searchParams = useSearchParams();
  const urlQuery = searchParams.get('q') || '';
  
  const [query, setQuery] = useState(urlQuery);
  const [isSearching, setIsSearching] = useState(false);
  const [answer, setAnswer] = useState('');
  const [matchedResults, setMatchedResults] = useState<MatchedDocument[]>([]);
  const [unmatchedSources, setUnmatchedSources] = useState<SearchSource[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Auto-search when URL query is present
  useEffect(() => {
    if (urlQuery) {
      performSearch(urlQuery);
    }
  }, [urlQuery]);

  const performSearch = async (searchQuery: string) => {
    setIsSearching(true);
    setError(null);
    setAnswer('');
    setMatchedResults([]);
    setUnmatchedSources([]);

    try {
      const response = await searchDocuments(searchQuery);
      setAnswer(response.answer);

      // Match sources to documents
      const matched = matchSearchSourcesToDocuments(response.sources);
      setMatchedResults(matched);

      // Find unmatched sources
      const matchedFileNames = new Set(matched.map(m => m.source.fileName));
      const unmatched = response.sources.filter(s => !matchedFileNames.has(s.fileName));
      setUnmatchedSources(unmatched);

    } catch (err) {
      console.error('Search error:', err);
      setError('เกิดข้อผิดพลาดในการค้นหา กรุณาลองใหม่อีกครั้ง');
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    await performSearch(query);
  };

  return (
    <div className="min-h-screen" style={{
      background: 'linear-gradient(135deg, #db2777 0%, #a855f7 35%, #6366f1 60%, #1e40af 100%)'
    }}>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link href="/" className="text-white/80 hover:text-white flex items-center space-x-2 noto-sans-thai-medium mb-4">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>กลับหน้าหลัก</span>
          </Link>
          <h1 className="text-4xl noto-sans-thai-bold text-white mb-4">ค้นหาเอกสาร</h1>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex gap-4">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="พิมพ์คำค้นหา เช่น การขายประกันชั้น 1"
                className="flex-1 bg-white/10 border border-white/20 text-white placeholder-white/50 rounded-lg px-6 py-4 noto-sans-thai-regular focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <button
                type="submit"
                disabled={isSearching || !query.trim()}
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 disabled:from-gray-500 disabled:to-gray-600 text-white px-8 py-4 rounded-lg noto-sans-thai-medium transition flex items-center space-x-2"
              >
                {isSearching ? (
                  <>
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>กำลังค้นหา...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <span>ค้นหา</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-4 mb-6">
            <p className="text-red-200 noto-sans-thai-regular">{error}</p>
          </div>
        )}

        {/* Answer Section */}
        {answer && (
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 mb-8">
            <h2 className="text-2xl noto-sans-thai-semibold text-white mb-4">คำตอบ</h2>
            <p className="text-white/90 noto-sans-thai-regular leading-relaxed">{answer}</p>
          </div>
        )}

        {/* Matched Documents */}
        {matchedResults.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl noto-sans-thai-semibold text-white mb-4">เอกสารที่เกี่ยวข้อง</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {matchedResults.map((result, index) => (
                <Link
                  key={index}
                  href={buildDocumentUrl(result)}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 hover:border-pink-500/50 transition group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-white noto-sans-thai-semibold mb-2 line-clamp-2 group-hover:text-pink-200 transition">
                        {result.document.title}
                      </h3>
                      <p className="text-white/60 text-xs noto-sans-thai-regular mb-2">
                        {result.source.fileName}
                      </p>
                    </div>
                    <svg className="w-5 h-5 text-pink-300 opacity-0 group-hover:opacity-100 transition flex-shrink-0 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                  <p className="text-white/70 text-sm noto-sans-thai-regular line-clamp-3 mb-3">
                    {result.document.preview}
                  </p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white/50 noto-sans-thai-regular">
                      อัปเดต: {result.document.lastUpdated}
                    </span>
                    <span className="bg-pink-500/20 text-pink-200 px-2 py-1 rounded noto-sans-thai-medium">
                      {result.document.documentType?.toUpperCase() || 'PDF'}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Unmatched Sources */}
        {unmatchedSources.length > 0 && (
          <div>
            <h2 className="text-2xl noto-sans-thai-semibold text-white mb-4">แหล่งข้อมูลอื่นๆ</h2>
            <div className="space-y-3">
              {unmatchedSources.map((source, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-white noto-sans-thai-semibold flex-1">
                      {source.fileName}
                    </h3>
                    <span className="bg-blue-500/20 text-blue-200 px-2 py-1 rounded text-xs noto-sans-thai-medium ml-4">
                      ไม่มีในระบบ
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {!isSearching && answer && matchedResults.length === 0 && unmatchedSources.length === 0 && (
          <div className="text-center py-12">
            <svg className="w-16 h-16 text-white/30 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-white/70 noto-sans-thai-regular">ไม่พบเอกสารที่เกี่ยวข้อง</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default function SearchResultsPage() {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center" style={{
          background: 'linear-gradient(135deg, #db2777 0%, #a855f7 35%, #6366f1 60%, #1e40af 100%)'
        }}>
          <div className="text-center">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-white border-r-transparent"></div>
            <p className="text-white noto-sans-thai-regular mt-4">กำลังค้นหา...</p>
          </div>
        </div>
      }>
        <SearchContent />
      </Suspense>
    </>
  );
}
