// # Inheritance

/*
 * ## Prototype Chaining and Object.prototype
 * /

/*
	_prototype chain_: An object inherits from its prototype,
	while that prototype in turn inherits from its prototype, 
	and so on.
*/

var book = {
	title: 'Of Mice and Men'
};

var prototype = Object.getPrototypeOf(book);

console.log(prototype === Object.prototype); // true

// book automatically receives methods from Object.prototype.

/*
 * ## Methods Inherited from Object.prototype
 * /

/*
	Several methods defined in Object.protoype:
		- hasOwnProperty
		- propertyIsEnumerable
		- isPrototypeOf
		- valueOf
		- toString
*/

/*
	### valueOf
		- gets called whenever an operator is used
		on an object.
		- allows you to compare objects using operators,
		such as ">"
*/

var now = new Date();
var earlier = new Date(2010, 1, 1);

console.log(now > earlier); // true


/*
	### toString
		- called whenever valueOf returns a reference type (non-primitive)
		- called on primitive values when a string is expected ("2" + 2)
*/

var article = {
	title: 'How to code',
};

console.log("Article = " + article); // "Article = [object Object]"

/* Since article is an object, its toString method is called,
which defaults to "[object Object]" (Object.prototype.toString()) */

// override article's toString method

article.toString = function() {
	return `[Article ${this.title}]`;
}

console.log("Article = " + article); // "Article = [Article How to code]"

/*
 * ## Modifying Object.prototype
 * /

/*
	Try to not modify Object.prototype because such
	changes affect all objects.

	Example:
*/

// modifying Object.prototype
Object.prototype.add = function(a) {
	return this + a;
}

// object literal inherits the prototype
var obj = {
	someOwnProperty: 'foo'
};

// add is enumerable
for(var property in obj) {
	console.log(property);
}

/*
	use hasOwnProperty to avoid iterating over prototype properties:
*/

for(var property in obj) {
	if(obj.hasOwnProperty(property)) {
		console.log(property);
	}
}

/*
 * ## Object Inheritance
 */

/*
var book = {
	title: '1984'
}

is the same as:

var book = Object.create(Object.prototype, {
	title: {
		value: '1984',
		configurable: true,
		enumerable: true,
		writable: true
	}
})
*/

var person1 = {
	name: 'Adam',
	sayName: function() {
		console.log(this.name);
	}
};

var person2 = Object.create(person1, {
	name: {
		value: 'Brett',
		configurable: true,
		enumerable: true,
		writable: true
	}
});

person1.sayName(); // "Adam"
person2.sayName(); // "Brett"

console.log(person1.hasOwnProperty('sayName')); // true
console.log(person2.hasOwnProperty('sayName')); // false

/*
	The latter log is false because sayName was inherited
	from person1, therefore, is a prototype property rather
	than an own property.
	
	Prototype chain:

	person2 -> person1 -> Object.prototype

*/

// Example of prototype-less object:

var nakedObject = Object.create(null);

console.log('toString' in nakedObject); // false
console.log('valueOf' in nakedObject); // false

/*
 * ## Constructor Inheritance
 */

/*
function YourConstructor() {}

Behind the scenes:
YourConstructor.prototype = Object.create(Object.prototype, {
	constructor: {
		value: YourConstructor,
		configurable: true,
		enumerable: true,
		writable: true
	}
});

*/

function Rectangle(width, height) {
	this.width = width;
	this.height = height;
}

Rectangle.prototype.getArea = function() {
	return this.width * this.height;
}

Rectangle.prototype.toString = function() {
	return `[Rectangle ${this.width}x${this.height}]`;
}

// Inherits from Rectangle

function Square(size) {
	this.width = size;
	this.height = size;
}

Square.prototype = new Rectangle();
Square.prototype.constructor = Square;

Square.prototype.toString = function() {
	return `[Square ${this.width}x${this.height}]`;
}

var rect = new Rectangle(5, 10);
var square = new Square(6);

console.log(rect.getArea()); // 50
console.log(square.getArea()); // 36

console.log(rect.toString()); // "[Rectangle 5x10]"
console.log(square.toString()); // "[Square 6x6]"

console.log(rect instanceof Rectangle); // true
console.log(rect instanceof Object); // true

console.log(square instanceof Square); // true
console.log(square instanceof Rectangle); // true
console.log(square instanceof Object); // true

/*
 * ## Constructor Stealing
 */

function Rectangle2(width, height) {
	this.width = width;
	this.height = height;
}

Rectangle2.prototype.getArea = function() {
	return this.width * this.height;
}

Rectangle2.prototype.toString = function() {
	return `[Rectangle2 ${this.width}x${this.height}]`;
}

// Inherits from Rectangle2
function Square2(size) {
	Rectangle2.call(this, size, size);

	// add new properties or override existing ones here
}

Square2.prototype = Object.create(Rectangle2.prototype, {
	constructor: {
		value: Square2,
		configurable: true,
		enumerable: true,
		writable: true
	}
});

Square2.prototype.toString = function() {
	return `[Square2 ${this.width}x${this.height}]`;
}

var square = new Square(6);

console.log(square.height); // 6
console.log(square.width); // 6
console.log(square.getArea()); // 36

/*
	
	_pseudoclassical inheritance_: modifying the 
	prototype for method inheritance and stealing the 
	constructor for properties

*/

/*
 * ## Accessing Supertype Methods
 */

function Parent(age) {
	this.age = age;
}

Parent.prototype.toString = function() {
	return `[Parent age ${this.age}]`;
}

function Child(age) {
	Parent.call(this, age); // inherit own properties via constructor stealing
}

Child.prototype = Object.create(Parent.prototype, {
	constructor: {
		value: Child,
		enumerable: true,
		writable: true,
		configurable: true
	}
});

// call the supertype method (from Parent)
Child.prototype.toString = function() {
	var text = Parent.prototype.toString.call(this);
	return text.replace('Parent', 'Child');
}