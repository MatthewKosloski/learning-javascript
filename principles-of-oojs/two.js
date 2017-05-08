//***********************************
// Function Declaration vs Expression
//***********************************

/*
	Declaration example.  They are
	hoised to the top of the context.
*/

var sum = add(4, 5); // hoisted.

function add(a, b) {
	return a + b;
}

// Expression
var multiply = function(a, b) {
	return a * b;
}


/*Functions are first class, which means you can use 
them just like other object: assign to variables,
pass to functions, etc.*/

/*Since functions are objects, if you have duplicate functions,
the last one wins.*/

function scream(s) {
	return s.toUpperCase();
}

function scream(s) {
	return s.toLowerCase();
}

scream('Matthew') // "matthew"

/*
	What happens behind the scenes:

	var scream = new Function("s", "return s.toUpperCase();");
	scream = new Function("s", "return s.toLowerCase();");
*/

//***********************************
// The `this` Object
//***********************************

/* Every scope in JS has a this object that 
represents the calling object for the function*/

/*In global scope, `this` points to the global object (window).*/

function globalThis() { console.log(this); } // window

/*When method of object, `this` is equal to the object.*/

var o = {
	name: 'Matthew',
	getName: function() {
		return this.name; 
	}
}

console.log(o.getName()); // "Matthew"

//***********************************
// Changing `this`
//***********************************

/*`this` can be changed with following methods:
	- call
	- apply
	- bind
*/

/*
	call();
	Executes the function with a given `this` context and passes additional parameters. 

	apply();
	Executes the function with a given `this` context, but
	the second parameter is an Array.

	bind();
	Binds the `this` to the function.
	(Does NOT execute the function)

*/

function sayName(label) {
	console.log(label + " : " + this.name);
}

var name = 'Matthew';

var person1 = {
	name: "Nicholas"
};

sayName.call(this, 'global'); // "global: Matthew"
sayName.apply(person1, ['person1']); // "person1: Nicholas"

var sayNameGlobal = sayName.bind(this);
sayNameGlobal("global"); // "global: Matthew"

//  attaching a method to an object doesn't change 'this'
person1.sayName = sayNameGlobal;
person1.sayName("global"); // "global: Matthew"


