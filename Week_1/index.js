const prompt = require('prompt-sync')();

console.log("Starting");

const name = prompt("Enter your name: ");
console.log(`Hello, ${name}`);

// Input a number from the user
const number = parseInt(prompt("Enter a number: "));

// Check if number is greater than 0
if (number > 0) {
    console.log("The number is positive");
}

// Check if number is 0
else if (number == 0) {
    console.log("The number is zero");
}

// If number is less than 0
else {
    console.log("The number is negative");
}