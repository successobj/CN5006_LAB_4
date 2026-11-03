// Using the Node.js OS core module

const os = require('os');

console.log("Operating System:", os.platform());
console.log("OS Architecture:", os.arch());
console.log("Computer Hostname:", os.hostname());
console.log("Total Memory:", os.totalmem());
console.log("Free Memory:", os.freemem());
console.log("Home Directory:", os.homedir());

// Exercise 2 - Arrow Function
const EmpSkills = (skills, studentName, studentID, labGrp) => {
    console.log("Student Name: " + studentName);
    console.log("Student ID: " + studentID);
    console.log("Expert in: " + skills);
    console.log("Lab Group: " + labGrp);
};

EmpSkills("Java", "Chibuike Success Obijuru", "1029001", "Lab Group 4");

// Exercise 3 - Local Modules

const StudentInfo = require('./StudentInfo');
const Person = require('./Person');

console.log("\n--- Student Information ---");
console.log("Student Name:", StudentInfo.getName());
console.log("Campus:", StudentInfo.Location);
console.log("Date of Birth:", StudentInfo.dob);
console.log("Grade:", StudentInfo.Studentgrade(60));

const student = new Person(
    "Chibuike Success Obijuru",
    30,
    "student@example.com"
);

console.log("\n--- Person Information ---");
console.log(student.getPersonInfo());