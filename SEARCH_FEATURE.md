# ฟีเจอร์การค้นหา (Search Feature)

## ภาพรวม
ฟีเจอร์การค้นหาใหม่ที่เพิ่มเข้ามาใน SearchBar component ซึ่งจะเรียก Mock API และแสดงผลลัพธ์เป็น card ด้านล่างกล่องค้นหา

## การทำงาน

### 1. API Endpoint
- **URL**: `http://mock.ntbx.tech:8012/hackaton/search/frontend`
- **Method**: GET
- **Fallback**: หาก API ไม่พร้อมใช้งาน จะใช้ mock data แทน

### 2. ฟีเจอร์หลัก
- ✅ เรียก API เมื่อกดปุ่มค้นหา
- ✅ แสดง Loading state ขณะรอผลลัพธ์
- ✅ แสดง Error state หาก API ล้มเหลว
- ✅ แสดงผลลัพธ์เป็น card แบบ responsive
- ✅ กรองผลลัพธ์ตามคำค้นหา (สำหรับ mock data)
- ✅ คลิกที่ card เพื่อเปิดเอกสาร

### 3. UI/UX Features
- **Responsive Design**: รองรับทุกขนาดหน้าจอ
- **Loading Animation**: แสดงสถานะกำลังโหลด
- **Error Handling**: แสดงข้อความเมื่อเกิดข้อผิดพลาด
- **Hover Effects**: เอฟเฟกต์เมื่อ hover บน card
- **Relevance Score**: แสดงคะแนนความเกี่ยวข้อง

## โครงสร้างข้อมูล

### SearchResult Interface
```typescript
interface SearchResult {
  id: string;
  title: string;
  url: string;
  description: string;
  relevanceScore: number;
}
```

### Mock Data
ข้อมูลทดสอบอยู่ในไฟล์ `frontend/src/data/mockData.ts` ในตัวแปร `mockSearchResults`

## การใช้งาน

1. **พิมพ์คำค้นหา** ในกล่อง search
2. **กดปุ่มค้นหา** หรือกด Enter
3. **รอผลลัพธ์** (จะแสดง loading state)
4. **ดูผลลัพธ์** ที่แสดงเป็น card ด้านล่าง
5. **คลิกที่ card** เพื่อเปิดเอกสาร

## การปรับแต่ง

### เปลี่ยน API Endpoint
แก้ไขใน `frontend/src/components/SearchBar.tsx`:
```typescript
const response = await fetch('YOUR_API_ENDPOINT_HERE', {
  method: 'GET',
});
```

### เพิ่ม Mock Data
แก้ไขใน `frontend/src/data/mockData.ts`:
```typescript
export const mockSearchResults = [
  // เพิ่มข้อมูลใหม่ที่นี่
];
```

### ปรับแต่ง UI
- แก้ไข CSS classes ใน SearchBar component
- ปรับ animation และ transition effects
- เปลี่ยนสีและ gradient

## ไฟล์ที่เกี่ยวข้อง

1. `frontend/src/components/SearchBar.tsx` - Component หลัก
2. `frontend/src/data/mockData.ts` - Mock data
3. `frontend/src/app/globals.css` - CSS utilities (line-clamp)

## การทดสอบ

1. **ทดสอบการค้นหา**: พิมพ์คำต่างๆ และดูผลลัพธ์
2. **ทดสอบ Responsive**: ลองใช้ในหน้าจอขนาดต่างๆ
3. **ทดสอบ Error Handling**: ปิด internet เพื่อดู fallback
4. **ทดสอบ Loading State**: ดูการแสดง loading animation

## หมายเหตุ

- ปัจจุบันใช้ mock data เป็นหลัก เนื่องจาก API อาจยังไม่พร้อม
- สามารถเปลี่ยนไปใช้ API จริงได้เมื่อพร้อม
- รองรับการค้นหาภาษาไทยและอังกฤษ
- ผลลัพธ์จะเรียงตามคะแนนความเกี่ยวข้อง (relevanceScore)