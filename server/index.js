const express = require('express');
const bodyParset = require('body-parser');
const mysql = require('mysql2/promise');
const cors = require('cors');
const e = require('express');
const app = express();

const port = 8000;

app.use(bodyParset.json());
app.use(cors());

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
const validateData = (userData) => {
    let errors = []

    if(!userData.firstname ) {
        errors.push('กรุณากรอกชื่อ')
    }
    if(!userData.lastname ) {
        errors.push('กรุณากรอกนามสกุล')
    }
    if(!userData.age ) {
        errors.push('กรุณากรอกอายุ')
    }
    if(!userData.gender ) {
        errors.push('กรุณากรอกเพศ')
    }
    if(!userData.interest ) {
        errors.push('กรุณากรอกความสนใจ')
    }
    if(!userData.description ) {
        errors.push('กรุณากรอกคำอธิบาย')
    }
    return errors;
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
app.get('/users/:id', async (req, res) => { 
    try {
     let id = req.params.id;
     const results = await conn.query('SELECT * FROM users WHERE id = ?', id)
     if (results[0].length == 0) {
        throw { statusCode: 404, message: 'User not found' }
     } 
     res.json(results[0][0])
    } catch (error) {
      console.error('error', error.message)
      let statusCode = error.statusCode || 500
      res.status(500).json({
        message: 'something went wrong',
        errorMessage: error.message  
      })
    }
})

//path: /user ใช้สำหรับสร้างข้อมูลของ userใหม่ Post /users สำหรับสร้าง users ใหม่บันทึกเข้าไป
app.post('/users', async (req, res) => {
    try {
        let user = req.body;
        const errors = validateData(user)
        if(errors.length > 0) {
            throw {
                message: 'กรุณากรอกข้อมูลให้ครบถ้วน',
                errors: errors
            }
        }
        const result = await conn.query('INSERT INTO users SET ?', user)
        res.json({
            message: "Create  user successfully",
            data: result[0]
        });
    } catch (error) {
        const errorMessage = error.message || 'something went wrong'
        const errors = error.errors || []
        console.error('error message ', error.message)
        res.status(500).json({
            message: errorMessage,
            errors: errors
            
        })
    }
})
// user.id = counter
// counter +=1

// users.push(user);
// res.json({
//     message: "Create new user successfully",
//     user:user
// });

// GET /users /:id สำหรับดึง users รายคนออกมา
app.get('/users', async (req,res) => {
    const results = await conn.query('SELECT * FROM users ')
    res.json(results[0])
});

//path: PUT /user/:id ใช้สำหรับแก้ไขข้อมูลของ user โดยใช้ id เป็นตัวบ่งชี้ 
app.put('/users/:id', async (req, res) => {
    try {
        let id = req.params.id;
        let updateUser = req.body;
        const result = await conn.query('UPDATE users SET ? WHERE id = ?', [updateUser,id])
        res.json({
            message: "Update  user successfully",
            data: result[0]
        });
    } catch (error) {
        console.error('error', error.message)
        res.status(500).json({
            message: 'something went wrong',
            errorMessage: error.message
        })
    }
})
// let selectIndex = users.findIndex(user => user.id == id)
 // users[selectIndex].firstname = updateUser.firstname || users[selectIndex].firstname;
    // users[selectIndex].lastname = updateUser.lastname || users[selectIndex].lastname;
    // users[selectIndex].age = updateUser.age || users[selectIndex].age;
    // users[selectIndex].gender = updateUser.gender || users[selectIndex].gender;
    // res.json({
    //     message: "Update user successfully",
    //     data: {
    //         user: updateUser,
    //         indexUpdate: selectIndex
    //     }
    // });
// //แก้ไขข้อมูลของ user ที่หาเจอ
// //users[selectIndex] = updateUser;
// if(updateUser.firstname){
//     users[selectIndex].firstname = updateUser.firstname;
// }
// if(updateUser.lastname){
//     users[selectIndex].lastname = updateUser.lastname;
// }

//path: Delete /user/:id ใช้สำหรับลบข้อมูลของ user โดยใช้ id เป็นตัวบ่งชี้
app.delete('/users/:id', async(req, res) => {
    try {
        let id = req.params.id;
        const result = await conn.query('DELETE FROM users WHERE id = ?', id)
        res.json({
            message: "Delete user successfully",
            data: result[0]
        }); 
    } catch (error) {
        console.error('error', error.message)
        res.status(500).json({
            message: 'something went wrong',
            errorMessage: error.message
        })
    }
})

// app.listen(port, (req,res) => {
//     console.log(`Http Server is running on port`+ port);
// });

app.listen(port, async (req, res) => {
    await initMySQL()
    console.log(`Http Server is running on port` + port);
});