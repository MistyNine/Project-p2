document.addEventListener("DOMContentLoaded", function () {
    const bookButtons = document.querySelectorAll(".book-button:not([disabled])");

    bookButtons.forEach(button => {
        button.addEventListener("click", function () {
            const roomCard = this.closest(".room-card");
            const roomName = roomCard.querySelector(".room-name").textContent;

            if (confirm(`Do you want to book ${roomName}?`)) {
                saveBooking(roomName);
                alert(`${roomName} has been booked successfully!`);

                // Update UI
                this.textContent = "จองแล้ว";
                this.disabled = true;
                roomCard.classList.remove("available");
                roomCard.classList.add("occupied");
                roomCard.querySelector(".status-badge").textContent = "Occupied";

                
                setTimeout(function () {
                    window.location.href = "meeting_rooms.html";
                }, 100); 
            }
        });
    });

    function saveBooking(roomName) {
        let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
        bookings.push({ roomName, bookedAt: new Date().toISOString() });
        localStorage.setItem("bookings", JSON.stringify(bookings));
    }
});

// ฟังก์ชันสำหรับกรองห้องประชุม
function filterRooms(filter) {
    const roomCards = document.querySelectorAll('.room-card');

    roomCards.forEach(card => {
        const isAvailable = card.classList.contains('available');
        const capacityTag = card.querySelector('.capacity-tag').innerText;
        const capacity = parseInt(capacityTag.match(/\d+/)[0]); // ดึงความจุออกจากข้อความ

        // ตรวจสอบเงื่อนไขการกรอง
        if (filter === 'ทั้งหมด') {
            card.style.display = 'block';
        } else if (filter === 'ห้องที่ว่าง') {
            card.style.display = isAvailable ? 'block' : 'none';
        } else if (filter === 'ขนาดเล็ก (< 10)') {
            card.style.display = (capacity < 10) ? 'block' : 'none';
        } else if (filter === 'ขนาดกลาง (10-15)') {
            card.style.display = (capacity >= 10 && capacity <= 15) ? 'block' : 'none';
        } else if (filter === 'ขนาดใหญ่ (> 15)') {
            card.style.display = (capacity > 15) ? 'block' : 'none';
        }
    });
}

// ฟังก์ชันสำหรับจัดการการคลิกปุ่มกรอง
document.querySelectorAll('.filter-button').forEach(button => {
    button.addEventListener('click', (event) => {
        // ลบคลาส active จากทุกปุ่ม
        document.querySelectorAll('.filter-button').forEach(btn => btn.classList.remove('active'));
        
        // เพิ่มคลาส active ให้กับปุ่มที่ถูกคลิก
        event.target.classList.add('active');

        // เรียกใช้ฟังก์ชันกรองห้อง
        const filterText = event.target.innerText;
        filterRooms(filterText);
    });
});

// เริ่มต้นด้วยการแสดงห้องทั้งหมด
filterRooms('ทั้งหมด');





