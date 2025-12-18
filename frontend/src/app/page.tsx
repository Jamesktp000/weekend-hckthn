'use client';

import { useState } from 'react';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showChangeLog, setShowChangeLog] = useState(false);

  // ข้อมูลตัวอย่างการเปลี่ยนแปลง - คุณสามารถแทนที่ด้วยข้อมูลจริงจากแบ็กเอนด์ของคุณ
  const changeLog = [
    {
      date: '15 มกราคม 2567',
      announcement: 'การอัปเดตนโยบาย #2024-001',
      changes: [
        { field: 'นโยบายความเป็นส่วนตัว', from: 'เก็บข้อมูลเป็นเวลา 90 วัน', to: 'เก็บข้อมูลเป็นเวลา 180 วัน' },
        { field: 'ข้อกำหนดการใช้งาน', from: 'มาตรา 4.2 - ความรับผิดชอบของผู้ใช้', to: 'มาตรา 4.2 - ความรับผิดชอบของผู้ใช้ที่เพิ่มเติมพร้อมแนวทางใหม่' }
      ]
    },
    {
      date: '10 มกราคม 2567',
      announcement: 'การอัปเดตระบบ #2024-002',
      changes: [
        { field: 'อัลกอริทึมการค้นหา', from: 'การจับคู่คำหลักพื้นฐาน', to: 'การค้นหาความหมายด้วย AI ที่ทนต่อการพิมพ์ผิด' }
      ]
    }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement your search logic here
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="min-h-screen" style={{
      background: 'linear-gradient(135deg, #db2777 0%, #a855f7 35%, #6366f1 60%, #1e40af 100%)'
    }}>
      {/* Navbar */}
      <nav className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo - Replace the src with your actual logo path */}
            <div className="flex items-center">
              <div className="relative w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                {/* Placeholder for logo - replace with your actual logo */}
                <span className="text-white font-bold text-xl">LOGO</span>
                {/* Uncomment and use this when you have your logo:
                <Image 
                  src="/logo.png" 
                  alt="Logo" 
                  width={48} 
                  height={48}
                  className="object-contain"
                />
                */}
              </div>
              <span className="ml-3 text-white font-semibold text-lg">Your Brand</span>
            </div>
            
            {/* Navigation items */}
            <div className="flex items-center space-x-4">
              <button className="text-white/90 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition">
                Home
              </button>
              <button className="text-white/90 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition">
                About
              </button>
              <button className="text-white/90 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition">
                Contact
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Announcement Bar - Change Awareness */}
      <div className="bg-white/15 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <svg className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-white font-medium">
                  Latest Update: {changeLog[0].date} - {changeLog[0].announcement}
                </p>
                <p className="text-white/80 text-sm">
                  {changeLog[0].changes.length} change(s) made to system policies and features
                </p>
              </div>
            </div>
            <button 
              onClick={() => setShowChangeLog(!showChangeLog)}
              className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
            >
              {showChangeLog ? 'Hide' : 'View'} All Changes
            </button>
          </div>

          {/* Change Log Details */}
          {showChangeLog && (
            <div className="mt-4 bg-white/10 rounded-lg p-4 space-y-4">
              <h3 className="text-white font-semibold text-lg mb-3">Complete Change History</h3>
              {changeLog.map((log, index) => (
                <div key={index} className="bg-white/10 rounded-lg p-4 border border-white/20">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white font-medium">{log.announcement}</h4>
                    <span className="text-white/70 text-sm">{log.date}</span>
                  </div>
                  <div className="space-y-2">
                    {log.changes.map((change, changeIndex) => (
                      <div key={changeIndex} className="bg-white/5 rounded p-3">
                        <p className="text-white/90 font-medium mb-1">{change.field}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="text-red-300 font-medium">From: </span>
                            <span className="text-white/80">{change.from}</span>
                          </div>
                          <div>
                            <span className="text-green-300 font-medium">To: </span>
                            <span className="text-white/80">{change.to}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section with Search */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Find What You Need
          </h1>
          <p className="text-xl text-white/90 mb-8">
            Intelligent search across all your documents, policies, and announcements
          </p>

          {/* Advanced Search Bar */}
          <form onSubmit={handleSearch} className="max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for documents, policies, or ask a question..."
                className="w-full pl-12 pr-32 py-5 rounded-2xl bg-white/95 backdrop-blur-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/50 text-lg shadow-2xl"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-medium transition shadow-lg"
              >
                Search
              </button>
            </div>
          </form>

          {/* Search Features */}
          <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm text-white/80">
            <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Typo Tolerant</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Semantic Search</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Multi-Format (Text, PDF, Images)</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Natural Language</span>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition">
            <div className="w-12 h-12 bg-pink-500/30 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-white font-semibold text-xl mb-2">Smart Document Search</h3>
            <p className="text-white/80">Search across all document types with intelligent matching and relevance ranking.</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition">
            <div className="w-12 h-12 bg-purple-500/30 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-white font-semibold text-xl mb-2">Change Tracking</h3>
            <p className="text-white/80">Stay informed with detailed change logs showing what changed, when, and why.</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition">
            <div className="w-12 h-12 bg-indigo-500/30 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-white font-semibold text-xl mb-2">Lightning Fast</h3>
            <p className="text-white/80">Get instant results with our optimized search engine and caching system.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
