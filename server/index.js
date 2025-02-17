const express = require('express');
const bodyParset = require('body-parser');
const mysql = require('mysql2/promise');
const app = express();

const port = 8000;

app.use(bodyParset.json());

let users = []
// let counter = 1
let conn = null

const initMySQL = async () => {
   conn = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'webdb',
        port: 8830
    })
}

// app.get('/testdb', (req,res) => {
//     let conn = mysql.createConnection({
//         host: 'localhost',
//         user: 'root',
//         password: 'root',
//         database: 'webdb',
//         port: 8830

//     }).then((conn) => {
//         conn
//         .query('SELECT * FROM users')
//         .then((result) => {
//             res.json(result[0])
//         })
//         .catch((error) => {
//             console.log('error',error.message)
//             res.status(500).json({error: 'Error fletching users'})
//         })
//     })
// })

// app.get('/testdbnew',async (req,res) => {
//     try{
//         const result = await conn.query('SELECT * FROM users')
//         res.json(result[0])
//     }catch (error){
//         console.log('error',error.message)
//         res.status(500).json({error: 'Error fletching users'})
//     } 
// })
/*
GET /users สำหรับget users ทั้งหมดที่บันทึกไว้
Post /users สำหรับสร้าง users ใหม่บันทึกเข้าไป 
GET /users /:id สำหรับดึง users รายคนออกมา
PUT /users /:id สำหรับแก้ไข user รายคน ตามidที่บันทึกเข้าไป
Delete /users /:id สำหรับลบ user รายคน ตามidที่บันทึกเข้าไป
 */

//path: /user ใช้สำหรับสร้างข้อมูลของ user ทั้งหมด GET /users สำหรับget users ทั้งหมดที่บันทึกไว้
app.get('/users', async (req,res) => {
    const result = await conn.query('SELECT * FROM users')
    res.json(result[0])
});

//path: /user ใช้สำหรับสร้างข้อมูลของ userใหม่ Post /users สำหรับสร้าง users ใหม่บันทึกเข้าไป
app.post('/users', async(req,res) => {
    let user = req.body;
    const result = await conn.query('INSERT INTO users SET ?',user)
    console.log('results',result)
    res.json({
        message: "Create  user successfully", 
        data: result[0]
    });
    // user.id = counter
    // counter +=1

    // users.push(user);
    // res.json({
    //     message: "Create new user successfully",
    //     user:user
    // });
})

//GET /users /:id สำหรับดึง users รายคนออกมา
app.get('/users/:id',  (req,res) => {
    let id = req.params.id;
    //ค้นหา users หรือ index ที่ต้องการดึงข้อมูล
    let selectIndex = users.findIndex(user => user.id == id)

    res.json(users[selectIndex])
});

//path: PUT /user/:id ใช้สำหรับแก้ไขข้อมูลของ user โดยใช้ id เป็นตัวบ่งชี้ 
app.put('/users/:id', (req,res) => {
    let id = req.params.id;
    let updateUser = req.body;
    //หา users จาก id ที่ส่งมา
    let selectIndex = users.findIndex(user => user.id == id)

        users[selectIndex].firstname = updateUser.firstname || users[selectIndex].firstname;
        users[selectIndex].lastname = updateUser.lastname || users[selectIndex].lastname;
        users[selectIndex].age = updateUser.age || users[selectIndex].age;
        users[selectIndex].gender = updateUser.gender || users[selectIndex].gender;

    // //แก้ไขข้อมูลของ user ที่หาเจอ
    // //users[selectIndex] = updateUser;
    // if(updateUser.firstname){
    //     users[selectIndex].firstname = updateUser.firstname;
    // }
    // if(updateUser.lastname){
    //     users[selectIndex].lastname = updateUser.lastname;
    // }

    res.json({
        message: "Update user successfully",
        data: {
            user: updateUser,
            indexUpdate: selectIndex
         }
    });  
})

//path: Delete /user/:id ใช้สำหรับลบข้อมูลของ user โดยใช้ id เป็นตัวบ่งชี้
app.delete('/users/:id', (req,res) => {
    let id = req.params.id;
    //หา index ของ user ที่ต้องการลบ
    let selectIndex = users.findIndex(user => user.id == id)

    //ลบ 
    users.splice(selectIndex, 1)
    res.json({
        message: "Delete user successfully",
        indexDelete: selectIndex
    });
})

// app.listen(port, (req,res) => {
//     console.log(`Http Server is running on port`+ port);
// });

app.listen(port, async (req,res) => {
    await initMySQL()
    console.log(`Http Server is running on port`+ port);
});