import Person, {f2,f3} from './Person3.mjs' ;



const p1 = new Person('David', 25);

console.log(p1.toString());    //#2.{"name":"David","age":25}
console.log(f2(8));    //#3. 81
console.log(f3(8));    //#4. 512