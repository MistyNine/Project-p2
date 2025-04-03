const BASE_URL = 'http://localhost:8001'
window.onload = async () => {
    await loadData()
}

const loadData = async () => {
    console.log('user page onload')
    //1. load all user จาก API ที่เราสร้างไว้
    const response = await axios.get (`${BASE_URL}/MeetingRooms`)
    console.log( response.data )

    const userDOM = document.getElementById('room')
    //2.นำ user ทั้งหมด load กลับเข้าไป html 
    
    let htmlData = '<div>'
    for(let i = 0; i < response.data.length; i++){
    let user = response.data[i]
    htmlData += `<tr> 
        <td>${user.id}</td>
        <td>${user.room_name}</td>
        <td>${user.capacity}</td>
        <td>${user.location}</td>
        <td>${user.equipment}</td>
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
            await axios.delete(`${BASE_URL}/MeetingRooms/${id}`)
            loadData()// recusive function คือ การเรียก function ตัวเอง 
        }catch(error){
            console.log('error',error);
            
      }
    })
}
}