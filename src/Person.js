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
module.exports = Person;