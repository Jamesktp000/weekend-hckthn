'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="bg-white/12 backdrop-blur-xl border-b border-white/25 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center hover:scale-105 transition-transform duration-300">
            <div className="relative w-auto h-14 flex items-center justify-center">
              <Image 
                src="/logo.svg" 
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
            <Link href="/" className="text-white/90 hover:text-white hover:bg-white/15 px-4 py-3 rounded-xl text-sm noto-sans-thai-medium transition-all duration-300">
              หน้าหลัก
            </Link>
            <button className="text-white/90 hover:text-white hover:bg-white/15 px-4 py-3 rounded-xl text-sm noto-sans-thai-medium transition-all duration-300">
              ติดต่อสำนักงานใหญ่
            </button>
            <button className="text-white/90 hover:text-white hover:bg-white/15 px-4 py-3 rounded-xl text-sm noto-sans-thai-medium transition-all duration-300">
              ระบบ Jira
            </button>
            <button className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-white hover:from-pink-500/30 hover:to-purple-500/30 border border-white/30 hover:border-white/50 px-4 py-3 rounded-xl text-sm noto-sans-thai-medium transition-all duration-300">
              ADHOC
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
