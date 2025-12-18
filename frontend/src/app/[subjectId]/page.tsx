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

  // Function to get SVG icon based on topic icon emoji
  const getTopicIcon = (iconEmoji: string) => {
    switch (iconEmoji) {
      case '🚗':
        return (
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.22.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
          </svg>
        );
      case '🛡️':
        return (
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        );
      case '📈':
        return (
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        );
      case '🏆':
        return (
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        );
      case '👥':
        return (
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
        );
      case '📋':
        return (
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
        );
      case '📢':
        return (
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
          </svg>
        );
      case '💰':
        return (
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case '📚':
        return (
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
      case '❓':
        return (
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return (
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        );
    }
  };

  // Function to get gradient color for each topic
  const getTopicGradient = (topicId: string) => {
    const gradients = {
      'product': 'from-pink-500/40 to-pink-600/40',
      'insurance': 'from-purple-500/40 to-purple-600/40',
      'kpi': 'from-indigo-500/40 to-indigo-600/40',
      'campaign': 'from-blue-500/40 to-blue-600/40',
      'hr': 'from-cyan-500/40 to-cyan-600/40',
      'operation': 'from-teal-500/40 to-teal-600/40',
      'marketing': 'from-green-500/40 to-green-600/40',
      'accounting': 'from-yellow-500/40 to-yellow-600/40',
      'knowledge': 'from-orange-500/40 to-orange-600/40',
      'faq': 'from-red-500/40 to-red-600/40'
    };
    return gradients[topicId as keyof typeof gradients] || 'from-gray-500/40 to-gray-600/40';
  };

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
            <h2 className="text-4xl noto-sans-thai-bold text-white flex items-center space-x-3">
              <span>{subject.name}</span>
            </h2>
          </div>

          {displayTopics.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {displayTopics.map((topic) => (
                <Link
                  key={topic.id}
                  href={`/${params.subjectId}/${topic.id}`}
                  className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/25 hover:border-white/40 transition-all duration-300 group hover:shadow-2xl transform hover:scale-105 cursor-pointer"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${getTopicGradient(topic.id)} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {getTopicIcon(topic.icon)}
                  </div>
                  <h3 className="text-white noto-sans-thai-semibold text-2xl mb-4 group-hover:text-pink-300 transition-colors">
                    {topic.name}
                  </h3>
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
