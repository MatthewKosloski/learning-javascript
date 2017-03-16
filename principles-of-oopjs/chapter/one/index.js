//*******************************
// Primitive Types
//*******************************

/*
	The following are primitive types in JS:
	- Boolean
	- Number
	- String
	- Null
	- Undefined
*/

//*******************************
// Primitive Literals
//*******************************

var name = 'Matthew'; // string literal
var cost = 2.50; // number literal
var isActive = true; // boolean literal

/*
	When assigning a primitive value to a variable, 
	the value is copied into that variable.
*/

var color1 = 'red';
var color2 = color1;

color1 = 'blue';

console.log(color1); // blue
console.log(color2); // red

//*******************************
// Identifying Primitive Types
//*******************************

console.log(typeof 'Foo'); // "string"
console.log(typeof 42); // "number"
console.log(typeof true); // "boolean"
console.log(typeof undefined); // "undefined"
console.log(typeof null); // "object"

//*******************************
// Coercion
//*******************************

/*
	In the first console.log below, "5" (a string) 
	is converted, or coerced, into a number.
*/
console.log("5" == 5); // true

console.log("5" === 5); // false

//*******************************
// Primitive Methods
//*******************************

console.log('ADAM'.toLowerCase()); // "adam"
console.log(10.toFixed(2)); // "10.00"

