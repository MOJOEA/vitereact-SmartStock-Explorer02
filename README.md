# vitereact-SmartStock-Explorer02

# SmartStock Explorer
โปรเจกต์ฝึกฝน React ระดับกลาง: ระบบจัดการคลังสินค้า (Inventory Management)

## วัตถุประสงค์ (Learning Goals)
- ฝึกการจัดการข้อมูลตัวเลข (Number Handling) และการคำนวณใน React
- เรียนรู้การใช้ `.reduce()` เพื่อหาผลรวมของข้อมูล (Total Value)
- ฝึกทำ Optimistic UI (การอัปเดตหน้าจอทันทีเมื่อกดปุ่มเพิ่ม-ลดสต็อก)
- จัดการเงื่อนไขการแสดงผล (Conditional Rendering) ตามจำนวนสินค้า

## ข้อมูล API (MockAPI Settings)
- **Resource:** `products`
- **Fields:**
  - `name`: ชื่อสินค้า
  - `category`: หมวดหมู่สินค้า
  - `price`: ราคา (Number/String)
  - `stock`: จำนวนคงเหลือ (ใช้ address.buildingNumber แทน)
  - `image`: รูปภาพสินค้า

## ฟีเจอร์ที่ต้องพัฒนา (Features)
1. [ ] **Product Dashboard:** แสดงรายการสินค้าทั้งหมดในรูปแบบการ์ด
2. [ ] **Stock Controller:** ปุ่ม [+] และ [-] เพื่อเพิ่มหรือลดจำนวนสินค้าทันที
3. [ ] **Inventory Summary:** ส่วนแสดงมูลค่ารวมของสินค้าทั้งหมด (Price * Stock)
4. [ ] **Low Stock Alert:** แสดงสัญลักษณ์เตือนเมื่อสินค้าเหลือต่ำกว่า 5 ชิ้น
5. [ ] **Out of Stock Logic:** ปิดการใช้งานปุ่มลดสต็อกเมื่อสินค้าเป็น 0