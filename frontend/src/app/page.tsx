import Link from 'next/link';
import Navbar from '@/components/Navbar';
import AnnouncementBar from '@/components/AnnouncementBar';
import SearchBar from '@/components/SearchBar';
import { topics } from '@/data/mockData';

export default function Home() {
  return (
    <div className="min-h-screen" style={{
      background: 'linear-gradient(135deg, #db2777 0%, #a855f7 35%, #6366f1 60%, #1e40af 100%)'
    }}>
      <Navbar />
      <AnnouncementBar />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SearchBar />

        {/* Main Topics View */}
        <div className="space-y-6">
          <h2 className="text-3xl noto-sans-thai-bold text-white mb-8">หมวดหมู่ทั้งหมด</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {topics.map((topic) => (
              <Link
                key={topic.id}
                href={`/${topic.id}`}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition text-center group"
              >
                <div className="text-5xl mb-4">{topic.icon}</div>
                <h3 className="text-xl noto-sans-thai-semibold text-white mb-2 group-hover:text-pink-300 transition">
                  {topic.name}
                </h3>
                <p className="text-white/70 text-sm noto-sans-thai-regular">
                  {topic.subtopics.length} หัวข้อย่อย
                </p>
              </Link>
            ))}
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition">
              <div className="w-12 h-12 bg-pink-500/30 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-white noto-sans-thai-semibold text-xl mb-2">ค้นหาเอกสารอัจฉริยะ</h3>
              <p className="text-white/80 noto-sans-thai-regular">ค้นหาในเอกสารทุกประเภทด้วยการจับคู่อัจฉริยะและการจัดอันดับความเกี่ยวข้อง</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition">
              <div className="w-12 h-12 bg-purple-500/30 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-white noto-sans-thai-semibold text-xl mb-2">ติดตามการเปลี่ยนแปลง</h3>
              <p className="text-white/80 noto-sans-thai-regular">รับทราบข้อมูลด้วยบันทึกการเปลี่ยนแปลงที่ละเอียด แสดงสิ่งที่เปลี่ยน เมื่อไหร่ และเพราะอะไร</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition">
              <div className="w-12 h-12 bg-indigo-500/30 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-white noto-sans-thai-semibold text-xl mb-2">รวดเร็วเหมือนฟ้าแลบ</h3>
              <p className="text-white/80 noto-sans-thai-regular">ได้ผลลัพธ์ทันทีด้วยเครื่องมือค้นหาและระบบแคชที่ปรับให้เหมาะสม</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
