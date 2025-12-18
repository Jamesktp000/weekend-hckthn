'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Navbar from '@/components/Navbar';
import AnnouncementBar from '@/components/AnnouncementBar';
import SearchBar from '@/components/SearchBar';
import { getDocumentById } from '@/data/mockData';

function CompareContent() {
  const searchParams = useSearchParams();
  const docsParam = searchParams.get('docs');
  const topicId = searchParams.get('topic');
  const subtopicId = searchParams.get('subtopic');

  if (!docsParam || !topicId || !subtopicId) {
    return (
      <div className="text-center text-white">
        <p className="text-xl noto-sans-thai-medium">กรุณาเลือกเอกสารเพื่อเปรียบเทียบ</p>
        <Link href="/" className="text-pink-300 hover:text-pink-200 mt-4 inline-block">
          กลับไปหน้าหลัก
        </Link>
      </div>
    );
  }

  const docIds = docsParam.split(',');
  const documents = docIds
    .map(id => getDocumentById(topicId, subtopicId, id))
    .filter(doc => doc !== undefined);

  if (documents.length < 2) {
    return (
      <div className="text-center text-white">
        <p className="text-xl noto-sans-thai-medium">ต้องมีอย่างน้อย 2 เอกสารเพื่อเปรียบเทียบ</p>
        <Link href={`/${topicId}/${subtopicId}`} className="text-pink-300 hover:text-pink-200 mt-4 inline-block">
          กลับไปเลือกเอกสาร
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* Breadcrumb */}
      <div className="mb-8 flex items-center space-x-2 text-white/80">
        <Link href="/" className="hover:text-white transition">
          หน้าหลัก
        </Link>
        <span>/</span>
        <Link href={`/${topicId}`} className="hover:text-white transition">
          {topicId}
        </Link>
        <span>/</span>
        <Link href={`/${topicId}/${subtopicId}`} className="hover:text-white transition">
          {subtopicId}
        </Link>
        <span>/</span>
        <span className="text-white">เปรียบเทียบเอกสาร</span>
      </div>

      {/* Compare Mode View */}
      <div className="space-y-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl noto-sans-thai-bold text-white">เปรียบเทียบเอกสาร</h2>
          <Link
            href={`/${topicId}/${subtopicId}`}
            className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg noto-sans-thai-medium transition"
          >
            ปิดการเปรียบเทียบ
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documents.map((doc) => (
            <div key={doc!.id} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl noto-sans-thai-semibold text-white">{doc!.title}</h3>
                <Link
                  href={`/${topicId}/${subtopicId}/${doc!.id}`}
                  className="text-pink-300 hover:text-pink-200"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </Link>
              </div>
              <p className="text-white/80 noto-sans-thai-regular mb-4">{doc!.preview}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/60 noto-sans-thai-regular">อัปเดต: {doc!.lastUpdated}</span>
                <Link
                  href={`/${topicId}/${subtopicId}/${doc!.id}`}
                  className="text-pink-300 hover:text-pink-200 noto-sans-thai-medium"
                >
                  ดูรายละเอียด →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default function ComparePage() {
  return (
    <div className="min-h-screen" style={{
      background: 'linear-gradient(135deg, #db2777 0%, #a855f7 35%, #6366f1 60%, #1e40af 100%)'
    }}>
      <Navbar />
      <AnnouncementBar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SearchBar />
        <Suspense fallback={<div className="text-white text-center">กำลังโหลด...</div>}>
          <CompareContent />
        </Suspense>
      </main>
    </div>
  );
}
