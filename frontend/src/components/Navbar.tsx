'use client';

import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="w-full bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              {/* Replace the src with your logo path */}
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">Logo</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
