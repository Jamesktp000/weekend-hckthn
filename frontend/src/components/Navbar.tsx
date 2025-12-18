'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="bg-white/95 backdrop-blur-xl border-b border-gray-200/50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center hover:scale-105 transition-transform duration-300">
            <div className="relative w-auto h-14 flex items-center justify-center">
              <Image 
                src="/logo.png" 
                alt="เงินเกอร์โบ" 
                width={140} 
                height={56}
                className="object-contain"
                priority
              />
            </div>
          </Link>
          
          {/* Navigation items */}
          <div className="flex items-center space-x-2">
            <Link href="/" className="text-white px-4 py-3 rounded-xl text-sm noto-sans-thai-medium transition-all duration-300 shadow-md hover:shadow-lg" style={{ backgroundColor: '#1e3a8a' }}>
              หน้าหลัก
            </Link>
            <button className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 px-4 py-3 rounded-xl text-sm noto-sans-thai-medium transition-all duration-300">
              ติดต่อสำนักงานใหญ่
            </button>
            <button className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 px-4 py-3 rounded-xl text-sm noto-sans-thai-medium transition-all duration-300">
              ระบบ Jira
            </button>
            <button className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 px-4 py-3 rounded-xl text-sm noto-sans-thai-medium transition-all duration-300">
              ADHOC
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
