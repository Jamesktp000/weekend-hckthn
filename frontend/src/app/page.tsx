import Navbar from '@/components/Navbar';
import AnnouncementBar from '@/components/AnnouncementBar';
import SearchBar from '@/components/SearchBar';
import FeaturesSection from '@/components/FeaturesSection';

export default function Home() {
  return (
    <div className="min-h-screen" style={{
      background: 'linear-gradient(135deg, #be185d 0%, #7c2d92 25%, #4c1d95 50%, #1e3a8a 75%, #0f172a 100%)'
    }}>
      <Navbar />
      <AnnouncementBar />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SearchBar />

        {/* Main Content */}
        <div className="space-y-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl noto-sans-thai-bold text-white mb-4">เลือกหมวดหมู่</h2>
            <p className="text-lg text-white/80 noto-sans-thai-regular">เลือกหมวดหมู่ที่คุณสนใจเพื่อเริ่มต้นการค้นหาข้อมูล</p>
          </div>

          <FeaturesSection />
        </div>
      </main>
    </div>
  );
}
