const Person2 = require('./Person2');     
const {Person, f2} = require('./Person2');   //使用相對路徑 ， require時只需打檔名
//下兩次require 只會執行一次裡面內容，之後不會再重複執行

const p1 = new Person('David', 25);

console.log(p1.toString());    //2.
console.log(f2(9));    //3.