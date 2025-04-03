const Data = async () => {
    const urlParams = new URLSearchParams(window.location.search); // ดึง query parameters
    const firstname = urlParams.get('firstname');
    const lastname = urlParams.get('lastname');
    const start_time = urlParams.get('starttime');
    const end_time = urlParams.get('endtime');
  
    console.log(firstname, lastname, start_time, end_time); // ตรวจสอบค่าที่ดึงมา
  
    // ข้อมูลที่ต้องการส่งไปยังเซิร์ฟเวอร์
    let userData = {
        firstname: firstname,
        lastname: lastname,
        start_time: start_time,
        end_time: end_time,
        status: 'รออนุมัติ'
    };
  
    try {
      // ส่งข้อมูลไปยังเซิร์ฟเวอร์เพื่อบันทึกในฐานข้อมูล
      const response = await axios.post('http://localhost:8001/bookings', userData);
          console.log(response.data);
          alert('Successfully')
          window.location.href='databook.html';
}catch(error) {
    if (error.response) {
      // เซิร์ฟเวอร์ตอบกลับด้วยสถานะข้อผิดพลาด
      console.error('Registration failed:', error.response.data);
    } else if (error.request) {
      // ไม่ได้รับการตอบกลับจากเซิร์ฟเวอร์
      console.error('No response from server:', error.request);
      alert('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ โปรดตรวจสอบการเชื่อมต่ออินเทอร์เน็ต');
    } else {
      // ข้อผิดพลาดอื่นๆ
      console.error('An error occurred:', error.message);
      alert('เกิดข้อผิดพลาดที่ไม่คาดคิด โปรดลองใหม่อีกครั้ง');
    }
}
}
window.onload = Data;

// นาฬิกาเรียลไทม์
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    document.getElementById('clock').innerText = `${hours}:${minutes}:${seconds}`;
}

// อัพเดทนาฬิกาทุกวินาที
setInterval(updateClock, 1000);
updateClock(); // เรียกใช้ทันทีเมื่อโหลดหน้า

 // สร้างตัวเลือกเดือนและปี
 function populateMonthYear() {
    const monthSelect = document.getElementById('month');
    const yearSelect = document.getElementById('year');
    
    const months = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 
                  'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];
    
    // เพิ่มตัวเลือกเดือน
    monthSelect.innerHTML = '';
    months.forEach((month, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = month;
        monthSelect.appendChild(option);
    });
    
    // เพิ่มตัวเลือกปี (ปีปัจจุบัน -5 ถึง +5)
    yearSelect.innerHTML = '';
    const currentYear = new Date().getFullYear();
    for (let year = currentYear - 5; year <= currentYear + 5; year++) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year + 543; // แปลงเป็นปี พ.ศ.
        yearSelect.appendChild(option);
    }
    
    // ตั้งค่าเริ่มต้นเป็นเดือนและปีปัจจุบัน
    const currentMonth = new Date().getMonth();
    monthSelect.value = currentMonth;
    yearSelect.value = currentYear;
}

