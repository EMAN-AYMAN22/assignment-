//1
//The main difference comes down to control and compatibility:
//  for...of is a flexible modern loop construct, 
// while forEach is an array method that runs a callback function on every item
// Use for...of when:
// You need to stop or skip iterations (break or continue).
// You are executing asynchronous operations (async/await).
//Use forEach when:
//You need immediate access to both the element and its index without extra syntax: arr.forEach((item, index) => ...)

//2
//What is Hoisting?
//Hoisting is JavaScript's default behavior of moving variable and function declarations to the top of their scope before executing any code.
// Accessing var before initialization

console.log(myVar); // Outputs: undefined (doesn't crash!)
var myVar = "Hello World";

// Calling a hoisted function
sayHi(); // Outputs: "Hi!"

function sayHi() {
  console.log("Hi!");
}

//What is the Temporal Dead Zone (TDZ)?
//The Temporal Dead Zone (TDZ) is the time span between when a variable's scope starts and when the line declaring it is executed.

{ 
  // --- TDZ Starts Here for myLet ---
  // myLet is hoisted to the top of this block scope, 
  // but it sits uninitialized in memory.
  
  console.log("Doing some work..."); 
  
  // console.log(myLet);   
  let myLet = 42; 
  // - TDZ Ends Here -
  console.log(myLet);
}

//3
//he core difference between ==and ===:
//== converts types before comparing (called implicit coercion).
//=== does NOT convert types — if the types are different, it immediately returns false.

//4
try {
  // Code that might fail
} catch (error) {
  // Code that runs IF an error happens above
} finally {
  // Optional: Code that ALWAYS runs, error or not
}
//n asynchronous operations (like fetching API data, reading files, or querying a database), failures are common and often outside your control—a user's network drops, a server goes down, or an API returns invalid JSON.
//Without error handling, an uncaught error in an async function can leave your app in a broken state, hang the UI, or result in an Unhandled Promise Rejection.


//5
//Type conversion—often called explicit coercion—happens when you intentionally convert a value from one type to another using built-in functions or constructors.
const str = "42";
const num = Number(str); 
console.log(typeof num);

//Type coercion—often called implicit conversion—happens automatically under the hood by the JavaScript
console.log("5" + 2);