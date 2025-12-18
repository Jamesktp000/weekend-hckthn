import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import AnnouncementBar from '@/components/AnnouncementBar';
import SearchBar from '@/components/SearchBar';
import { getDocumentById, getSubtopicById } from '@/data/mockData';

export default function DocumentPage({ 
  params 
}: { 
  params: { topicId: string; subtopicId: string; documentId: string } 
}) {
  const document = getDocumentById(params.topicId, params.subtopicId, params.documentId);
  const subtopic = getSubtopicById(params.topicId, params.subtopicId);

  if (!document || !subtopic) {
    notFound();
  }

  const relatedDocuments = subtopic.documents.filter(doc => doc.id !== document.id);

  return (
    <div className="min-h-screen" style={{
      background: 'linear-gradient(135deg, #db2777 0%, #a855f7 35%, #6366f1 60%, #1e40af 100%)'
    }}>
      <Navbar />
      <AnnouncementBar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SearchBar />

        {/* Breadcrumb */}
        <div className="mb-8 flex items-center space-x-2 text-white/80">
          <Link href="/" className="hover:text-white transition">
            หน้าหลัก
          </Link>
          <span>/</span>
          <Link href={`/${params.topicId}`} className="hover:text-white transition">
            {params.topicId}
          </Link>
          <span>/</span>
          <Link href={`/${params.topicId}/${params.subtopicId}`} className="hover:text-white transition">
            {subtopic.name}
          </Link>
          <span>/</span>
          <span className="text-white">{document.title}</span>
        </div>

        {/* Document Detail View */}
        <div className="space-y-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <Link
                href={`/${params.topicId}/${params.subtopicId}`}
                className="text-white/80 hover:text-white mb-4 flex items-center space-x-2 noto-sans-thai-medium"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>กลับไปรายการเอกสาร</span>
              </Link>
              <h2 className="text-4xl noto-sans-thai-bold text-white mb-2">{document.title}</h2>
              <p className="text-white/70 noto-sans-thai-regular">อัปเดตล่าสุด: {document.lastUpdated}</p>
            </div>
            <Link
              href={`/compare?docs=${document.id}&topic=${params.topicId}&subtopic=${params.subtopicId}`}
              className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-lg noto-sans-thai-medium transition flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <span>เพิ่มเพื่อเปรียบเทียบ</span>
            </Link>
          </div>

          {/* Document Content */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl noto-sans-thai-semibold text-white mb-6">เนื้อหาเอกสาร</h3>
            
            {/* PDF Viewer or Document Content */}
            {document.documentPath && document.documentType === 'pdf' ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-white/70 noto-sans-thai-regular">
                    ดาวน์โหลดหรือเปิดเอกสารเพื่อดูเนื้อหาแบบเต็ม
                  </p>
                  <a
                    href={`/documents${document.documentPath}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg noto-sans-thai-medium transition flex items-center space-x-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>ดาวน์โหลด PDF</span>
                  </a>
                </div>
                
                {/* PDF Embed Viewer */}
                <div className="w-full bg-white rounded-lg overflow-hidden" style={{ height: '800px' }}>
                  <iframe
                    src={`/documents${document.documentPath}#toolbar=1&navpanes=1`}
                    className="w-full h-full"
                    title={document.title}
                  />
                </div>
              </div>
            ) : (
              <div className="prose prose-invert max-w-none">
                {document.fullContent ? (
                  <div className="text-white/90 noto-sans-thai-regular leading-relaxed whitespace-pre-wrap">
                    {document.fullContent}
                  </div>
                ) : (
                  <p className="text-white/90 noto-sans-thai-regular text-lg leading-relaxed">
                    {document.preview}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Document Changelog */}
          {document.changelog && document.changelog.length > 0 && (
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 mt-6">
              <h3 className="text-2xl noto-sans-thai-semibold text-white mb-6">ประวัติการเปลี่ยนแปลง</h3>
              <div className="space-y-4">
                {document.changelog.map((log, index) => {
                  // Find the version index for comparison
                  const currentVersionIndex = document.versions?.findIndex(v => v.version === log.version) ?? 0;
                  const compareVersionIndex = Math.min(currentVersionIndex + 1, (document.versions?.length ?? 1) - 1);
                  
                  return (
                    <Link
                      key={index}
                      href={`/compare-versions?doc=${document.id}&topic=${params.topicId}&subtopic=${params.subtopicId}&v1=${currentVersionIndex}&v2=${compareVersionIndex}`}
                      className="block bg-white/5 rounded-xl p-6 border border-white/10 hover:bg-white/10 hover:border-pink-500/50 transition-all cursor-pointer group"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <span className="bg-pink-500/30 text-pink-200 px-3 py-1 rounded-full text-sm noto-sans-thai-medium">
                            Version {log.version}
                          </span>
                          <span className="text-white/70 noto-sans-thai-regular">{log.date}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-pink-300 opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-sm noto-sans-thai-medium">ดูการเปรียบเทียบ</span>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </div>
                      </div>
                      <div className="space-y-3">
                        {log.changes.map((change, changeIndex) => (
                          <div key={changeIndex} className="bg-white/5 rounded-lg p-4">
                            <div className="flex items-start space-x-3">
                              <div className={`mt-1 px-2 py-1 rounded text-xs noto-sans-thai-medium ${
                                change.type === 'added' ? 'bg-green-500/20 text-green-300' :
                                change.type === 'modified' ? 'bg-blue-500/20 text-blue-300' :
                                'bg-red-500/20 text-red-300'
                              }`}>
                                {change.type === 'added' ? 'เพิ่ม' : change.type === 'modified' ? 'แก้ไข' : 'ลบ'}
                              </div>
                              <div className="flex-1">
                                <p className="text-white noto-sans-thai-semibold mb-1">{change.field}</p>
                                <p className="text-white/80 noto-sans-thai-regular text-sm mb-2">{change.description}</p>
                                {change.before && change.after && (
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                                    <div className="bg-red-500/10 rounded p-2 border border-red-500/20">
                                      <span className="text-red-300 text-xs noto-sans-thai-medium">ก่อน: </span>
                                      <span className="text-white/70 text-sm noto-sans-thai-regular">{change.before}</span>
                                    </div>
                                    <div className="bg-green-500/10 rounded p-2 border border-green-500/20">
                                      <span className="text-green-300 text-xs noto-sans-thai-medium">หลัง: </span>
                                      <span className="text-white/70 text-sm noto-sans-thai-regular">{change.after}</span>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Document Versions */}
          {document.versions && document.versions.length > 0 && (
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 mt-6">
              <h3 className="text-2xl noto-sans-thai-semibold text-white mb-6">เวอร์ชันเอกสารทั้งหมด</h3>
              <div className="space-y-3">
                {document.versions.map((version, index) => (
                  <div key={index} className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          {index === 0 && (
                            <span className="bg-pink-500 text-white px-2 py-1 rounded text-xs noto-sans-thai-medium">
                              ล่าสุด
                            </span>
                          )}
                          <span className="text-white noto-sans-thai-semibold">Version {version.version}</span>
                        </div>
                        <span className="text-white/60 text-sm noto-sans-thai-regular">{version.date}</span>
                        <span className="text-white/60 text-sm noto-sans-thai-regular">โดย {version.author}</span>
                      </div>
                      {version.documentUrl && (
                        <a
                          href={version.documentUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-pink-300 hover:text-pink-200 text-sm noto-sans-thai-medium flex items-center space-x-1"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <span>ดาวน์โหลด</span>
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Related Documents */}
          {relatedDocuments.length > 0 && (
            <div className="mt-8">
              <h3 className="text-2xl noto-sans-thai-semibold text-white mb-4">เอกสารที่เกี่ยวข้อง</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {relatedDocuments.map((doc) => (
                  <Link
                    key={doc.id}
                    href={`/${params.topicId}/${params.subtopicId}/${doc.id}`}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/15 transition text-left"
                  >
                    <h4 className="text-white noto-sans-thai-medium mb-2">{doc.title}</h4>
                    <p className="text-white/70 text-sm noto-sans-thai-regular line-clamp-2">{doc.preview}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
