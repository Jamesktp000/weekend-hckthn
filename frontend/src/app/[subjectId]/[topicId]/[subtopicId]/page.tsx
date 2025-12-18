'use client';

import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import AnnouncementBar from '@/components/AnnouncementBar';
import SearchBar from '@/components/SearchBar';
import PDFPreview from '@/components/PDFPreview';
import { getSubtopicById, getTopicById, mainSubjects } from '@/data/mockData';

export default function SubtopicPage({ params }: { params: { subjectId: string; topicId: string; subtopicId: string } }) {
  const subject = mainSubjects.find(s => s.id === params.subjectId);
  const topic = getTopicById(params.topicId);
  const subtopic = getSubtopicById(params.topicId, params.subtopicId);

  if (!subtopic || !topic || !subject) {
    notFound();
  }

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
          <Link href={`/${params.subjectId}`} className="hover:text-white transition">
            {subject.name}
          </Link>
          <span>/</span>
          <Link href={`/${params.subjectId}/${params.topicId}`} className="hover:text-white transition">
            {topic.name}
          </Link>
          <span>/</span>
          <span className="text-white">{subtopic.name}</span>
        </div>

        {/* Document List View */}
        <div className="space-y-6">
          <div className="mb-6">
            <Link
              href={`/${params.subjectId}/${params.topicId}`}
              className="text-white/80 hover:text-white mb-4 flex items-center space-x-2 noto-sans-thai-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>กลับไป{topic.name}</span>
            </Link>
            <h2 className="text-4xl noto-sans-thai-bold text-white">{subtopic.name}</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subtopic.documents.map((doc) => {
              return (
                <Link
                  key={doc.id}
                  href={`/${params.subjectId}/${params.topicId}/${params.subtopicId}/${doc.id}`}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20 hover:bg-white/15 hover:border-pink-400 transition group"
                >
                  {/* Document Preview */}
                  {doc.documentPath && doc.documentType === 'pdf' && (
                    <div className="relative h-64">
                      <PDFPreview 
                        pdfUrl={doc.documentPath}
                        title={doc.title}
                        className="h-full w-full"
                      />
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full z-10">
                        <span className="text-gray-800 text-xs noto-sans-thai-medium">PDF</span>
                      </div>
                    </div>
                  )}
                  
                  {/* Document Info */}
                  <div className="p-6">
                    <h3 className="text-xl noto-sans-thai-semibold text-white mb-3 group-hover:text-pink-300 transition">
                      {doc.title}
                    </h3>
                    <p className="text-white/80 noto-sans-thai-regular mb-4 line-clamp-2">{doc.preview}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-white/60 text-sm noto-sans-thai-regular">อัปเดต: {doc.lastUpdated}</span>
                      <span className="text-pink-300 group-hover:text-pink-200 noto-sans-thai-medium text-sm flex items-center space-x-1">
                        <span>อ่านเพิ่มเติม</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
