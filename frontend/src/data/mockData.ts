// Path to actual documents (served from public folder)
export const DOCUMENTS_BASE_PATH = '/documents';

export interface Topic {
  id: string;
  name: string;
  icon: string;
  subtopics: Subtopic[];
}

export interface Subtopic {
  id: string;
  name: string;
  documents: Document[];
}

export interface DocumentVersion {
  version: string;
  date: string;
  author: string;
  documentUrl?: string;
}

export interface DocumentChangeLog {
  date: string;
  version: string;
  changes: {
    type: 'added' | 'modified' | 'removed';
    field: string;
    description: string;
    before?: string;
    after?: string;
  }[];
}

export interface Document {
  id: string;
  title: string;
  preview: string;
  lastUpdated: string;
  content?: string;
  fullContent?: string;
  category?: string;
  documentPath?: string; // Actual file path in .data folder
  documentType?: 'pdf' | 'png' | 'jpg' | 'webp';
  versions?: DocumentVersion[];
  changelog?: DocumentChangeLog[];
}

export interface ChangeLogEntry {
  date: string;
  announcement: string;
  changes: {
    field: string;
    from: string;
    to: string;
  }[];
}

// Main subjects/categories for the features section
export interface MainSubject {
  id: string;
  name: string;
  iconType: 'book' | 'ebook' | 'learning' | 'shop' | 'forms';
  gradient: string;
}

export const mainSubjects: MainSubject[] = [
  {
    id: 'books',
    name: 'สื่อความสาขา',
    iconType: 'book',
    gradient: 'from-pink-500/40 to-pink-600/40'
  },
  {
    id: 'ebook',
    name: 'eBook Center',
    iconType: 'ebook',
    gradient: 'from-purple-500/40 to-purple-600/40'
  },
  {
    id: 'elearning',
    name: 'e - Learning',
    iconType: 'learning',
    gradient: 'from-indigo-500/40 to-indigo-600/40'
  },
  {
    id: 'shop',
    name: 'Turbo Shop',
    iconType: 'shop',
    gradient: 'from-blue-500/40 to-blue-600/40'
  },
  {
    id: 'forms',
    name: 'แบบฟอร์มต่างๆ',
    iconType: 'forms',
    gradient: 'from-cyan-500/40 to-cyan-600/40'
  }
];

