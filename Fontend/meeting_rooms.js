const BASE_URL = 'http://localhost:8001'
let mode = 'CREATE' // default mode
let selectedID = ''
const submitData = async () => {
    const urlParams = new URLSearchParams(window.location.search); // ดึง query parameters
    const room_name = urlParams.get('room_name');
    const capacity = urlParams.get('capacity');
    const location = urlParams.get('location');
    const equipment = urlParams.get('equipment');

    console.log(room_name, capacity, location, equipment);
    let userData = {
        room_name: room_name,
        capacity: capacity,
        location: location,
        equipment: equipment
    }
    try {
        const response = await axios.post(`http://localhost:8001/MeetingRooms`, userData)
        console.log("response", response.data);
        if (response.data.success) {
            alert('Successfully')
            window.location.href='booking.html';
        } else {
            alert('Information Failed: ' + response.data.message)
        }
    } catch (error) {
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
window.onload = submitData();

