'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">LOGO</span>
            </div>
            <span className="ml-3 text-white noto-sans-thai-semibold text-lg">แบรนด์ของคุณ</span>
          </Link>
          
          {/* Navigation items */}
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-white/90 hover:text-white px-3 py-2 rounded-md text-sm noto-sans-thai-medium transition">
              หน้าหลัก
            </Link>
            <button className="text-white/90 hover:text-white px-3 py-2 rounded-md text-sm noto-sans-thai-medium transition">
              เกี่ยวกับเรา
            </button>
            <button className="text-white/90 hover:text-white px-3 py-2 rounded-md text-sm noto-sans-thai-medium transition">
              ติดต่อเรา
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
