const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI;


// ==========================================
// CREATE PERSON SCHEMA
// ==========================================

const PersonSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: Number,
    gender: String,
    salary: Number
});


// ==========================================
// CREATE PERSON MODEL
// ==========================================

const Person = mongoose.model(
    'Person',
    PersonSchema,
    'personCollection'
);


// ==========================================
// TASK 1 - INSERT ONE DOCUMENT
// ==========================================

async function insertOne() {

    const doc1 = new Person({
        name: 'NHQ',
        age: 32,
        gender: 'Male',
        salary: 1234
    });

    const savedDoc = await doc1.save();

    console.log('One document inserted');
    console.log(savedDoc);
}


// ==========================================
// TASK 2 - INSERT MANY DOCUMENTS
// ==========================================

async function insertMany() {

    const manyPersons = [
        {
            name: 'SimonNHQ',
            age: 42,
            gender: 'Male',
            salary: 3456
        },
        {
            name: 'NeeshaNH',
            age: 53,
            gender: 'Female',
            salary: 1000
        },
        {
            name: 'MaryNHQ',
            age: 27,
            gender: 'Female',
            salary: 5402
        },
        {
            name: 'MikeNJQ',
            age: 40,
            gender: 'Male',
            salary: 4519
        }
    ];

    const result = await Person.insertMany(manyPersons);

    console.log('Many documents inserted');
    console.log(result);
}

// ==========================================
// TASK 3 - FIND ALL DOCUMENTS
// ==========================================

async function findAll() {

    const persons = await Person.find({});

    console.log('All persons in the database:');
    console.log(persons);
}

// ==========================================
// TASK 4 - FIND FEMALES OVER 30
// ==========================================

async function findFemalesOver30() {

    const persons = await Person.find({
        gender: 'Female',
        age: { $gt: 30 }
    });

    console.log('Females over 30:');
    console.log(persons);
}

// ==========================================
// TASK 5 - COUNT DOCUMENTS
// ==========================================

async function countDocuments() {

    const count = await Person.countDocuments({});

    console.log('Total number of persons:');
    console.log(count);
}

// ==========================================
// TASK 6 - DELETE PERSONS AGED 45 OR OVER
// ==========================================

async function deleteManyPersons() {

    const result = await Person.deleteMany({
        age: { $gte: 45 }
    });

    console.log('Number of persons deleted:');
    console.log(result.deletedCount);
}

// ==========================================
// TASK 7 - UPDATE FEMALE SALARY
// ==========================================

async function updateManyPersons() {

    const result = await Person.updateMany(
        { gender: 'Female' },
        { $set: { salary: 5555 } }
    );

    console.log('Number of persons updated:');
    console.log(result.modifiedCount);
}
// ==========================================
// MAIN FUNCTION
// ==========================================

async function main() {

    try {

        // Connect to MongoDB
        await mongoose.connect(MONGO_URI);

        console.log('Connected to MongoDB successfully');


   // TASK 1
// await insertOne();

// TASK 2
// await insertMany();

// TASK 3 - Verify all documents
await findAll();

// TASK 4
// await findFemalesOver30();

// TASK 5
// await countDocuments();

// TASK 6
// await deleteManyPersons();

// TASK 7
// await updateManyPersons();


    } catch (err) {

        console.error('Error:', err.message);

    } finally {

        // Close MongoDB connection
        await mongoose.connection.close();

        console.log('Connection closed');
    }
}


main();