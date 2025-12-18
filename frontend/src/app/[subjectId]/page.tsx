import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import AnnouncementBar from '@/components/AnnouncementBar';
import SearchBar from '@/components/SearchBar';
import { topics, mainSubjects } from '@/data/mockData';

export default function SubjectPage({ params }: { params: { subjectId: string } }) {
  const subject = mainSubjects.find(s => s.id === params.subjectId);

  if (!subject) {
    notFound();
  }

  // For now, show all topics when clicking on "สื่อความสาขา"
  // You can filter topics based on subject if needed
  const displayTopics = params.subjectId === 'books' ? topics : [];

  return (
    <div className="min-h-screen" style={{
      background: 'linear-gradient(135deg, #e91e63 0%, #9c27b0 25%, #673ab7 50%, #3f51b5 75%, #1a237e 100%)'
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
          <span className="text-white">{subject.name}</span>
        </div>

        {/* Topics View */}
        <div className="space-y-6">
          <div className="mb-6">
            <Link
              href="/"
              className="text-white/80 hover:text-white mb-4 flex items-center space-x-2 noto-sans-thai-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>กลับไปหน้าหลัก</span>
            </Link>
            <h2 className="text-4xl noto-sans-thai-bold text-white flex items-center space-x-3">
              <span>
                {subject.iconType === 'book' && '📚'}
                {subject.iconType === 'ebook' && '📱'}
                {subject.iconType === 'learning' && '🎓'}
                {subject.iconType === 'shop' && '🛒'}
                {subject.iconType === 'forms' && '📝'}
              </span>
              <span>{subject.name}</span>
            </h2>
          </div>

          {displayTopics.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {displayTopics.map((topic) => (
                <Link
                  key={topic.id}
                  href={`/${params.subjectId}/${topic.id}`}
                  className="bg-white rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 group transform hover:scale-105"
                >
                  <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">{topic.icon}</div>
                  <h3 className="text-xl noto-sans-thai-semibold text-gray-800 mb-3 group-hover:text-pink-500 transition-colors">
                    {topic.name}
                  </h3>
                  <p className="text-gray-600 text-sm noto-sans-thai-regular">
                    {topic.subtopics.length} หัวข้อย่อย
                  </p>
                  <div className="mt-4 w-full h-1 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-white/80 text-xl noto-sans-thai-regular">
                ยังไม่มีข้อมูลในหมวดนี้
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
