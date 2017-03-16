/*
	1. Constructors
		- create more objects with the same properties and methods
*/

function Person() { }
var person1 = new Person();
console.log(person1 instanceof Person); // true
console.log(person1.constructor); // Person

function Person1(name) {
	this.name = name;
	this.greet = function() {
		return `Hello, ${this.name}.`;
	};
}

// `this` is an instance of the Person1 object

var person2 = new Person1("Matthew");
console.log(person2.name); // "Matthew"
console.log(person2.greet()); // "Hello, Matthew."

/*
	2. Prototypes
		- Recipe for an object
		- shared among all of the object instances
		- instances can access properties of the prototype
*/

var book = {
	title: "Of Mice and Men"
};

console.log("title" in book); // true
console.log(book.hasOwnProperty("title")); // true
console.log("hasOwnProperty" in book); // true
console.log(book.hasOwnProperty("hasOwnProperty")); // false
console.log(Object.prototype.hasOwnProperty("hasOwnProperty")); // true

// Identifying a prototype property
function hasPrototypeProperty(object, name) {
	return name in object && !object.hasOwnProperty(name);
}
console.log(hasPrototypeProperty(book, "title")); // false;

// Reading the value of [[Prototype]]
console.log(Object.getPrototypeOf({})); // [Function]

// Check an object's prototype
var object = {};
console.log(Object.prototype.isPrototypeOf(object));
// (object's prototype is equal to Object's prototype)

/* When reading an object's property, the engine first looks
for own properties.  If it doesn't exist, it checks the prototype.

EXAMPLE:*/

var object2 = {};

console.log(object2.toString()); // "[object Object]"

object.toString = function() {
	return "[object Custom]";
}

console.log(object.toString()); // "[object Custom]"

// delete own object
delete object.toString;

console.log(object.toString()); // "[object Object]"

// no effect - `delete` only works on own properties
delete object.toString;
console.log(object.toString()); // "[object Object]"








