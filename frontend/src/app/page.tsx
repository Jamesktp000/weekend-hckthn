import Navbar from '@/components/Navbar';
import AnnouncementBar from '@/components/AnnouncementBar';
import SearchBar from '@/components/SearchBar';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <AnnouncementBar />
      <SearchBar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Welcome to Your Search Portal
          </h1>
          <p className="text-xl text-white/80">
            Search across all your documents, announcements, and policies with intelligent matching
          </p>
        </div>

        {/* Content area - Add your search results or other content here */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20">
          <h2 className="text-2xl font-semibold text-white mb-4">Recent Updates</h2>
          <p className="text-white/70">
            Your search results and content will appear here...
          </p>
        </div>
      </main>
    </div>
  );
}
