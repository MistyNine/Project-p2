const BASE_URL = 'http://localhost:8001';

let mode = 'CREATE' // default mode
let selectedID = ''


const validateUserData = (userData) => {
   let errors = [];

   if (!userData.username) {
       errors.push('Please enter your name');
   }
   if (!userData.password) {
       errors.push('Please enter your password');
   }
   if (!userData.email) {
       errors.push('Please enter your email');
   }

   if (!userData.role) {
       errors.push('Please select your role');
   }
   
   return errors;
}

const register = async () => {
    const urlParams = new URLSearchParams(window.location.search); // ดึง query parameters
    const user_id = urlParams.get('user_id');
    const email = urlParams.get('email');
    const username = urlParams.get('username');
    const password = urlParams.get('password');
    const role = urlParams.get('role');
  
    console.log(email, username, password, role); // ตรวจสอบค่าที่ดึงมา
  
    // ข้อมูลที่ต้องการส่งไปยังเซิร์ฟเวอร์
    let userData = {
      user_id:user_id,
      email: email,
      username: username,
      password: password,
      role: role
    };
  
    try {
      // ส่งข้อมูลไปยังเซิร์ฟเวอร์เพื่อบันทึกในฐานข้อมูล
      const response = await axios.post('http://localhost:8001/register', userData);
          console.log(response.data);
          alert('Successfully')
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
  
  // เมื่อโหลดหน้า, เรียกฟังก์ชัน register
  window.onload = register();