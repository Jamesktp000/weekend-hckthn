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

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <div className="prose prose-invert max-w-none">
              <p className="text-white/90 noto-sans-thai-regular text-lg leading-relaxed mb-6">
                {document.preview}
              </p>
              <div className="border-t border-white/20 pt-6 mt-6">
                <h3 className="text-2xl noto-sans-thai-semibold text-white mb-4">รายละเอียดเพิ่มเติม</h3>
                <p className="text-white/80 noto-sans-thai-regular leading-relaxed">
                  นี่คือเนื้อหาหลักของเอกสาร คุณสามารถเพิ่มข้อมูลโดยละเอียดเกี่ยวกับหัวข้อนี้ รวมถึง:
                </p>
                <ul className="list-disc list-inside text-white/80 noto-sans-thai-regular mt-4 space-y-2">
                  <li>ขั้นตอนการดำเนินการ</li>
                  <li>เงื่อนไขและข้อกำหนด</li>
                  <li>ตัวอย่างการใช้งาน</li>
                  <li>คำถามที่พบบ่อย</li>
                </ul>
              </div>
            </div>
          </div>

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
