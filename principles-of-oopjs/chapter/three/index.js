// Detecting Properties

/*
	This is unreliable because the condition
	is truthy if the value is an object, 
	a nonempty string, a nonzero number, or true.

	This creates a false negative.

	E.g.,
	person.age = 0;

	if(person.age) // false
*/
if(person.age) {
	// do something
}

/*
	This is correct.  (It checks for both
	own properties and prototype properties).
*/
person.age = 0;
console.log("age" in person); // true

/*hasOwnProperty() returns true only if the given 
property exists and is an own property.*/


// `in` vs. hasOwnProperty()

var person = {
	name: 'Matt',
	sayName: function() {
		return this.name;
	}
};

console.log("name" in person); // true
console.log(person.hasOwnProperty("name")); // true

console.log("toString" in person); // true
console.log(person.hasOwnProperty("toString")); // false

// Removing Properties with delete

var person1 = {
	name: 'Matthew'
};

console.log("name" in person1); // true
delete person1.name;
console.log("name" in person1); // false

// Enumeration

var obj = {
	a: 'apple',
	b: 'balloon'
};

// for loop enumerates over own and prototype properties
for(property in obj) {
	console.log(`property name: ${property}`);
	console.log(`property value: ${obj[property]}`);
}

// Object.keys() only returns the own properties
var properties = Object.keys(obj); 
console.log(properties); // [ 'a', 'b' ]

/*
	To check if property is enumerable:
	Object.keys(obj).propertyIsEnumerable("length") // false
*/

// Types of Properties

// data propertes
var obj1 = {
	dataProperty: "dataPropertyValue"
}

// accessor properties (called when property is read or written)
var person = {
	_name: 'Matt',
	get name() {
		console.log("Reading name");
		return this._name;
	},
	set name(val) {
		console.log(`Setting name to ${val}.`);
		this._name = val;
	}

}

console.log(person.name); // "Reading name" then "Nicholas"

person.name = 'Adam';
console.log(person.name); // "Setting name to 'Adam'"

// Property Attributes

/*
	If you want to change property attributes, 
	you can use the Object .defineProperty() method.
*/

var person2 = {
	name: 'John'
};

Object.defineProperty(person2, "name", {
	enumerable: false
});

console.log(person2.propertyIsEnumerable("name")) // false
console.log(Object.keys(person2).length) // 0

Object.defineProperty(person2, "name", {
	configurable: false
});

// try to delete name
delete person2.name;
console.log("name" in person2); // true

// Retrieving Property Attributes

var person3 = {
	name: 'Josh'
};

var descriptor = Object.getOwnPropertyDescriptor(person3, "name");
console.log(descriptor); // {enumerable: true, configurable: true, writable: true, value: 'Josh'}

// Preventing Object Modification

var person4 = {
	name: 'Tim'
};

console.log(Object.isExtensible(person4)); // true
Object.preventExtensions(person4);
console.log(Object.isExtensible(person4)); // false
person4.age = 20;
console.log("age" in person4); // false

// Sealing Objects

/*
	When sealing objects, you can't add or remove properties;
	you can only read and write existing properties.
*/

var person5 = {
	name: 'Abraham'
};

console.log(Object.isSealed(person5)); // false
Object.seal(person5);
console.log(Object.isSealed(person5)); // true

// cant add property
person5.age = 20;
console.log("age" in person5); // false

person5.name = 'Greg';
console.log(person5.name); // Greg

// cant remove property
delete person5.name;
console.log("name" in person5); // true

// Freezing Objects
/*
	When an object is frozen, you can only read from it.
*/

var person6 = {
	name: 'George'
};

console.log(Object.isFrozen(person6));  // false
Object.freeze(person6);
console.log(Object.isFrozen(person6));  // true




