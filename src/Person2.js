class Person{                            //class=> 可改為所有變數(ex:function ....)
  constructor(name='noname', age=0){
    this.name = name;
    this.age = age;
  }

  toString(){
    const{name, age}= this;
    return JSON.stringify({name, age});   //排除屬性 只要這兩個(name, age)
  }
}
const f2 = a=>a*a;
const f3 = a=>a*a*a;    //全域變數; 若沒匯出，找不到此變數

//只匯出下面這兩個 (f3不匯出)
console.log(`這是在Person2裡`);      //1. 先執行
module.exports = {Person, f2};    //同時匯出->包成物件