
const Person = require('./Person');   //使用相對路徑 ， require時只需打檔名

const p1 = new Person('David', 25);

console.log(p1.toString()); 