// สร้างปฏิทิน
function generateCalendar() {
    const calendarBody = document.getElementById('calendar-body');
    const selectedMonth = parseInt(document.getElementById('month').value);
    const selectedYear = parseInt(document.getElementById('year').value);
    
    // วันแรกของเดือน
    const firstDay = new Date(selectedYear, selectedMonth, 1);
    // วันสุดท้ายของเดือน
    const lastDay = new Date(selectedYear, selectedMonth + 1, 0);
    
    // ล้างปฏิทินเก่า
    calendarBody.innerHTML = '';
    
    // สร้างแถวใหม่
    let date = 1;
    let row = document.createElement('tr');
    
    // สร้างช่องว่างก่อนวันที่ 1
    for (let i = 0; i < firstDay.getDay(); i++) {
        const cell = document.createElement('td');
        cell.classList.add('empty');
        row.appendChild(cell);
    }
    
    // สร้างวันที่ในเดือน
    while (date <= lastDay.getDate()) {
        // ถ้าเป็นวันอาทิตย์และไม่ใช่วันแรกของเดือน ให้สร้างแถวใหม่
        if (row.children.length === 7) {
            calendarBody.appendChild(row);
            row = document.createElement('tr');
        }
        
        const cell = document.createElement('td');
        cell.textContent = date;
        
        // เช็คว่าเป็นวันนี้หรือไม่
        const today = new Date();
        if (date === today.getDate() && 
            selectedMonth === today.getMonth() && 
            selectedYear === today.getFullYear()) {
            cell.classList.add('today');
        }
        
        // เพิ่ม event listener สำหรับคลิกที่วัน
        cell.addEventListener('click', function() {
            // ลบ class selected จากทุกเซลล์
            document.querySelectorAll('.calendar td').forEach(td => {
                td.classList.remove('selected');
            });
            
            // เพิ่ม class selected ให้กับเซลล์ที่ถูกคลิก
            this.classList.add('selected');
            
            // แสดงรายการจองในวันที่เลือก (ตัวอย่าง)
            showBookingsForDate(selectedYear, selectedMonth, date);
        });
        
        row.appendChild(cell);
        date++;
    }
    
    // เพิ่มแถวสุดท้าย
    calendarBody.appendChild(row);
    
    // ทำให้วันแรกของเดือนเป็นวันที่ถูกเลือก
    const firstDateCell = calendarBody.querySelector('td:not(.empty)');
    if (firstDateCell) {
        firstDateCell.click();
    }
}

// แสดงรายการจองในวันที่เลือก
function showBookingsForDate(year, month, day) {
    const eventList = document.getElementById('event-list');
    eventList.innerHTML = '';
    
    // ในที่นี้เป็นข้อมูลตัวอย่าง ในการใช้งานจริงคุณจะต้องเรียกข้อมูลจาก API หรือฐานข้อมูล
    const selectedDate = new Date(year, month, day);
    const formattedDate = `${day}/${month + 1}/${year}`;
    
    // สร้างข้อมูลตัวอย่าง
    if (Math.random() > 0.5) { // สุ่มว่าจะมีข้อมูลหรือไม่
        const sampleBookings = [
            { 
                name: 'ประชุมทีม', 
                start: '09:00', 
                end: '10:30',
                booker: 'สมชาย ใจดี' 
            },
            { 
                name: 'นำเสนองาน', 
                start: '13:00', 
                end: '14:30',
                booker: 'สมหญิง รักงาน' 
            }
        ];
        
        sampleBookings.forEach(booking => {
            const bookingItem = document.createElement('div');
            bookingItem.classList.add('booking-item');
            bookingItem.innerHTML = `
                <strong>${booking.name}</strong>
                <p>เวลา: ${booking.start} - ${booking.end}</p>
                <p>ผู้จอง: ${booking.booker}</p>
            `;
            eventList.appendChild(bookingItem);
        });
    } else {
        eventList.innerHTML = '<p>ไม่มีการจองในวันที่เลือก</p>';
    }
}

// กำหนดการทำงานของปุ่มเดือนก่อนหน้า
document.getElementById('prev-month').addEventListener('click', function() {
    let month = parseInt(document.getElementById('month').value);
    let year = parseInt(document.getElementById('year').value);
    
    month--;
    if (month < 0) {
        month = 11;
        year--;
    }
    
    document.getElementById('month').value = month;
    document.getElementById('year').value = year;
    generateCalendar();
});

// กำหนดการทำงานของปุ่มเดือนถัดไป
document.getElementById('next-month').addEventListener('click', function() {
    let month = parseInt(document.getElementById('month').value);
    let year = parseInt(document.getElementById('year').value);
    
    month++;
    if (month > 11) {
        month = 0;
        year++;
    }
    
    document.getElementById('month').value = month;
    document.getElementById('year').value = year;
    generateCalendar();
});

// กำหนดการทำงานของปุ่มวันนี้
document.getElementById('today').addEventListener('click', function() {
    const today = new Date();
    document.getElementById('month').value = today.getMonth();
    document.getElementById('year').value = today.getFullYear();
    generateCalendar();
});

// เมื่อโหลดหน้าเสร็จ
document.addEventListener('DOMContentLoaded', function() {
    populateMonthYear();
    generateCalendar();
});