export const topics: Topic[] = [
  {
    id: 'product',
    name: 'ผลิตภัณฑ์',
    icon: '🚗',
    subtopics: [
      {
        id: 'car-insurance',
        name: 'ประกันรถยนต์',
        documents: [
          { 
            id: 'doc1', 
            title: 'การขายประกันชั้น 1',
            documentPath: '/documents/2025/03/สื่อความสาขา-_-การขายประกันชั้น-1-2.pdf',
            documentType: 'pdf', 
            preview: 'คู่มือการขายประกันภัยรถยนต์ชั้น 1 ฉบับล่าสุด เวอร์ชัน 3.0', 
            lastUpdated: '15 ธ.ค. 2567',
            fullContent: `
# ประกันภัยรถยนต์ชั้น 1

## ความคุ้มครองหลัก

ประกันภัยรถยนต์ชั้น 1 เป็นประกันที่ให้ความคุ้มครองแบบเต็มรูปแบบ ครอบคลุมความเสียหายทั้งของตนเองและบุคคลภายนอก

### ความคุ้มครองที่ได้รับ:

1. **ความเสียหายต่อรถยนต์ของผู้เอาประกัน**
   - อุบัติเหตุชนกัน
   - รถยนต์พลิกคว่ำ
   - รถยนต์ตกถนน
   - วัตถุตกใส่รถยนต์

2. **ความเสียหายต่อชีวิต ร่างกาย และทรัพย์สินบุคคลภายนอก**
   - ค่าเสียหายต่อชีวิตและร่างกาย (สูงสุดตามกรมธรรม์)
   - ค่าเสียหายต่อทรัพย์สิน (สูงสุดตามกรมธรรม์)

3. **ความคุ้มครองเพิ่มเติม**
   - รถยนต์สูญหาย/ไฟไหม้
   - น้ำท่วม (ถ้าซื้อความคุ้มครองเพิ่ม)
   - ภัยธรรมชาติ

## เงื่อนไขการคุ้มครอง

### อายุรถยนต์
- รถยนต์ที่มีอายุไม่เกิน 10 ปี
- รถยนต์ต้องอยู่ในสภาพที่ดี ผ่านการตรวจสภาพ

### ผู้ขับขี่
- ผู้ขับขี่ต้องมีใบอนุญาตขับขี่ที่ถูกต้อง
- อายุผู้ขับขี่ตามที่ระบุในกรมธรรม์

### การต่ออายุ
- สามารถต่ออายุได้ทุกปี
- ต้องชำระค่าเบี้ยประกันภัยก่อนวันครบกำหนด

## ขั้นตอนการเคลม

1. แจ้งเหตุภายใน 24 ชั่วโมง
2. เตรียมเอกสารประกอบการเคลม
   - สำเนาบัตรประชาชน
   - สำเนาทะเบียนรถ
   - ใบขับขี่
   - รายงานตำรวจ (กรณีอุบัติเหตุ)
3. ส่งรถเข้าซ่อมที่อู่ที่บริษัทอนุมัติ
4. รอการอนุมัติจากบริษัทประกัน
5. รับรถคืนหลังซ่อมเสร็จ

## ค่าเบี้ยประกันภัย

ค่าเบี้ยประกันภัยขึ้นอยู่กับ:
- ยี่ห้อและรุ่นรถยนต์
- ทุนประกันภัย
- อายุรถยนต์
- ประวัติการเคลม
- อายุและประสบการณ์ผู้ขับขี่

## ติดต่อสอบถาม

หากมีข้อสงสัยเพิ่มเติม กรุณาติดต่อ:
- โทร: 02-xxx-xxxx
- Line: @turbomoney
- Email: support@turbomoney.com
            `,
            category: 'ผลิตภัณฑ์',
            versions: [
              {
                version: '3.0',
                date: '15 ธ.ค. 2567',
                author: 'ฝ่ายผลิตภัณฑ์',
                documentUrl: '/2025/03/สื่อความสาขา-_-การขายประกันชั้น-1-2.pdf'
              },
              {
                version: '2.0',
                date: '1 ธ.ค. 2567',
                author: 'ฝ่ายผลิตภัณฑ์',
                documentUrl: '/2025/03/สื่อความสาขา-_-การขายประกันชั้น-1-1.pdf'
              },
              {
                version: '1.0',
                date: '1 ต.ค. 2567',
                author: 'ฝ่ายผลิตภัณฑ์',
                documentUrl: '/2025/03/สื่อความสาขา-_-การขายประกันชั้น-1.pdf'
              }
            ],
            changelog: [
              {
                date: '15 ธ.ค. 2567',
                version: '3.0',
                changes: [
                  {
                    type: 'modified',
                    field: 'เนื้อหาหน้า 5-7',
                    description: 'ปรับปรุงตารางเปรียบเทียบแผนประกัน',
                    before: 'ตารางแบบเก่า 3 คอลัมน์',
                    after: 'ตารางแบบใหม่ 5 คอลัมน์พร้อมไอคอน'
                  },
                  {
                    type: 'added',
                    field: 'หน้า 12',
                    description: 'เพิ่มส่วนคำถามที่พบบ่อย (FAQ)'
                  },
                  {
                    type: 'modified',
                    field: 'ตัวเลขค่าเบี้ย',
                    description: 'อัปเดตอัตราค่าเบี้ยประกันภัยล่าสุด',
                    before: 'เริ่มต้น 5,000 บาท',
                    after: 'เริ่มต้น 4,500 บาท'
                  }
                ]
              },
              {
                date: '1 ธ.ค. 2567',
                version: '2.0',
                changes: [
                  {
                    type: 'modified',
                    field: 'หน้า 3',
                    description: 'แก้ไขข้อความเงื่อนไขอายุรถ',
                    before: 'รถอายุไม่เกิน 7 ปี',
                    after: 'รถอายุไม่เกิน 10 ปี'
                  },
                  {
                    type: 'added',
                    field: 'หน้า 8-9',
                    description: 'เพิ่มรายชื่ออู่ซ่อมที่ให้บริการ 200 แห่ง'
                  },
                  {
                    type: 'removed',
                    field: 'หน้า 4',
                    description: 'ลบข้อความค่าธรรมเนียมแรกเข้า 500 บาท'
                  }
                ]
              },
              {
                date: '1 ต.ค. 2567',
                version: '1.0',
                changes: [
                  {
                    type: 'added',
                    field: 'เอกสารฉบับแรก',
                    description: 'สร้างคู่มือการขายประกันภัยรถยนต์ชั้น 1 ฉบับแรก'
                  }
                ]
              }
            ]
          },
          { 
            id: 'doc2', 
            title: 'ประกันภัยรถยนต์ชั้น 2+', 
            preview: 'ความคุ้มครองรถยนต์สูญหาย ไฟไหม้ และความเสียหายจากอุบัติเหตุ...', 
            lastUpdated: '10 ธ.ค. 2567',
            documentPath: '/documents/2025/03/สื่อความสาขา-_-การเก็บ-เบิก-และคืนเอกสารประกอบการทำสินเชื่อ.pdf',
            documentType: 'pdf'
          },
          { 
            id: 'doc2b', 
            title: 'ประกันวินาศภัยรถจักรยานยนต์', 
            preview: 'ความคุ้มครองสำหรับรถจักรยานยนต์ ชับบ์สามัคคีประกันภัย...', 
            lastUpdated: '8 ธ.ค. 2567',
            documentPath: '/documents/2025/03/สื่อความสาขา-_-ขั้นตอนการจองที่พัก-ผู้จัดการพื้นที่ขึ้นไป.pdf',
            documentType: 'pdf'
          },
          { 
            id: 'doc2c', 
            title: 'ประกันรถยนต์ผ่อน 0%', 
            preview: 'โปรโมชั่นพิเศษ ประกันรถยนต์ผ่อนดอกเบี้ย 0%...', 
            lastUpdated: '5 เม.ย. 2567',
            documentPath: '/documents/2025/04/สื่อความสาขา-_-Branch-Support-System.pdf',
            documentType: 'pdf'
          }
        ]
      },
      {
        id: 'health-insurance',
        name: 'ประกันสุขภาพ',
        documents: [
          { id: 'doc3', title: 'แผนประกันสุขภาพพื้นฐาน', preview: 'ความคุ้มครองค่ารักษาพยาบาลในโรงพยาบาลรัฐและเอกชน...', lastUpdated: '12 ธ.ค. 2567' }
        ]
      }
    ]
  },
  {
    id: 'insurance',
    name: 'ประกัน',
    icon: '🛡️',
    subtopics: [
      {
        id: 'claim-process',
        name: 'ขั้นตอนการเคลม',
        documents: [
          { id: 'doc4', title: 'วิธีการยื่นเคลมประกันรถยนต์', preview: 'ขั้นตอนที่ 1: แจ้งเหตุภายใน 24 ชั่วโมง ขั้นตอนที่ 2: เตรียมเอกสาร...', lastUpdated: '18 ธ.ค. 2567' }
        ]
      }
    ]
  }
];
// Continue with the rest of the topics array
const remainingTopics: Topic[] = [
  {
    id: 'kpi',
    name: 'KPI & Incentive',
    icon: '📈',
    subtopics: [
      {
        id: 'sales-kpi',
        name: 'เป้าหมายการขาย',
        documents: [
          { 
            id: 'doc5', 
            title: 'การคิด KPI ระดับสาขา', 
            preview: 'คู่มือการคำนวณ KPI ระดับสาขา เป้าหมายการขายรวม รายละเอียดการวัดผล...', 
            lastUpdated: '1 มี.ค. 2567',
            documentPath: '/documents/2025/03/สื่อความสาขา-_-การคิด-KPI-ระดับสาขา.pdf',
            documentType: 'pdf'
          },
          { 
            id: 'doc5b', 
            title: 'การดูข้อมูลเป้าหมายใน Power BI', 
            preview: 'วิธีการเข้าถึงและตรวจสอบเป้าหมายรายสาขาผ่านระบบ Power BI...', 
            lastUpdated: '5 มี.ค. 2567',
            documentPath: '/documents/2025/03/สื่อความสาขา-_-การดูข้อมูลเป้าหมายรายสาขาใน-Power-Bi.pdf',
            documentType: 'pdf'
          },
          { 
            id: 'doc5c', 
            title: 'การคิด Incentive ระดับสาขา', 
            preview: 'คู่มือการคำนวณค่าตอบแทนพิเศษ Incentive สำหรับระดับสาขา...', 
            lastUpdated: '15 เม.ย. 2567',
            documentPath: '/documents/2025/04/สื่อความสาขา-_-การคิด-Incentive-ระดับสาขา-1.pdf',
            documentType: 'pdf'
          }
        ]
      }
    ]
  },
  {
    id: 'campaign',
    name: 'Campaign',
    icon: '🏆',
    subtopics: [
      {
        id: 'promo',
        name: 'โปรโมชั่นปัจจุบัน',
        documents: [
          { 
            id: 'doc6', 
            title: 'แคมเปญนักล่าบ้าสมบัติ ปี 2568', 
            preview: 'แคมเปญส่งเสริมลูกค้าใหม่ สำหรับปี 2568 โปรโมชั่นพิเศษ...', 
            lastUpdated: '15 มี.ค. 2567',
            documentPath: '/documents/2025/04/สื่อความสาขา-_-Horaland-4.pdf',
            documentType: 'pdf'
          },
          { 
            id: 'doc6b', 
            title: 'Turbolympic แคมเปญพิเศษ', 
            preview: 'แคมเปญ Turbolympic กิจกรรมส่งเสริมการขายพิเศษ...', 
            lastUpdated: '20 มี.ค. 2567',
            documentPath: '/documents/2025/03/สื่อความสาขา-_-Turbolympic.pdf',
            documentType: 'pdf'
          },
          { 
            id: 'doc6c', 
            title: 'เทอร์โบไอดอล รอบที่ 13', 
            preview: 'โครงการเทอร์โบไอดอล ยกย่องพนักงานดีเด่น รอบที่ 13...', 
            lastUpdated: '25 มี.ค. 2567',
            documentPath: '/documents/2025/04/ประกาศสาขา_การเปลี่ยนแปลงการทดสอบประจำเดือน.pdf',
            documentType: 'pdf'
          }
        ]
      }
    ]
  },
  {
    id: 'hr',
    name: 'HR',
    icon: '👥',
    subtopics: [
      {
        id: 'leave',
        name: 'การลางาน',
        documents: [
          { id: 'doc7', title: 'นโยบายการลางาน', preview: 'พนักงานมีสิทธิ์ลาพักร้อนปีละ 10 วัน ลาป่วยปีละ 30 วัน...', lastUpdated: '1 ม.ค. 2567' }
        ]
      }
    ]
  },
  {
    id: 'operation',
    name: 'Operation',
    icon: '📋',
    subtopics: [
      {
        id: 'daily-ops',
        name: 'การดำเนินงานประจำวัน',
        documents: [
          { 
            id: 'doc8', 
            title: 'คู่มือการใช้ระบบตรวจสาขาใน Turbo Form', 
            preview: 'คู่มือการใช้งานระบบตรวจสอบสาขาผ่าน Turbo Form Effective 1 APR...', 
            lastUpdated: '1 มี.ค. 2567',
            documentPath: '/documents/2025/03/สื่อความสาขา-_-การดูข้อมูลเป้าหมายรายสาขาใน-Power-Bi-1.pdf',
            documentType: 'pdf'
          },
          { 
            id: 'doc8b', 
            title: 'การเก็บ เบิก และคืนเอกสารสินเชื่อ', 
            preview: 'ขั้นตอนการจัดเก็บ เบิกใช้ และคืนเอกสารประกอบการทำสินเชื่อ...', 
            lastUpdated: '10 มี.ค. 2567',
            documentPath: '/documents/2025/03/สื่อความสาขา-_-การเก็บ-เบิก-และคืนเอกสารประกอบการทำสินเชื่อ-1.pdf',
            documentType: 'pdf'
          },
          { 
            id: 'doc8c', 
            title: 'Branch Support System', 
            preview: 'ระบบสนับสนุนการทำงานสาขา คู่มือการใช้งานและฟีเจอร์ต่างๆ...', 
            lastUpdated: '5 เม.ย. 2567',
            documentPath: '/documents/2025/04/สื่อความสาขา-_-Branch-Support-System-2.pdf',
            documentType: 'pdf'
          }
        ]
      }
    ]
  },
  {
    id: 'marketing',
    name: 'การตลาด',
    icon: '📢',
    subtopics: [
      {
        id: 'social-media',
        name: 'โซเชียลมีเดีย',
        documents: [
          { 
            id: 'doc9', 
            title: 'มาตรฐานการติดตั้งสื่อการตลาดที่สาขา', 
            preview: 'คู่มือและมาตรฐานการติดตั้งสื่อโฆษณา ป้ายประชาสัมพันธ์ที่สาขา...', 
            lastUpdated: '12 มี.ค. 2567',
            documentPath: '/documents/2025/03/สื่อความสาขา-_-การดูข้อมูลเป้าหมายรายสาขาใน-Power-Bi-2.pdf',
            documentType: 'pdf'
          }
        ]
      }
    ]
  },
  {
    id: 'accounting',
    name: 'บัญชี',
    icon: '💰',
    subtopics: [
      {
        id: 'expense',
        name: 'การเบิกค่าใช้จ่าย',
        documents: [
          { id: 'doc10', title: 'วิธีการเบิกค่าใช้จ่าย', preview: 'กรอกแบบฟอร์มเบิกค่าใช้จ่าย แนบใบเสร็จต้นฉบับ...', lastUpdated: '3 ธ.ค. 2567' }
        ]
      }
    ]
  },
  {
    id: 'knowledge',
    name: 'สื่อความรู้',
    icon: '📚',
    subtopics: [
      {
        id: 'training',
        name: 'คอร์สอบรม',
        documents: [
          { id: 'doc11', title: 'หลักสูตรการขายประกัน', preview: 'เทคนิคการขายประกันสำหรับมือใหม่ 10 บทเรียน...', lastUpdated: '8 ธ.ค. 2567' }
        ]
      }
    ]
  },
  {
    id: 'faq',
    name: 'รู้เรื่องไม่?',
    icon: '❓',
    subtopics: [
      {
        id: 'common-questions',
        name: 'คำถามที่พบบ่อย',
        documents: [
          { id: 'doc12', title: 'FAQ ทั่วไป', preview: 'Q: ประกันรถยนต์ชั้น 1 คืออะไร? A: เป็นประกันที่ให้ความคุ้มครองแบบเต็มรูปแบบ...', lastUpdated: '14 ธ.ค. 2567' }
        ]
      }
    ]
  }
];

