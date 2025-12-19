'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import AnnouncementBar from '@/components/AnnouncementBar';
import { topics, getDocumentById } from '@/data/mockData';
import { comparePDFs, PDFComparisonResult } from '@/utils/pdfComparison';

export default function UpdateDocumentPage() {
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [selectedSubtopic, setSelectedSubtopic] = useState<string>('');
  const [selectedDocument, setSelectedDocument] = useState<string>('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string>('');
  const [comparisonResult, setComparisonResult] = useState<PDFComparisonResult | null>(null);
  const [isComparing, setIsComparing] = useState(false);
  const [updateType, setUpdateType] = useState<'major' | 'minor' | null>(null);
  const [changePercentage, setChangePercentage] = useState<number>(0);
  const [changeLogTopic, setChangeLogTopic] = useState<string>('');
  const [changeLogComment, setChangeLogComment] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Get available topics based on selected subject
  const availableTopics = topics;
  const availableSubtopics = selectedTopic 
    ? topics.find(t => t.id === selectedTopic)?.subtopics || []
    : [];
  const availableDocuments = selectedSubtopic && selectedTopic
    ? topics.find(t => t.id === selectedTopic)?.subtopics.find(s => s.id === selectedSubtopic)?.documents || []
    : [];

  // Get current document
  const currentDocument = selectedTopic && selectedSubtopic && selectedDocument
    ? getDocumentById(selectedTopic, selectedSubtopic, selectedDocument)
    : null;

  // Get latest version URL
  const latestVersionUrl = currentDocument?.versions?.[0]?.documentUrl 
    ? (currentDocument.versions[0].documentUrl.startsWith('/documents') 
        ? currentDocument.versions[0].documentUrl 
        : `/documents${currentDocument.versions[0].documentUrl}`)
    : currentDocument?.documentPath || '';

  // Handle file upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      alert('กรุณาอัพโหลดไฟล์ PDF เท่านั้น');
      return;
    }

    setUploadedFile(file);
    
    // Create object URL for preview
    const url = URL.createObjectURL(file);
    setUploadedFileUrl(url);

    // Auto-compare if we have a latest version
    if (latestVersionUrl && currentDocument) {
      await compareVersions(latestVersionUrl, url);
    }
  };

  // Compare uploaded file with latest version
  const compareVersions = async (oldUrl: string, newUrl: string) => {
    setIsComparing(true);
    try {
      const result = await comparePDFs(oldUrl, newUrl);
      setComparisonResult(result);
      
      // Calculate change percentage
      const totalItems = result.summary.additions + result.summary.deletions + result.summary.modifications;
      const totalContent = result.summary.totalPages * 100; // Rough estimate
      const percentage = (totalItems / totalContent) * 100;
      setChangePercentage(percentage);
      
      // Determine update type
      if (percentage > 30) {
        setUpdateType('major');
      } else {
        setUpdateType('minor');
      }
    } catch (error) {
      console.error('Error comparing versions:', error);
      alert('เกิดข้อผิดพลาดในการเปรียบเทียบเอกสาร');
    } finally {
      setIsComparing(false);
    }
  };

  // Handle submit
  const handleSubmit = async () => {
    if (!uploadedFile || !currentDocument || !changeLogTopic || !changeLogComment) {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate file upload to local
      // In real implementation, this would:
      // 1. Upload file to: public/documents/{subject}/{topic}/{sub-topic}/{document}/{version}
      // 2. Create changelog.md file in the same folder
      // 3. Update metadata
      
      // For now, just simulate with timeout
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create version number
      const currentVersion = currentDocument.versions?.[0]?.version || '1.0';
      const [major, minor] = currentVersion.split('.').map(Number);
      const newVersion = updateType === 'major' 
        ? `${major + 1}.0` 
        : `${major}.${minor + 1}`;
      
      // Log the upload details
      console.log('Upload details:', {
        subject: selectedSubject,
        topic: selectedTopic,
        subtopic: selectedSubtopic,
        document: selectedDocument,
        version: newVersion,
        updateType,
        changePercentage: changePercentage.toFixed(2),
        changeLogTopic,
        changeLogComment,
        file: uploadedFile.name,
        timestamp: new Date().toISOString()
      });
      
      // Create changelog content
      const changelogContent = `# Changelog - Version ${newVersion}

**Date:** ${new Date().toLocaleDateString('th-TH')}
**Update Type:** ${updateType === 'major' ? 'Major Update' : 'Minor Update'}
**Change Percentage:** ${changePercentage.toFixed(2)}%

## ${changeLogTopic}

${changeLogComment}

## Detailed Changes

- Total Pages: ${comparisonResult?.summary.totalPages || 0}
- Pages with Changes: ${comparisonResult?.summary.pagesWithChanges || 0}
- Additions: ${comparisonResult?.summary.additions || 0}
- Deletions: ${comparisonResult?.summary.deletions || 0}
- Modifications: ${comparisonResult?.summary.modifications || 0}

---
*Generated automatically by Weekend Knowledge Base System*
`;
      
      console.log('Changelog content:', changelogContent);
      
      // Show success message
      setShowSuccess(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
        resetForm();
      }, 3000);
      
    } catch (error) {
      console.error('Error submitting update:', error);
      alert('เกิดข้อผิดพลาดในการอัพเดทเอกสาร');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setSelectedSubject('');
    setSelectedTopic('');
    setSelectedSubtopic('');
    setSelectedDocument('');
    setUploadedFile(null);
    setUploadedFileUrl('');
    setComparisonResult(null);
    setUpdateType(null);
    setChangePercentage(0);
    setChangeLogTopic('');
    setChangeLogComment('');
  };

  // Cleanup object URLs
  useEffect(() => {
    return () => {
      if (uploadedFileUrl) {
        URL.revokeObjectURL(uploadedFileUrl);
      }
    };
  }, [uploadedFileUrl]);

  return (
    <div className="min-h-screen" style={{ 
      background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #8b5cf6 100%)'
    }}>
      <Navbar />
      <AnnouncementBar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Success Alert */}
        {showSuccess && (
          <div className="fixed top-24 right-8 z-50 bg-green-500 text-white px-6 py-4 rounded-lg shadow-2xl flex items-center space-x-3 animate-fade-in">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <p className="font-bold noto-sans-thai-semibold">อัพเดทเอกสารสำเร็จ!</p>
              <p className="text-sm noto-sans-thai-regular">เอกสารได้ถูกบันทึกเรียบร้อยแล้ว</p>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl noto-sans-thai-bold text-white mb-2">อัพเดทเอกสาร</h1>
          <p className="text-white/70 noto-sans-thai-regular">เลือกเอกสารที่ต้องการอัพเดทและอัพโหลดเวอร์ชันใหม่</p>
        </div>

        {/* Document Selection */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mb-6">
          <h2 className="text-2xl noto-sans-thai-semibold text-white mb-6">เลือกเอกสาร</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Topic Selection */}
            <div>
              <label className="block text-white/80 noto-sans-thai-medium mb-2">หัวข้อหลัก (Topic)</label>
              <select
                value={selectedTopic}
                onChange={(e) => {
                  setSelectedTopic(e.target.value);
                  setSelectedSubtopic('');
                  setSelectedDocument('');
                }}
                className="w-full bg-white/10 border border-white/20 text-white rounded-lg px-4 py-3 noto-sans-thai-regular focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                <option value="" className="bg-gray-800">-- เลือกหัวข้อหลัก --</option>
                {availableTopics.map((topic) => (
                  <option key={topic.id} value={topic.id} className="bg-gray-800">
                    {topic.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Subtopic Selection */}
            <div>
              <label className="block text-white/80 noto-sans-thai-medium mb-2">หัวข้อย่อย (Subtopic)</label>
              <select
                value={selectedSubtopic}
                onChange={(e) => {
                  setSelectedSubtopic(e.target.value);
                  setSelectedDocument('');
                }}
                disabled={!selectedTopic}
                className="w-full bg-white/10 border border-white/20 text-white rounded-lg px-4 py-3 noto-sans-thai-regular focus:outline-none focus:ring-2 focus:ring-pink-500 disabled:opacity-50"
              >
                <option value="" className="bg-gray-800">-- เลือกหัวข้อย่อย --</option>
                {availableSubtopics.map((subtopic) => (
                  <option key={subtopic.id} value={subtopic.id} className="bg-gray-800">
                    {subtopic.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Document Selection */}
            <div className="md:col-span-2">
              <label className="block text-white/80 noto-sans-thai-medium mb-2">เอกสาร</label>
              <select
                value={selectedDocument}
                onChange={(e) => setSelectedDocument(e.target.value)}
                disabled={!selectedSubtopic}
                className="w-full bg-white/10 border border-white/20 text-white rounded-lg px-4 py-3 noto-sans-thai-regular focus:outline-none focus:ring-2 focus:ring-pink-500 disabled:opacity-50"
              >
                <option value="" className="bg-gray-800">-- เลือกเอกสาร --</option>
                {availableDocuments.map((doc) => (
                  <option key={doc.id} value={doc.id} className="bg-gray-800">
                    {doc.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Document Preview and Upload */}
        {currentDocument && (
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Latest Version Preview */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden">
              <div className="bg-blue-500/20 border-b border-blue-500/30 p-4">
                <h3 className="text-xl noto-sans-thai-semibold text-white mb-1">เวอร์ชันปัจจุบัน</h3>
                <p className="text-white/70 text-sm noto-sans-thai-regular">
                  {currentDocument.versions?.[0] ? (
                    <>Version {currentDocument.versions[0].version} - {currentDocument.versions[0].date}</>
                  ) : (
                    <>เอกสารปัจจุบัน</>
                  )}
                </p>
              </div>
              <div className="h-[600px]">
                {latestVersionUrl ? (
                  <iframe
                    src={`${latestVersionUrl}#toolbar=1`}
                    className="w-full h-full"
                    title="Latest Version"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-white/50">
                    ไม่มีเอกสาร
                  </div>
                )}
              </div>
            </div>

            {/* Upload Area */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden">
              <div className="bg-green-500/20 border-b border-green-500/30 p-4">
                <h3 className="text-xl noto-sans-thai-semibold text-white mb-1">เวอร์ชันใหม่</h3>
                <p className="text-white/70 text-sm noto-sans-thai-regular">อัพโหลดเอกสารเวอร์ชันใหม่</p>
              </div>
              <div className="h-[600px] flex flex-col">
                {!uploadedFile ? (
                  <div className="flex-1 flex items-center justify-center p-8">
                    <label className="w-full h-full border-2 border-dashed border-white/30 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-white/50 hover:bg-white/5 transition">
                      <svg className="w-16 h-16 text-white/50 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <span className="text-white noto-sans-thai-medium mb-2">คลิกเพื่ออัพโหลดไฟล์ PDF</span>
                      <span className="text-white/50 text-sm noto-sans-thai-regular">หรือลากไฟล์มาวางที่นี่</span>
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col">
                    <div className="flex-1">
                      {uploadedFileUrl && (
                        <iframe
                          src={`${uploadedFileUrl}#toolbar=1`}
                          className="w-full h-full"
                          title="Uploaded Version"
                        />
                      )}
                    </div>
                    <div className="p-4 bg-white/5 border-t border-white/10">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <div>
                            <p className="text-white noto-sans-thai-medium text-sm">{uploadedFile.name}</p>
                            <p className="text-white/50 text-xs noto-sans-thai-regular">
                              {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            setUploadedFile(null);
                            setUploadedFileUrl('');
                            setComparisonResult(null);
                            setUpdateType(null);
                          }}
                          className="text-red-400 hover:text-red-300 transition"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Comparison Results */}
        {comparisonResult && (
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mb-6">
            <h2 className="text-2xl noto-sans-thai-semibold text-white mb-6">ผลการเปรียบเทียบ</h2>
            
            {isComparing ? (
              <div className="flex items-center justify-center py-12">
                <div className="flex items-center space-x-3 text-white">
                  <svg className="animate-spin h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span className="noto-sans-thai-medium">กำลังวิเคราะห์...</span>
                </div>
              </div>
            ) : (
              <>
                {/* Summary Cards */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                  <div className={`rounded-xl p-4 border ${updateType === 'major' ? 'bg-red-500/20 border-red-500/30' : 'bg-yellow-500/20 border-yellow-500/30'}`}>
                    <div className={`text-sm noto-sans-thai-regular mb-1 ${updateType === 'major' ? 'text-red-200' : 'text-yellow-200'}`}>
                      ประเภทการอัพเดท
                    </div>
                    <div className="text-white text-2xl noto-sans-thai-bold">
                      {updateType === 'major' ? 'Major' : 'Minor'}
                    </div>
                    <div className={`text-xs noto-sans-thai-regular mt-1 ${updateType === 'major' ? 'text-red-300' : 'text-yellow-300'}`}>
                      {changePercentage.toFixed(2)}% เปลี่ยนแปลง
                    </div>
                  </div>
                  
                  <div className="bg-blue-500/20 rounded-xl p-4 border border-blue-500/30">
                    <div className="text-blue-200 text-sm noto-sans-thai-regular mb-1">หน้าที่มีการเปลี่ยนแปลง</div>
                    <div className="text-white text-2xl noto-sans-thai-bold">
                      {comparisonResult.summary.pagesWithChanges}/{comparisonResult.summary.totalPages}
                    </div>
                  </div>
                  
                  <div className="bg-green-500/20 rounded-xl p-4 border border-green-500/30">
                    <div className="text-green-200 text-sm noto-sans-thai-regular mb-1">เพิ่ม</div>
                    <div className="text-white text-2xl noto-sans-thai-bold">{comparisonResult.summary.additions}</div>
                  </div>
                  
                  <div className="bg-red-500/20 rounded-xl p-4 border border-red-500/30">
                    <div className="text-red-200 text-sm noto-sans-thai-regular mb-1">ลบ</div>
                    <div className="text-white text-2xl noto-sans-thai-bold">{comparisonResult.summary.deletions}</div>
                  </div>
                  
                  <div className="bg-yellow-500/20 rounded-xl p-4 border border-yellow-500/30">
                    <div className="text-yellow-200 text-sm noto-sans-thai-regular mb-1">แก้ไข</div>
                    <div className="text-white text-2xl noto-sans-thai-bold">{comparisonResult.summary.modifications}</div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* Changelog Form */}
        {uploadedFile && comparisonResult && (
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mb-6">
            <h2 className="text-2xl noto-sans-thai-semibold text-white mb-6">ข้อมูล Changelog</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-white noto-sans-thai-medium mb-2">
                  Change Log Topic <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={changeLogTopic}
                  onChange={(e) => setChangeLogTopic(e.target.value)}
                  placeholder="เช่น: อัพเดทเงื่อนไขประกันภัย, เพิ่มรายละเอียดความคุ้มครอง"
                  className="w-full bg-white/10 border border-white/20 text-white rounded-lg px-4 py-3 noto-sans-thai-regular focus:outline-none focus:ring-2 focus:ring-pink-500 placeholder-white/40"
                />
              </div>
              
              <div>
                <label className="block text-white noto-sans-thai-medium mb-2">
                  Comment / รายละเอียด <span className="text-red-400">*</span>
                </label>
                <textarea
                  value={changeLogComment}
                  onChange={(e) => setChangeLogComment(e.target.value)}
                  placeholder="อธิบายรายละเอียดการเปลี่ยนแปลงที่สำคัญ..."
                  rows={5}
                  className="w-full bg-white/10 border border-white/20 text-white rounded-lg px-4 py-3 noto-sans-thai-regular focus:outline-none focus:ring-2 focus:ring-pink-500 placeholder-white/40 resize-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        {uploadedFile && comparisonResult && (
          <div className="flex justify-end space-x-4">
            <button
              onClick={resetForm}
              disabled={isSubmitting}
              className="bg-white/10 hover:bg-white/20 disabled:opacity-50 text-white px-8 py-3 rounded-lg noto-sans-thai-medium transition"
            >
              ยกเลิก
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !changeLogTopic || !changeLogComment}
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg noto-sans-thai-medium transition flex items-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>กำลังอัพเดท...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>ยืนยันการอัพเดท</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Empty State */}
        {!currentDocument && (
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-12 border border-white/20 text-center">
            <svg className="w-24 h-24 text-white/30 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-2xl noto-sans-thai-semibold text-white mb-2">เลือกเอกสารที่ต้องการอัพเดท</h3>
            <p className="text-white/70 noto-sans-thai-regular">กรุณาเลือกหัวข้อ หัวข้อย่อย และเอกสารจากด้านบน</p>
          </div>
        )}
      </main>
    </div>
  );
}
