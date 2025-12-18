'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import AnnouncementBar from '@/components/AnnouncementBar';
import SearchBar from '@/components/SearchBar';
import { getDocumentById } from '@/data/mockData';

function CompareContent() {
  const searchParams = useSearchParams();
  const docId = searchParams.get('doc');
  const topicId = searchParams.get('topic');
  const subtopicId = searchParams.get('subtopic');
  const v1Param = searchParams.get('v1');
  const v2Param = searchParams.get('v2');
  
  // Use URL parameters if available, otherwise default to [0, 1]
  const initialV1 = v1Param ? parseInt(v1Param) : 0;
  const initialV2 = v2Param ? parseInt(v2Param) : 1;
  const [selectedVersions, setSelectedVersions] = useState<[number, number]>([initialV1, initialV2]);

  // Update selected versions when URL parameters change
  useEffect(() => {
    if (v1Param && v2Param) {
      setSelectedVersions([parseInt(v1Param), parseInt(v2Param)]);
    }
  }, [v1Param, v2Param]);

  if (!docId || !topicId || !subtopicId) {
    return (
      <div className="text-center text-white">
        <p className="text-xl noto-sans-thai-medium">กรุณาเลือกเอกสารเพื่อเปรียบเทียบ</p>
        <Link href="/" className="text-pink-300 hover:text-pink-200 mt-4 inline-block">
          กลับไปหน้าหลัก
        </Link>
      </div>
    );
  }

  const document = getDocumentById(topicId, subtopicId, docId);

  if (!document || !document.versions || document.versions.length < 2) {
    return (
      <div className="text-center text-white">
        <p className="text-xl noto-sans-thai-medium">ไม่มีเวอร์ชันเพื่อเปรียบเทียบ</p>
        <Link href={`/${topicId}/${subtopicId}/${docId}`} className="text-pink-300 hover:text-pink-200 mt-4 inline-block">
          กลับไปดูเอกสาร
        </Link>
      </div>
    );
  }

  const currentVersion = document.versions[selectedVersions[0]];
  const compareVersion = document.versions[selectedVersions[1]];

  // Get changelog between selected versions
  const changesLog = document.changelog?.filter((_log, index) => 
    index >= selectedVersions[0] && index < selectedVersions[1]
  ) || [];

  return (
    <>
      {/* Breadcrumb */}
      <div className="mb-8 flex items-center space-x-2 text-white/80">
        <Link href="/" className="hover:text-white transition">
          หน้าหลัก
        </Link>
        <span>/</span>
        <Link href={`/${topicId}`} className="hover:text-white transition">
          {topicId}
        </Link>
        <span>/</span>
        <Link href={`/${topicId}/${subtopicId}`} className="hover:text-white transition">
          {subtopicId}
        </Link>
        <span>/</span>
        <Link href={`/${topicId}/${subtopicId}/${docId}`} className="hover:text-white transition">
          {document.title}
        </Link>
        <span>/</span>
        <span className="text-white">เปรียบเทียบเวอร์ชัน</span>
      </div>

      {/* Version Comparison */}
      <div className="space-y-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl noto-sans-thai-bold text-white">เปรียบเทียบเวอร์ชัน</h2>
          <Link
            href={`/${topicId}/${subtopicId}/${docId}`}
            className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg noto-sans-thai-medium transition"
          >
            ปิดการเปรียบเทียบ
          </Link>
        </div>

        {/* Version Selectors */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <h3 className="text-xl noto-sans-thai-semibold text-white mb-4">เลือกเวอร์ชันที่ต้องการเปรียบเทียบ</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white/80 noto-sans-thai-medium mb-2">เวอร์ชันใหม่</label>
              <select
                value={selectedVersions[0]}
                onChange={(e) => setSelectedVersions([parseInt(e.target.value), selectedVersions[1]])}
                className="w-full bg-white/10 border border-white/20 text-white rounded-lg px-4 py-3 noto-sans-thai-regular focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                {document.versions.map((version, index) => (
                  <option key={index} value={index} className="bg-gray-800">
                    Version {version.version} - {version.date}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-white/80 noto-sans-thai-medium mb-2">เวอร์ชันเก่า</label>
              <select
                value={selectedVersions[1]}
                onChange={(e) => setSelectedVersions([selectedVersions[0], parseInt(e.target.value)])}
                className="w-full bg-white/10 border border-white/20 text-white rounded-lg px-4 py-3 noto-sans-thai-regular focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                {document.versions.map((version, index) => (
                  <option key={index} value={index} className="bg-gray-800">
                    Version {version.version} - {version.date}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Side by Side Comparison */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* New Version */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden">
            <div className="bg-green-500/20 border-b border-green-500/30 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl noto-sans-thai-semibold text-white">Version {currentVersion.version}</h3>
                  <p className="text-white/70 text-sm noto-sans-thai-regular">{currentVersion.date} โดย {currentVersion.author}</p>
                </div>
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm noto-sans-thai-medium">
                  ใหม่
                </span>
              </div>
            </div>
            {currentVersion.documentUrl && (
              <div className="p-4">
                <iframe
                  src={`/documents${currentVersion.documentUrl}#toolbar=1`}
                  className="w-full rounded-lg"
                  style={{ height: '600px' }}
                  title={`Version ${currentVersion.version}`}
                />
                <a
                  href={`/documents${currentVersion.documentUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex items-center justify-center space-x-2 bg-green-500/20 hover:bg-green-500/30 text-green-200 px-4 py-2 rounded-lg noto-sans-thai-medium transition"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>ดาวน์โหลด Version {currentVersion.version}</span>
                </a>
              </div>
            )}
          </div>

          {/* Old Version */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden">
            <div className="bg-red-500/20 border-b border-red-500/30 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl noto-sans-thai-semibold text-white">Version {compareVersion.version}</h3>
                  <p className="text-white/70 text-sm noto-sans-thai-regular">{compareVersion.date} โดย {compareVersion.author}</p>
                </div>
                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm noto-sans-thai-medium">
                  เก่า
                </span>
              </div>
            </div>
            {compareVersion.documentUrl && (
              <div className="p-4">
                <iframe
                  src={`/documents${compareVersion.documentUrl}#toolbar=1`}
                  className="w-full rounded-lg"
                  style={{ height: '600px' }}
                  title={`Version ${compareVersion.version}`}
                />
                <a
                  href={`/documents${compareVersion.documentUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex items-center justify-center space-x-2 bg-red-500/20 hover:bg-red-500/30 text-red-200 px-4 py-2 rounded-lg noto-sans-thai-medium transition"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>ดาวน์โหลด Version {compareVersion.version}</span>
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Changes Highlight */}
        {changesLog.length > 0 && (
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl noto-sans-thai-semibold text-white mb-6">รายการการเปลี่ยนแปลง</h3>
            <div className="space-y-4">
              {changesLog.map((log, logIndex) => (
                <div key={logIndex} className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <span className="bg-blue-500/30 text-blue-200 px-3 py-1 rounded-full text-sm noto-sans-thai-medium">
                        Version {log.version}
                      </span>
                      <span className="text-white/70 noto-sans-thai-regular">{log.date}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {log.changes.map((change, changeIndex) => (
                      <div 
                        key={changeIndex} 
                        className={`rounded-lg p-4 border ${
                          change.type === 'added' ? 'bg-green-500/10 border-green-500/30' :
                          change.type === 'modified' ? 'bg-blue-500/10 border-blue-500/30' :
                          'bg-red-500/10 border-red-500/30'
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`mt-1 px-2 py-1 rounded text-xs noto-sans-thai-medium ${
                            change.type === 'added' ? 'bg-green-500/20 text-green-300' :
                            change.type === 'modified' ? 'bg-blue-500/20 text-blue-300' :
                            'bg-red-500/20 text-red-300'
                          }`}>
                            {change.type === 'added' ? '+ เพิ่ม' : change.type === 'modified' ? '~ แก้ไข' : '- ลบ'}
                          </div>
                          <div className="flex-1">
                            <p className="text-white noto-sans-thai-semibold mb-1">{change.field}</p>
                            <p className="text-white/80 noto-sans-thai-regular text-sm mb-2">{change.description}</p>
                            {change.before && change.after && (
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                                <div className="bg-red-500/10 rounded p-3 border border-red-500/20">
                                  <div className="flex items-center space-x-2 mb-1">
                                    <span className="text-red-300 text-xs noto-sans-thai-medium">- ก่อน:</span>
                                  </div>
                                  <span className="text-white/70 text-sm noto-sans-thai-regular">{change.before}</span>
                                </div>
                                <div className="bg-green-500/10 rounded p-3 border border-green-500/20">
                                  <div className="flex items-center space-x-2 mb-1">
                                    <span className="text-green-300 text-xs noto-sans-thai-medium">+ หลัง:</span>
                                  </div>
                                  <span className="text-white/70 text-sm noto-sans-thai-regular">{change.after}</span>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default function ComparePage() {
  return (
    <div className="min-h-screen" style={{
      background: 'linear-gradient(135deg, #db2777 0%, #a855f7 35%, #6366f1 60%, #1e40af 100%)'
    }}>
      <Navbar />
      <AnnouncementBar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SearchBar />
        <Suspense fallback={<div className="text-white text-center">กำลังโหลด...</div>}>
          <CompareContent />
        </Suspense>
      </main>
    </div>
  );
}
