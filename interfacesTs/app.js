"use strict";
function greet(person) {
    console.log("Hello, " + person.firstName);
}
function changeName(person) {
    person.firstName = "Anna";
}
var person = {
    firstName: "Max",
};
greet({ firstName: "Max", age: 27 });
changeName(person);
greet(person);
