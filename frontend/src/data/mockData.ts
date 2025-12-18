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
    icon: '',
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
            `,
            category: 'ผลิตภัณฑ์',
            versions: [
              {
                version: '3.0',
                date: '15 ธ.ค. 2567',
                author: 'ฝ่ายผลิตภัณฑ์',
                documentUrl: '/documents/2025/03/สื่อความสาขา-_-การขายประกันชั้น-1-2.pdf'
              },
              {
                version: '2.0',
                date: '1 ธ.ค. 2567',
                author: 'ฝ่ายผลิตภัณฑ์',
                documentUrl: '/documents/2025/03/สื่อความสาขา-_-การขายประกันชั้น-1-1.pdf'
              },
              {
                version: '1.0',
                date: '1 ต.ค. 2567',
                author: 'ฝ่ายผลิตภัณฑ์',
                documentUrl: '/documents/2025/03/สื่อความสาขา-_-การขายประกันชั้น-1.pdf'
              }
            ],
            changelog: [
              {
                date: '18 ธ.ค. 2567',
                version: '3.0',
                changes: [
                  {
                    type: 'modified',
                    field: 'วันหมดอายุแพคเกจประกันรถยนต์ชั้น 1',
                    description: 'ขยายวันหมดอายุแพคเกจประกันรถยนต์ชั้น 1',
                    before: '31 พฤษภาคม 2568',
                    after: '31 ธันวาคม 2568'
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
            documentPath: '/documents/2025/04/สื่อความสาขา-_-ประกันวินาศภัยรถจักรยานยนต์-ชับบ์สามัคคีประกันภัย.pdf',
            documentType: 'pdf'
          },
          {
            id: 'doc2c',
            title: 'ประกันรถยนต์ผ่อน 0%',
            preview: 'โปรโมชั่นพิเศษ ประกันรถยนต์ผ่อนดอกเบี้ย 0%...',
            lastUpdated: '5 เม.ย. 2567',
            documentPath: '/documents/2025/04/สื่อความสาขา-_-ประกันรถยนต์ผ่อน-0-2.pdf',
            documentType: 'pdf'
          }
        ]
      }
    ]
  },
  {
    id: 'insurance',
    name: 'ประกัน',
    icon: '',
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
    icon: '',
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
    icon: '',
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
    icon: '',
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
    icon: '',
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
    icon: '',
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
    icon: '',
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
    icon: '',
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
    icon: '',
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
    announcement: 'วิริยะฯ ขยายวันหมดอายุแพคเกจประกันรถยนต์ชั้น 1',
    changes: [
      {
        field: 'วันหมดอายุแพคเกจประกันรถยนต์ชั้น 1',
        from: '31 มีนาคม 2568',
        to: '31 พฤษภาคม 2568'
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