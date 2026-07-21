///Assignment 1

///////////////////Q1///////////////////
// let number=Number("123")
// number+=7
// console.log(number);
//console.log(typeof(number))




////////////////////////Q2/////////////////////

// let variable=prompt("Enter the value to check is it invalid or not")
// if (variable  ==0 || false || "" || null ||undefined||NaN||-0){
//     console.log("Your variable is invalid");
// }else console.log("Your variable is valid");

/////////Or////////////

// if (!variable || variable === "0") {
//     console.log("Your variable is invalid");
// } else {
//     console.log("Your variable is valid");
// }



////////////////////Q3//////////////////

// for(let i=0;i<10;i++){
// if(!(i%2 ===0)){
// console.log(i);
// }else{continue}
// }


////////////////Q4/////////////////////

// const numbers=[0,6,2,5,8,5,4,4]
// let evenNums=numbers.filter((even)=>{ if( even%2===0){return even;
// }})
// console.log(evenNums);



////////////////Q5//////////////////

// const arr1=[1,3,5,6,8,10]
// const arr2=[8,9,0,1]
// const mergeArr=[...arr1,...arr2]
// console.log(mergeArr);


//////////////Q6///////////////////

// let day=Number(prompt("Enter the value between 1...7 to return a Day"))
// switch (true) {
//     case (day==1):
//         console.log("to day is sunday");
//         break;
//     case (day==2):
//         console.log("to day is monday");
//         break;
//     case (day==3):
//         console.log("to day is tueseday");
//         break;
//     case (day==4):
//         console.log("to day is wednesday");
//         break;
//     case (day==5):
//         console.log("to day is thursday");
//         break;
//     case (day==6):
//         console.log("to day is saturday ");
//         break;
//     case (day==7):
//         console.log("to day is sunday");
//         break;

//     default:
//         console.log("please Enter the value between 1...7 to return a Day");
//         break;
// }


////////////////Q7/////////////////

// const arr=["aa", "ab", "abc"]
// let length=arr.map((x)=>{return x.length})
// console.log(length);


/////////////////Q8///////////////

// let num=Number(prompt('enter a number to ckeck if a number is divisible by 3 and 5.'))
// if (num %3===0 && num%5===0 ) {
//  console.log(`the numner ${num} divisible by 3 and 5`);
// }else{console.log(`the numner ${num} is not divisible by 3 and 5`);
// }



/////////////////Q9//////////////

//  let num=Number(prompt('enter a number to square of a number'))
// const square=  (num) => {
// return num**2
// }
// console.log(square(num));


///////////////Q10////////////////

// const user = {
//   name: "Ayman",
//   age: 22,
//   city: "Cairo"
// }

// function formatUserInfo(person) {
//   const { name, age, city } = person;
//   return `User ${name} is ${age} years old and lives in ${city}.`;
// }
// console.log(formatUserInfo(user));


///////////////Q11////////////////

// function sum(x,y,...z) {
//     const sumZ = z.reduce((sum, curr) => sum + curr, 0);
//     return x+y+sumZ
// }
// console.log(sum(2,8,11));


//////////////////////Q12//////////////

// function message() {
//     return new Promise((resolve)=>{
//        setTimeout(()=>{
//         resolve('success')
//         ,3000})
        
//     })
// }
// message().then((message) => {
//   console.log(message); 
// });


/////////////////Q13///////////////////

// function largestNum(arr) {
//  let largest=  Math.max(...arr)
//  return largest
// }
// console.log(largestNum([2,8,7,5]));

/////////////or//////////////


//  function largest(arr) {
//  const maxNumber = arr.reduce((max, current) => {
//   return current > max ? current : max;
// });
// return maxNumber
//  }
// console.log(largest([8,9,10,7]));


///////////////Q14////////////


// const user = {
//   name: "Ayman",
//   age: 22,
//   city: "Cairo"
// }

// function keys(person) {
//   const keys=Object.keys(person)
//   return keys
// }
// console.log(keys(user));


//////////////////////Q15//////////////

// function splitIntoWords(str) {
//   return str.split(" ");
// }

// console.log(splitIntoWords("The quick brown fox"));
