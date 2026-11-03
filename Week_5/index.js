// ==========================================
// CN5006 WEEK 5 LAB
// EXPRESS.JS AND MONGODB
// ==========================================


// ==========================================
// IMPORT REQUIRED MODULES
// ==========================================

const express = require('express');
const fs = require('fs');
const connectDB = require('./db');
const Person = require('./Person');


// ==========================================
// CREATE EXPRESS APPLICATION
// ==========================================

const app = express();


// ==========================================
// MIDDLEWARE
// ==========================================

// Handle HTML form submissions
app.use(express.urlencoded({ extended: true }));

// Handle JSON request bodies
app.use(express.json());


// ==========================================
// EXERCISE 1 - BASIC EXPRESS APPLICATION
// ==========================================

// Home route
app.get('/', (req, res) => {

    res.send('Hello! This is my first Express application.');

});


// ==========================================
// EXERCISE 2 - ABOUT ROUTE
// ==========================================

app.get('/about', (req, res) => {

    res.send('This is a basic Express application');

});


// ==========================================
// EXERCISE 2 - ROUTE PARAMETERS
// ==========================================

app.get('/users/:userId/books/:bookId', (req, res) => {

    res.send(req.params);

});


// ==========================================
// EXERCISE 3 - RETRIEVE ALL STUDENTS
// ==========================================

app.get('/GetStudents', (req, res) => {

    fs.readFile(
        __dirname + '/Students.json',
        'utf8',
        (err, data) => {

            if (err) {

                console.error(
                    'File reading error:',
                    err.message
                );

                return res.status(500).json({
                    status: false,
                    statusCode: 500,
                    message: 'Error reading Students.json'
                });

            }

            res.status(200).json({

                status: true,
                statusCode: 200,

                requestedAt: new Date().toISOString(),

                requestUrl: req.originalUrl,

                requestMethod: req.method,

                studentData: JSON.parse(data)

            });

        }
    );

});


// ==========================================
// EXERCISE 3 - RETRIEVE STUDENT BY ID
// ==========================================

app.get('/GetStudent/:id', (req, res) => {

    console.log('GetStudent called');

    fs.readFile(
        __dirname + '/Students.json',
        'utf8',
        (err, data) => {

            if (err) {

                return res.status(500).json({

                    status: false,
                    statusCode: 500,
                    message: 'Error reading Students.json'

                });

            }

            const students = JSON.parse(data);

            const student = students[
                'Student' + req.params.id
            ];

            console.log(student);

            if (student) {

                res.status(200).json(student);

            } else {

                res.status(404).json({

                    status: false,
                    statusCode: 404,

                    message: 'Student Not Found',

                    requestedAt: new Date().toISOString(),

                    requestUrl: req.originalUrl,

                    requestMethod: req.method

                });

            }

        }
    );

});


// ==========================================
// EXERCISE 3 - DISPLAY STUDENT HTML FORM
// ==========================================

app.get('/studentinfo', (req, res) => {

    res.sendFile('StudentInfo.html', {

        root: __dirname

    });

});


// ==========================================
// EXERCISE 3 - HANDLE POST FORM SUBMISSION
// ==========================================

app.post('/submit-data', (req, res) => {

    const name =
        req.body.firstName + ' ' + req.body.lastName;

    const age = req.body.myAge;

    const Gender =
        'Gender: ' + req.body.gender;

    const qual =
        'Qualification: ' + req.body.Qual;

    console.log(req.body.Qual);

    res.send({

        status: true,

        message: 'Form Details',

        data: {

            name: name,

            age: age,

            gender: Gender,

            qualification: qual

        }

    });

});


// ==========================================
// EXERCISE 4 - MONGODB REST API
// RETRIEVE ALL PERSONS
// ==========================================

app.get('/persons', async (req, res) => {

    try {

        const persons = await Person.find({});

        res.status(200).json({

            status: true,

            statusCode: 200,

            totalPersons: persons.length,

            data: persons

        });

    } catch (error) {

        console.error(
            'Error retrieving persons:',
            error.message
        );

        res.status(500).json({

            status: false,

            statusCode: 500,

            message: 'Error retrieving persons'

        });

    }

});

// ==========================================
// EXERCISE 4 - RETRIEVE PERSON BY ID
// ==========================================

app.get('/persons/:id', async (req, res) => {

    try {

        const person = await Person.findById(req.params.id);

        if (!person) {
            return res.status(404).json({
                status: false,
                statusCode: 404,
                message: 'Person not found'
            });
        }

        res.status(200).json({
            status: true,
            statusCode: 200,
            data: person
        });

    } catch (error) {

        res.status(400).json({
            status: false,
            statusCode: 400,
            message: 'Invalid person ID'
        });

    }

});

// ==========================================
// EXERCISE 4 - INSERT A NEW PERSON
// ==========================================

app.post('/persons', async (req, res) => {

    try {

        const newPerson = new Person({
            name: req.body.name,
            age: req.body.age,
            gender: req.body.gender,
            salary: req.body.salary
        });

        const savedPerson = await newPerson.save();

        res.status(201).json({
            status: true,
            statusCode: 201,
            message: 'Person inserted successfully',
            data: savedPerson
        });

    } catch (error) {

        console.error('Error inserting person:', error.message);

        res.status(400).json({
            status: false,
            statusCode: 400,
            message: error.message
        });

    }

});

// ==========================================
// EXERCISE 4 - UPDATE PERSON BY ID (PUT)
// ==========================================

app.put('/persons/:id', async (req, res) => {

    try {

        const updatedPerson = await Person.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                age: req.body.age,
                gender: req.body.gender,
                salary: req.body.salary
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedPerson) {
            return res.status(404).json({
                status: false,
                statusCode: 404,
                message: 'Person not found'
            });
        }

        res.status(200).json({
            status: true,
            statusCode: 200,
            message: 'Person updated successfully',
            data: updatedPerson
        });

    } catch (error) {

        console.error('Error updating person:', error.message);

        res.status(400).json({
            status: false,
            statusCode: 400,
            message: error.message
        });

    }

});

// ==========================================
// EXERCISE 4 - DELETE PERSON BY ID
// ==========================================

app.delete('/persons/:id', async (req, res) => {

    try {

        const deletedPerson = await Person.findByIdAndDelete(
            req.params.id
        );

        if (!deletedPerson) {
            return res.status(404).json({
                status: false,
                statusCode: 404,
                message: 'Person not found'
            });
        }

        res.status(200).json({
            status: true,
            statusCode: 200,
            message: 'Person deleted successfully',
            data: deletedPerson
        });

    } catch (error) {

        console.error('Error deleting person:', error.message);

        res.status(400).json({
            status: false,
            statusCode: 400,
            message: 'Invalid person ID'
        });

    }

});
// ==========================================
// START EXPRESS SERVER
// ==========================================

const PORT = 5000;

async function startServer() {

    try {

        // Connect to MongoDB Atlas
        await connectDB();

        // Start Express server
        app.listen(PORT, () => {

            console.log(
                `Server is running on port ${PORT}`
            );

        });

    } catch (error) {

        console.error(
            'Failed to start server:',
            error.message
        );

        process.exitCode = 1;

    }

}


// ==========================================
// RUN APPLICATION
// ==========================================

startServer();