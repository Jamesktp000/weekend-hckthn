'use client';

import { changeLog, ChangeLogEntry } from '@/data/mockData';
import Link from 'next/link';

export default function ChangelogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/"
            className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            กลับสู่หน้าหลัก
          </Link>
          <h1 className="text-4xl font-bold text-white noto-sans-thai-bold mb-2">
            ประวัติการเปลี่ยนแปลงทั้งหมด
          </h1>
          <p className="text-white/80 noto-sans-thai-regular">
            ติดตามการอัปเดตและการเปลี่ยนแปลงของระบบทั้งหมด
          </p>
        </div>

        {/* Changelog Entries */}
        <div className="space-y-6">
          {changeLog.map((log: ChangeLogEntry, index: number) => (
            <div key={index} className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl text-white noto-sans-thai-semibold">{log.announcement}</h2>
                <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm noto-sans-thai-regular">
                  {log.date}
                </span>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-white/90 noto-sans-thai-medium mb-3">
                  รายการเปลี่ยนแปลง ({log.changes.length} รายการ)
                </h3>
                {log.changes.map((change: { field: string; from: string; to: string }, changeIndex: number) => (
                  <div key={changeIndex} className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <h4 className="text-white noto-sans-thai-medium mb-3">{change.field}</h4>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                        <span className="text-red-300 noto-sans-thai-medium text-sm">เดิม: </span>
                        <p className="text-white/90 noto-sans-thai-regular mt-1">{change.from}</p>
                      </div>
                      <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                        <span className="text-green-300 noto-sans-thai-medium text-sm">ใหม่: </span>
                        <p className="text-white/90 noto-sans-thai-regular mt-1">{change.to}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-white/60 noto-sans-thai-regular">
            หากมีคำถามเกี่ยวกับการเปลี่ยนแปลงใดๆ กรุณาติดต่อทีมงาน
          </p>
        </div>
      </div>
    </div>
  );
}