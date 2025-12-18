'use client';

import { useRouter } from 'next/navigation';
import { changeLog } from '@/data/mockData';

export default function AnnouncementBar() {
  const router = useRouter();

  return (
    <div className="bg-white/18 backdrop-blur-md border-b border-white/25 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400/30 to-orange-400/30 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-yellow-200" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="text-white noto-sans-thai-medium text-base">
                อัปเดตล่าสุด: {changeLog[0].date} - {changeLog[0].announcement}
              </p>
              <p className="text-white/80 text-sm noto-sans-thai-regular">
                มีการเปลี่ยนแปลง {changeLog[0].changes.length} รายการในนโยบายและฟีเจอร์ของระบบ
              </p>
            </div>
          </div>
          <button 
            onClick={() => router.push('/changelog')}
            className="bg-gradient-to-r from-white/20 to-white/15 hover:from-white/30 hover:to-white/25 text-white px-6 py-3 rounded-xl text-sm noto-sans-thai-medium transition-all duration-300 border border-white/20 hover:border-white/40"
          >
            ดูการเปลี่ยนแปลงทั้งหมด
          </button>
        </div>


      </div>
    </div>
  );
}
