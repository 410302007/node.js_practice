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
export const f2 = a=>a*a;   //可在不同位置匯出
const f3 = a=>a*a*a;    //全域變數; 若沒匯出，找不到此變數


console.log(`這是在Person2裡`);      //1. 先執行
export default Person;   //預設匯出的東西; default只能有一個

export {f3};  //export包成物件 或 -> export const f3 