// Merge the topics arrays
topics.push(...remainingTopics);

export const changeLog: ChangeLogEntry[] = [
  {
    date: '18 ธ.ค. 2567',
    announcement: 'อัปเดตนโยบายประกันรถยนต์ใหม่',
    changes: [
      {
        field: 'ระยะเวลาคุ้มครอง',
        from: '365 วัน',
        to: '400 วัน'
      },
      {
        field: 'ค่าเบี้ยประกันขั้นต่ำ',
        from: '5,000 บาท',
        to: '4,500 บาท'
      }
    ]
  },
  {
    date: '15 ธ.ค. 2567',
    announcement: 'เพิ่มฟีเจอร์ใหม่ในระบบ',
    changes: [
      {
        field: 'ระบบค้นหา',
        from: 'ค้นหาแบบธรรมดา',
        to: 'ค้นหาแบบอัจฉริยะ AI'
      }
    ]
  }
];

export function getTopicById(topicId: string): Topic | undefined {
  return topics.find(t => t.id === topicId);
}

export function getSubtopicById(topicId: string, subtopicId: string): Subtopic | undefined {
  const topic = getTopicById(topicId);
  return topic?.subtopics.find(s => s.id === subtopicId);
}

export function getDocumentById(topicId: string, subtopicId: string, documentId: string): Document | undefined {
  const subtopic = getSubtopicById(topicId, subtopicId);
  return subtopic?.documents.find(d => d.id === documentId);
}

export function getDocumentUrl(document: Document): string {
  if (!document.documentPath) return '#';
  return `${DOCUMENTS_BASE_PATH}${document.documentPath}`;
}

export function getDocumentViewerUrl(document: Document): string {
  const docUrl = getDocumentUrl(document);
  if (document.documentType === 'pdf') {
    // For PDF, use browser's PDF viewer or external viewer
    return docUrl;
  }
  // For images, return direct path
  return docUrl;
}