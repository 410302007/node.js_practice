
const Person2 = require('./Person2');   //使用相對路徑 ， require時只需打檔名

const p1 = new Person2.Person('David', 25);

console.log(p1.toString());    //2.
console.log(Person2.f2(9));    //3.