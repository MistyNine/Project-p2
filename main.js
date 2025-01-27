// console.log('Hello World');
// console.log('hello Worlddddddd');
// prompt('What is your name?')

// // /* ประกาศตัวแปร string number boolean object Array */
// //let จะปรับเปลี่ยนค่าให้กับตัวแปรได้
// let firstname ='John'; //string
// const idcard = '1234';
// console.log(firstname)

// let age =25; //number
// let height = 5.9;

// let isMarried = false; //boolean
// //firstname = 'xxx'; //ค่า firstnameมีการปรับเปลี่ยน
// //let firstname = 'Johnnnnn' //error
// console.log('My name is ',firstname,'and I am ',age,'years old');

// /* + - * / % */
// let number1 =5;
// let number2 =10;
// //result = num1+num2
// let result = number1+number2;
// console.log(result);

// //string +กัน
// let number3 ='4';
// let number4 ='8';
// //result = num1+num2
// let result1 = number3+number4;
// console.log('New number is',result1);

/* เครื่องหมาย == != > < >= <= */
// let condition1(เป็นboolean) = number1 >= number2;//boolean ค่าที่ได้จะเป็น true หรือ false
// console.log('result of condition is ',condition1)

// let number1 =5;
// let number2 =5;
// // if-else condition
// if(number1 != number2) {
//     console.log('this is if');
// } else if(number1 == number2) {
//     console.log('this is else if');  
// } else {
//     console.log('this is else');
// }

// /** คิดเกรด */
// let score = prompt('Enter your score'); 
// console.log('Your score is '+ score);
// // if-else condition
// if(score >= 80) {
//     console.log('You are grade A');
// } else if(score >= 70) {
//     console.log('You are grade B');
// } else if(score >= 60) {            
//     console.log('You are grade C');
// } else if(score >= 50) {
//     console.log('You are grade D');
// } else {
//     console.log('You are grade F');
// } //ถ้าเงื่อนไข(if)ไม่ถูกต้องต้อง จะทำการเช็คในเงื่อนไข(else-if)ถัดไปเรื่อยๆจนกว่าจะเจอเงื่อนไขที่ถูกต้อง

/** &&และ ||หรือ ! not หรือไม่(นิเสธ) */

// let number1 =5;
// let number2 =8;
// /** true && true */
// let condition = number1 >=3 && number2 >=5;
// console.log('result of condition',condition);

// /** true || false = true*/
// let condition = number1 >=3 || number2 >=10;
// console.log('result of condition',condition);

// let age = 30;
// let gender = 'male';

// if(age >= 20 && gender == 'male') {
//     console.log('You are male adult');
// }

// let number =23;
// /** true || false = !(true)กลายเป็น falseทันที */
// if (!(number % 2 == 0)) { //เงื่อนไขคือถ้าnum%2 แล้วไม่ได้เศษ0จะปิ้นออกมา ต้องเป็นเลขหารไม่ลงตัว
//     console.log('you are even number');
// }

// /** while loop 
//     for */
// let counter = 0;
// console.log('while loop');

// while(counter <= 10) { //true
//     console.log('while loop');
//     counter = counter+1;
// }

// /**for loop */
// let counter = 0;
// for(let counter=0; counter<10; counter = counter+1) {
//     console.log('for loop');
// }

/** Array */
// let age1 = 20;
// let age2 = 30;
// let age3 = 40;
// let age4 = 50;
// console.log(age1,age2,age3,age4);

// let ages = [20,30,40,50,55];
// console.log('array',ages[0],ages[1]);

// let ages = [30,35,40];
// console.log('new age',ages[2]);
// console.log('age list',ages);

// /**1.แทนที่ค่าใน array */
// ages = [45,50]
// console.log('new age',ages);

// /**2.ต่อค่าใน array */
// ages.push(55);
// console.log('new age',ages);

// let ages = [30,35,40,45,50];
// if (!ages.includes(40)) {//ถ้าไม่มีค่า 40 ใน array 
//     console.log('You have to be 40');
// }

// let ages = [90,60,40,45,50];
// console.log(ages);
// ages.sort();
// console.log(ages);

