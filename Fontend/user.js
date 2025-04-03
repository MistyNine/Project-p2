
const BASE_URL = 'http://localhost:8001'
window.onload = async () => {
    await loadData()
}

const loadData = async () => {
    console.log('user page onload')
    //1. load all user จาก API ที่เราสร้างไว้
    const response = await axios.get (`http://localhost:8001/Users`)
    console.log(response.data)

    const userDOM = document.getElementById('user')
    //2.นำ user ทั้งหมด load กลับเข้าไป html 
    
    let htmlData = '<div>'
    for(let i = 0; i < response.data.length; i++){
    let user = response.data[i]
    htmlData += `<tr> 
        <td>${user.id }</td>
        <td>${user.username}</td>
        <td>${user.password}</td>
        <td>${user.email}</td>
        <td>${user.role}</td>
         <td>
            <a href='adap.html?id=${user.id}'><button class='edit'>แก้ไข</button></a>    
            <button class='delete' data-id='${user.id}'>ลบ</button>
        </td>
    </tr>  `;
    }
    htmlData += `</div >`
    userDOM.innerHTML = htmlData

    //3. ให้ปุ่ม Delete ทำงาน
    const deleteDOM = document.getElementsByClassName('delete')
    for(let i = 0; i < deleteDOM.length; i++){
    deleteDOM[i].addEventListener('click', async (event) => {
        //ดึง id ของ user ที่ต้องการลบ
        const id =  event.target.dataset.id
        try{
            await axios.delete(`${BASE_URL}/Users/${id}`)
            loadData()// recusive function คือ การเรียก function ตัวเอง 
        }catch(error){
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
    })
}
}