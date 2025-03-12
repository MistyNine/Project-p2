const BASE_URL = 'http://localhost:8000'

window.onload = async () => {
    await loadData()
}
const loadData = async () => {
    console.log('User page loaded')
    //1. load user ทั้งหมด จาก API ที่เตรียมไว้
    const response = await axios.get(`${BASE_URL}/users`)

    console.log(response.data)

    const userDom = document.getElementById('user')
    //2. นำ user ทั้งหมด โหลดกลับเข้าไปใน html (คือเอาไปแสดงใน html)
    let htmlData = `<div>`
    for (let i = 0; i < response.data.length; i++) {
        let user = response.data[i]
        htmlData += `<div>
        <table>
         <tr class='header-form'>
            <th>ID</th>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Edit</th>
            <th>Delete</th>
        </tr>
            <tr class='data-form'> 
                <td class='row1'>${user.id}</td>
                <td class='row2'>${user.firstname}</td>
                <td>${user.lastname}</td>
                <td> <a href='index_1.html?id=${user.id}'><button class='edit'>Edit</button></a></td>
                <td><button class='delete' data-id='${user.id}'>Delete</button></td>
            </tr>          
        </table>
        </div>`
    }
    htmlData += `</div>`
    userDom.innerHTML = htmlData

    //3. ลบ user
    const deleteDoms = document.getElementsByClassName('delete')
    for (let i = 0; i < deleteDoms.length; i++) {
        deleteDoms[i].addEventListener('click', async (event) => {
            //ดึง id ของ user ที่ต้องการลบ
            const id = event.target.dataset.id
            try {
                await axios.delete(`${BASE_URL}/users/${id}`)
                loadData() //recursive function =   เรียกใช้ฟังกก์ชันตัวเอง
            } catch (error) {
                console.error('error', error)
            }
        })
    }
} 