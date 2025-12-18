'use client';

import { useState } from 'react';

interface Topic {
  id: string;
  name: string;
  icon: string;
  subtopics: Subtopic[];
}

interface Subtopic {
  id: string;
  name: string;
  documents: Document[];
}

interface Document {
  id: string;
  title: string;
  preview: string;
  lastUpdated: string;
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState<Subtopic | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);

  // Mock data ตามรูป
  const topics: Topic[] = [
    {
      id: 'product',
      name: 'ผลิตภัณฑ์',
      icon: '🚗',
      subtopics: [
        {
          id: 'car-insurance',
          name: 'ประกันรถยนต์',
          documents: [
            { id: 'doc1', title: 'ประกันภัยรถยนต์ชั้น 1', preview: 'ความคุ้มครองแบบเต็มรูปแบบ รวมถึงความเสียหายต่อรถยนต์ของคุณเอง...', lastUpdated: '15 ธ.ค. 2567' },
            { id: 'doc2', title: 'ประกันภัยรถยนต์ชั้น 2+', preview: 'ความคุ้มครองรถยนต์สูญหาย ไฟไหม้ และความเสียหายจากอุบัติเหตุ...', lastUpdated: '10 ธ.ค. 2567' }
          ]
        },
        {
          id: 'health-insurance',
          name: 'ประกันสุขภาพ',
          documents: [
            { id: 'doc3', title: 'แผนประกันสุขภาพพื้นฐาน', preview: 'ความคุ้มครองค่ารักษาพยาบาลในโรงพยาบาลรัฐและเอกชน...', lastUpdated: '12 ธ.ค. 2567' }
          ]
        }
      ]
    },
    {
      id: 'insurance',
      name: 'ประกัน',
      icon: '🛡️',
      subtopics: [
        {
          id: 'claim-process',
          name: 'ขั้นตอนการเคลม',
          documents: [
            { id: 'doc4', title: 'วิธีการยื่นเคลมประกันรถยนต์', preview: 'ขั้นตอนที่ 1: แจ้งเหตุภายใน 24 ชั่วโมง ขั้นตอนที่ 2: เตรียมเอกสาร...', lastUpdated: '18 ธ.ค. 2567' }
          ]
        }
      ]
    },
    {
      id: 'kpi',
      name: 'KPI & Incentive',
      icon: '📈',
      subtopics: [
        {
          id: 'sales-kpi',
          name: 'เป้าหมายการขาย',
          documents: [
            { id: 'doc5', title: 'KPI ประจำเดือน ธันวาคม 2567', preview: 'เป้าหมายการขายรวม 1,000,000 บาท แบ่งเป็นประกันรถยนต์ 60%...', lastUpdated: '1 ธ.ค. 2567' }
          ]
        }
      ]
    },
    {
      id: 'campaign',
      name: 'Campaign',
      icon: '🏆',
      subtopics: [
        {
          id: 'promo',
          name: 'โปรโมชั่นปัจจุบัน',
          documents: [
            { id: 'doc6', title: 'แคมเปญปีใหม่ 2568', preview: 'ส่วนลดพิเศษ 20% สำหรับประกันรถยนต์ทุกชั้น...', lastUpdated: '15 ธ.ค. 2567' }
          ]
        }
      ]
    },
    {
      id: 'hr',
      name: 'HR',
      icon: '👥',
      subtopics: [
        {
          id: 'leave',
          name: 'การลางาน',
          documents: [
            { id: 'doc7', title: 'นโยบายการลางาน', preview: 'พนักงานมีสิทธิ์ลาพักร้อนปีละ 10 วัน ลาป่วยปีละ 30 วัน...', lastUpdated: '1 ม.ค. 2567' }
          ]
        }
      ]
    },
    {
      id: 'operation',
      name: 'Operation',
      icon: '📋',
      subtopics: [
        {
          id: 'daily-ops',
          name: 'การดำเนินงานประจำวัน',
          documents: [
            { id: 'doc8', title: 'คู่มือการทำงานประจำวัน', preview: 'เวลาเข้างาน 9:00 น. ตรวจสอบอีเมลและงานค้าง...', lastUpdated: '5 ธ.ค. 2567' }
          ]
        }
      ]
    },
    {
      id: 'marketing',
      name: 'การตลาด',
      icon: '📢',
      subtopics: [
        {
          id: 'social-media',
          name: 'โซเชียลมีเดีย',
          documents: [
            { id: 'doc9', title: 'แผนการตลาดโซเชียล Q1 2568', preview: 'โพสต์ Facebook วันละ 2 ครั้ง Instagram Stories ทุกวัน...', lastUpdated: '10 ธ.ค. 2567' }
          ]
        }
      ]
    },
    {
      id: 'accounting',
      name: 'บัญชี',
      icon: '💰',
      subtopics: [
        {
          id: 'expense',
          name: 'การเบิกค่าใช้จ่าย',
          documents: [
            { id: 'doc10', title: 'วิธีการเบิกค่าใช้จ่าย', preview: 'กรอกแบบฟอร์มเบิกค่าใช้จ่าย แนบใบเสร็จต้นฉบับ...', lastUpdated: '3 ธ.ค. 2567' }
          ]
        }
      ]
    },
    {
      id: 'knowledge',
      name: 'สื่อความรู้',
      icon: '📚',
      subtopics: [
        {
          id: 'training',
          name: 'คอร์สอบรม',
          documents: [
            { id: 'doc11', title: 'หลักสูตรการขายประกัน', preview: 'เทคนิคการขายประกันสำหรับมือใหม่ 10 บทเรียน...', lastUpdated: '8 ธ.ค. 2567' }
          ]
        }
      ]
    },
    {
      id: 'faq',
      name: 'รู้เรื่องไม่?',
      icon: '❓',
      subtopics: [
        {
          id: 'common-questions',
          name: 'คำถามที่พบบ่อย',
          documents: [
            { id: 'doc12', title: 'FAQ ทั่วไป', preview: 'Q: ประกันรถยนต์ชั้น 1 คืออะไร? A: เป็นประกันที่ให้ความคุ้มครองแบบเต็มรูปแบบ...', lastUpdated: '14 ธ.ค. 2567' }
          ]
        }
      ]
    }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  const handleTopicClick = (topic: Topic) => {
    setSelectedTopic(topic);
    setSelectedSubtopic(null);
    setSelectedDocument(null);
  };

  const handleSubtopicClick = (subtopic: Subtopic) => {
    setSelectedSubtopic(subtopic);
    setSelectedDocument(subtopic.documents[0] || null);
  };

  const handleBackToTopics = () => {
    setSelectedTopic(null);
    setSelectedSubtopic(null);
    setSelectedDocument(null);
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
              <span className="ml-3 text-white font-semibold text-lg">แบรนด์ของคุณ</span>
            </div>
            
            {/* Navigation items */}
            <div className="flex items-center space-x-4">
              <button className="text-white/90 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition">
                หน้าหลัก
              </button>
              <button className="text-white/90 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition">
                เกี่ยวกับเรา
              </button>
              <button className="text-white/90 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition">
                ติดต่อเรา
              </button>
            </div>
          </div>
        </div>
      </nav>



      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section with Search */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            ค้นหาสิ่งที่คุณต้องการ
          </h1>
          <p className="text-xl text-white/90 mb-8">
            ค้นหาอัจฉริยะในเอกสาร นโยบาย และประกาศทั้งหมดของคุณ
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
                placeholder="ค้นหาเอกสาร นโยบาย หรือถามคำถาม..."
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
