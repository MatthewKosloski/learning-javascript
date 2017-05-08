/*
 * # Object Patterns
 */

/*
 * ## Private and Privileged Members
 */

/*
### Module Pattern

var yourObject = (function(){
	// private data variables

	return {
		// public methods and properties
	};

})();
*/

/*

Module pattern example:

The person object below uses closures (getAge and growOlder)
to interact with data outside their scope.

*/

var person = (function(){

	var age = 25;

	return {
		name: 'Nick',
		getAge: function() {
			return age;
		},
		growOlder: function() {
			age++;
		}
	};

})();

console.log(person.name); // 'Nick'
console.log(person.getAge()); // 25

person.age = 100;
console.log(person.getAge()); // 25 (still)

person.growOlder();

console.log(person.getAge()); // 26

/*
	Revealing Module Pattern

	var yourObject = (function(){
		
		// private data

		function a() {
		}

		function b() {
	
		}

		return {
			somePublicProperty: 'foo',
			a: a, 
			b: b
		}

	})();

*/

/*
 * ## Private Members for Constructors
 */

function Person(name) {

	// define a variable only accessible inside of constructor
	var age = 25;

	this.name = name;

	this.getAge = function() {
		return age;
	}

	this.growOlder = function() {
		age++;
	};
}

var matt = new Person('Matt');

console.log(matt.name); // 'Matt'
console.log(matt.getAge()); // 25

matt.age = 501;

console.log(matt.getAge());
matt.growOlder();
console.log(matt.getAge());

/*
	Share private data across all instances
*/

var Person2 = (function(){

	// everyone shares the same age
	var age = 25;

	function InnerPerson(name) {
		this.name = name;
	}

	InnerPerson.prototype.getAge = function() {
		return age;
	};

	InnerPerson.prototype.growOlder = function() {
		age++;
	};

	return InnerPerson;
})();

var p1 = new Person2('Adam');
var p2 = new Person2('Matt');

console.log(p1.getAge()); // 25
console.log(p2.getAge()); // 25

p1.growOlder();

console.log(p1.getAge()); // 26
console.log(p2.getAge()); // 26

/*
 * ## Scope-safe Constructor
 */

function Animal(sound) {
	this.sound = sound;
}

var dog = Animal('bark');

console.log(dog instanceof Animal); // false
console.log(typeof dog); // undefined
console.log(sound); // 'bark'

function SafeAnimal(sound) {
	if(this instanceof SafeAnimal) {
		this.sound = sound;
	} else {
		return new SafeAnimal(sound);
	}
}

var safeDog = SafeAnimal('bark'); 

console.log(safeDog instanceof SafeAnimal); // true
console.log(typeof safeDog); // object
