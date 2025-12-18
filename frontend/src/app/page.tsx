import Link from 'next/link';
import Navbar from '@/components/Navbar';
import AnnouncementBar from '@/components/AnnouncementBar';
import SearchBar from '@/components/SearchBar';
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
                className="bg-white/12 backdrop-blur-md rounded-3xl p-8 border border-white/25 hover:bg-white/20 hover:border-white/40 transition-all duration-300 text-center group transform hover:scale-105 hover:shadow-2xl"
              >
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">{topic.icon}</div>
                <h3 className="text-xl noto-sans-thai-semibold text-white mb-3 group-hover:text-pink-200 transition-colors">
                  {topic.name}
                </h3>
                <p className="text-white/70 text-sm noto-sans-thai-regular">
                  {topic.subtopics.length} หัวข้อย่อย
                </p>
                <div className="mt-4 w-full h-1 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            ))}
          </div>

          {/* Enhanced Feature Cards */}
          <div className="mt-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl noto-sans-thai-bold text-white mb-4">ฟีเจอร์เด่น</h2>
              <p className="text-lg text-white/80 noto-sans-thai-regular">เทคโนโลยีที่ทำให้การค้นหาของคุณแม่นยำและรวดเร็ว</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/25 hover:border-white/40 transition-all duration-300 group hover:shadow-2xl">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500/40 to-pink-600/40 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-white noto-sans-thai-semibold text-2xl mb-4">ค้นหาเอกสารอัจฉริยะ</h3>
                <p className="text-white/80 noto-sans-thai-regular leading-relaxed">ค้นหาในเอกสารทุกประเภทด้วยการจับคู่อัจฉริยะและการจัดอันดับความเกี่ยวข้อง</p>
              </div>

              <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/25 hover:border-white/40 transition-all duration-300 group hover:shadow-2xl">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500/40 to-purple-600/40 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-white noto-sans-thai-semibold text-2xl mb-4">ติดตามการเปลี่ยนแปลง</h3>
                <p className="text-white/80 noto-sans-thai-regular leading-relaxed">รับทราบข้อมูลด้วยบันทึกการเปลี่ยนแปลงที่ละเอียด แสดงสิ่งที่เปลี่ยน เมื่อไหร่ และเพราะอะไร</p>
              </div>

              <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/25 hover:border-white/40 transition-all duration-300 group hover:shadow-2xl">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500/40 to-indigo-600/40 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-white noto-sans-thai-semibold text-2xl mb-4">รวดเร็วเหมือนฟ้าแลบ</h3>
                <p className="text-white/80 noto-sans-thai-regular leading-relaxed">ได้ผลลัพธ์ทันทีด้วยเครื่องมือค้นหาและระบบแคชที่ปรับให้เหมาะสม</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