// let name_list = ['John','Bob','Alice','Mary'];
// name_list.push('Mike');
// console.log(name_list.length);
// console.log(name_list[0]);
// console.log(name_list[1]);
// console.log(name_list[2]);

// for (let index = 0; index < name_list.length; index++) {
//     console.log('names list ',name_list[index]);
// }

/**object */
// //ยาวเกินไป ข้อมูลที่ต้อง console.log เยอะ
// let age1 = 100;
// let name1 = 'wes';
// let grade = 100;
// let age2 = 90;
// let name2 = 'zz';
// let grade2 = 100;
// let student = [{ //เรียกใช้แค่ obj student
//      age : 90,
//      name : 'zz',
//      grade : 'A'
// },{
//     age : 66,
//     name : 'aa',
//     grade : 'B'
// }];

// student.push({
//     age : 90,
//     name : 'QQ',
//     grade : 'Q'
// });

// student.pop();//pop ตัวค่าข้อมูลสุดท้ายออก

// for (let index = 0; index < student.length; index++) {
//     console.log('student number',(index + 1));
//     console.log('name',student[index].name);
//     console.log('age',student[index].age);
//     console.log('grade',student[index].grade);
// }

// /** object + array */
// let scores1 = 50
// let scores2 = 90
// let grade= ''
// //ประกาาศ function ในการคำนวณเกรด ชื่อ function คือ calculateGrade , มี parameter ชื่อ scores
// function calculateGrade(scores) {
//     //let calculateGrade = (scores) =>(arrow function ใช้งานได้เหมือนฟังก์ชันธรรมดา) แต่ไม่สามารถใช้งานได้ในทุกกรณี
//     if(scores >= 80) {
//         grades = 'A';
//     }   else if(scores >= 70) {
//         grades = 'B';
//     }   else if(scores >= 60) {
//         grades = 'C';
//     }   else if(scores >= 50) {-
//         grades = 'D';
//     }   else {
//         grades = 'F';
//     }
//     return grades;
// }

// let student1 = calculateGrade(scores1);
// let student2 = calculateGrade(scores2);
// console.log('grade:',student1,student2);

/**array */
// let scores = [10,20,30,40,50];
// for (let index = 0; index < scores.length; index++) {
//     console.log(scores[index]);
// }

// scores[0] = scores[0] * 2;
// scores[1] = scores[1] * 2;
// scores[2] = scores[2] * 2;
// scores[3] = scores[3] * 2;
// scores[4] = scores[4] * 2;

// scores = scores.map((s) => { //map คือการวนลูปค่าใน array แล้ว return ค่าออกมาใหม่
//     return s * 2;
// })

// scores.forEach((s) => {//arrow function วนลูปค่าใน arrayแบบ forEach //forEach คือการวนลูปค่าใน array แต่สั้นกว่า
//     console.log('New score',s);
// })

// let scores = [10,20,30,40];
// // let newscores = [];
// for (let index = 0; index < scores.length; index++) {
//     console.log('Score',scores[index]);
//     // if (scores[index] >= 30) {
//     //     newscores.push(scores[index]);
//     // }
// }

// let newscores = scores.filter((s) => { //filter จะเช็คค่าใน array ตามเงื่อไขที่ตั้ง return ค่าใหม่ออกมา
//     return s >= 20;
// });
// newscores.forEach((ns) => { //แสดงค่าใน array ใหม่
//     console.log('New score',ns);
// });

/** object function */
let students = [
    {
        name : 'John',
        score : 90,
        grade : 'A'
    },
    {
        name : 'Jane',
        score : 75,
        grade : 'B'
    }, 
    {
        name : 'Jim',
        score : 60,
        grade : 'C'
    }                     
]
let student = students.find((s) => { //.find ค้นหาค่าใน array แล้ว return ค่าออกมา
    if(s.name == 'Jane'){
        return true
    }
})

let doubleScores_student = students.map((s) => {
    s.score = s.score * 2;
})

let highscore_student = students.filter((s) => {
    if(s.score >= 80){
        return true
    }
})
console.log('student :',student);
console.log('highscore_student:',highscore_student);