const BASE_URL = 'http://localhost:8000'

window.onload =  async () => {
    await loadData()
}
const loadData =async () => {
    console.log('User page loaded')
    //1. load user ทั้งหมด จาก API ที่เตรียมไว้
    const response = await axios.get(`${BASE_URL}/users`)

    console.log(response.data)

    const userDom = document.getElementById('user')
    //2. นำ user ทั้งหมด โหลดกลับเข้าไปใน html (คือเอาไปแสดงใน html)
    let htmlData = `<div>`
    for (let i=0; i<response.data.length; i++) {
        let user = response.data[i]
        htmlData += `<div>
        ${user.id} ${user.firstname} ${user.lastname}
        <a href='index_1.html?id=${user.id}'><button>Edit</button></a>
        <button class='delete' data-id='${user.id}'>Delete</button>
        </div>`
    }
    htmlData += `</div>`
    userDom.innerHTML = htmlData

    //3. ลบ user
    const deleteDoms = document.getElementsByClassName('delete')
    for (let i=0; i<deleteDoms.length; i++) {
        deleteDoms[i].addEventListener('click', async (event) =>{
            //ดึง id ของ user ที่ต้องการลบ
            const id = event.target.dataset.id
            try{
                await axios.delete(`${BASE_URL}/users/${id}`)
                loadData() //recursive function =   เรียกใช้ฟังกก์ชันตัวเอง
            }catch(error) {
                console.error('error', error)
            }
        })
    }
} 