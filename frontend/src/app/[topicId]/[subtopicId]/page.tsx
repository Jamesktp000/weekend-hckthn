'use client';

import Link from 'next/link';
import { notFound, useRouter } from 'next/navigation';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import AnnouncementBar from '@/components/AnnouncementBar';
import SearchBar from '@/components/SearchBar';
import { getSubtopicById, Document } from '@/data/mockData';

export default function SubtopicPage({ params }: { params: { topicId: string; subtopicId: string } }) {
  const router = useRouter();
  const subtopic = getSubtopicById(params.topicId, params.subtopicId);
  const [compareDocuments, setCompareDocuments] = useState<Document[]>([]);

  if (!subtopic) {
    notFound();
  }

  const toggleCompareDocument = (document: Document) => {
    if (compareDocuments.find(d => d.id === document.id)) {
      setCompareDocuments(compareDocuments.filter(d => d.id !== document.id));
    } else if (compareDocuments.length < 3) {
      setCompareDocuments([...compareDocuments, document]);
    }
  };

  const startCompare = () => {
    if (compareDocuments.length >= 2) {
      const docIds = compareDocuments.map(d => d.id).join(',');
      router.push(`/compare?docs=${docIds}&topic=${params.topicId}&subtopic=${params.subtopicId}`);
    }
  };

  return (
    <div className="min-h-screen" style={{
      background: 'linear-gradient(135deg, #db2777 0%, #a855f7 35%, #6366f1 60%, #1e40af 100%)'
    }}>
      <Navbar />
      <AnnouncementBar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SearchBar />

        {/* Breadcrumb */}
        <div className="mb-8 flex items-center space-x-2 text-white/80">
          <Link href="/" className="hover:text-white transition">
            หน้าหลัก
          </Link>
          <span>/</span>
          <Link href={`/${params.topicId}`} className="hover:text-white transition">
            {params.topicId}
          </Link>
          <span>/</span>
          <span className="text-white">{subtopic.name}</span>
        </div>

        {/* Document List View */}
        <div className="space-y-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <Link
                href={`/${params.topicId}`}
                className="text-white/80 hover:text-white mb-4 flex items-center space-x-2 noto-sans-thai-medium"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>กลับไปหัวข้อย่อย</span>
              </Link>
              <h2 className="text-4xl noto-sans-thai-bold text-white">{subtopic.name}</h2>
            </div>
            {compareDocuments.length >= 2 && (
              <button
                onClick={startCompare}
                className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg noto-sans-thai-medium transition shadow-lg flex items-center space-x-2"
              >
                <span>เปรียบเทียบ ({compareDocuments.length})</span>
              </button>
            )}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subtopic.documents.map((doc) => {
              const isSelected = compareDocuments.find(d => d.id === doc.id);
              return (
                <div
                  key={doc.id}
                  className={`bg-white/10 backdrop-blur-sm rounded-2xl p-6 border transition ${
                    isSelected ? 'border-pink-400 bg-white/15' : 'border-white/20 hover:bg-white/15'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl noto-sans-thai-semibold text-white">{doc.title}</h3>
                    <button
                      onClick={() => toggleCompareDocument(doc)}
                      className={`p-2 rounded-lg transition ${
                        isSelected
                          ? 'bg-pink-500 text-white'
                          : 'bg-white/20 text-white/80 hover:bg-white/30'
                      }`}
                    >
                      {isSelected ? (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      )}
                    </button>
                  </div>
                  <p className="text-white/80 noto-sans-thai-regular mb-4 line-clamp-3">{doc.preview}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-white/60 text-sm noto-sans-thai-regular">อัปเดต: {doc.lastUpdated}</span>
                    <Link
                      href={`/${params.topicId}/${params.subtopicId}/${doc.id}`}
                      className="text-pink-300 hover:text-pink-200 noto-sans-thai-medium text-sm flex items-center space-x-1"
                    >
                      <span>อ่านเพิ่มเติม</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Floating Compare Button */}
        {compareDocuments.length > 0 && (
          <div className="fixed bottom-8 right-8 z-50">
            <div className="bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl shadow-2xl p-4">
              <div className="flex items-center space-x-4">
                <div className="text-white noto-sans-thai-medium">
                  เลือกแล้ว {compareDocuments.length} เอกสาร
                </div>
                <div className="flex space-x-2">
                  {compareDocuments.length >= 2 && (
                    <button
                      onClick={startCompare}
                      className="bg-white text-pink-600 px-6 py-2 rounded-lg noto-sans-thai-medium hover:bg-gray-100 transition"
                    >
                      เปรียบเทียบ
                    </button>
                  )}
                  <button
                    onClick={() => setCompareDocuments([])}
                    className="bg-white/20 text-white px-4 py-2 rounded-lg noto-sans-thai-medium hover:bg-white/30 transition"
                  >
                    ล้าง
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
