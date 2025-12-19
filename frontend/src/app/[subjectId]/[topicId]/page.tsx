import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import AnnouncementBar from '@/components/AnnouncementBar';
import SearchBar from '@/components/SearchBar';
import { getTopicById, mainSubjects } from '@/data/mockData';

export default function TopicPage({ params }: { params: { subjectId: string; topicId: string } }) {
  const subject = mainSubjects.find(s => s.id === params.subjectId);
  const topic = getTopicById(params.topicId);

  if (!topic || !subject) {
    notFound();
  }

  return (
    <div className="min-h-screen" style={{
      background: 'linear-gradient(135deg, #be185d 0%, #7c2d92 25%, #4c1d95 50%, #1e3a8a 75%, #0f172a 100%)'
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
          <span className="text-white">{topic.name}</span>
        </div>

        {/* Subtopics View */}
        <div className="space-y-6">
          <div className="mb-6">
            <h2 className="text-4xl noto-sans-thai-bold text-white flex items-center space-x-3">
              <span>{topic.icon}</span>
              <span>{topic.name}</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topic.subtopics.map((subtopic) => (
              <Link
                key={subtopic.id}
                href={`/${params.subjectId}/${topic.id}/${subtopic.id}`}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition text-left group"
              >
                <h3 className="text-2xl noto-sans-thai-semibold text-white mb-3 group-hover:text-pink-300 transition">
                  {subtopic.name}
                </h3>
                <p className="text-white/70 noto-sans-thai-regular mb-4">
                  {subtopic.documents.length} เอกสาร
                </p>
                <div className="flex items-center text-pink-300 noto-sans-thai-medium">
                  <span>ดูเอกสาร</span>
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
