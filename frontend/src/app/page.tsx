import Navbar from '@/components/Navbar';
import AnnouncementBar from '@/components/AnnouncementBar';
import SearchBar from '@/components/SearchBar';
import FeaturesSection from '@/components/FeaturesSection';

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

        {/* Main Content */}
        <div className="space-y-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl noto-sans-thai-bold text-white mb-4">เลือกสาขา</h2>
            <p className="text-lg text-white/80 noto-sans-thai-regular">เลือกสาขาที่คุณสนใจเพื่อเริ่มต้นการค้นหา</p>
          </div>

          <FeaturesSection />
        </div>
      </main>
    </div>
  );
}
