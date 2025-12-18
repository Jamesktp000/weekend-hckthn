import Link from 'next/link';
import Navbar from '@/components/Navbar';
import AnnouncementBar from '@/components/AnnouncementBar';
import SearchBar from '@/components/SearchBar';
import FeaturesSection from '@/components/FeaturesSection';
import { topics } from '@/data/mockData';

export default function Home() {
  return (
    <div className="min-h-screen" style={{
      background: 'linear-gradient(135deg, #e91e63 0%, #9c27b0 25%, #673ab7 50%, #3f51b5 75%, #1a237e 100%)'
    }}>
      <Navbar />
      <AnnouncementBar />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SearchBar />

        {/* Main Topics View */}
        <div className="space-y-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl noto-sans-thai-bold text-white mb-4">หมวดหมู่ทั้งหมด</h2>
            <p className="text-lg text-white/80 noto-sans-thai-regular">เลือกหมวดหมู่ที่คุณสนใจเพื่อเริ่มต้นการค้นหา</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {topics.map((topic) => (
              <Link
                key={topic.id}
                href={`/${topic.id}`}
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

          <FeaturesSection />
        </div>
      </main>
    </div>
  );
}
