const mongoose = require('mongoose');

// Define Person Schema
const PersonSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: Number,
    gender: String,
    salary: Number
});

// Connect schema to existing collection
const Person = mongoose.model(
    'Person',
    PersonSchema,
    'personCollection'
);

module.exports = Person;