const express = require('express');
const app = express();
const collection = require('./mongo');
const port = 3019;
const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://shreyporeddy123:1838231942@shreya-test-db.6boqb6p.mongodb.net/?retryWrites=true&w=majority&appName=shreya-test-db");
const User = require('./mongo');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/js', express.static(__dirname + '/public/js'));
app.use('/img', express.static(__dirname + '/public/images'));
app.set('views', './views');
app.set('view engine', 'ejs');

// Homepage route
app.get('/', (req, res) => {
    res.render('index');
});

// Feedback route
app.get('/feedback', (req, res) => {
    res.render('feedback');
});

// Game route
app.get('/game', (req, res) => {
    res.render('game');
});

// Gifts route
app.get('/gifts', (req, res) => {
    res.render('gifts');
});

// Gallery route
app.get('/gallery', (req, res) => {
    res.render('gallery');
});

// Schedule route
app.get('/sched', (req, res) => {
    res.render('sched');
});

// POST route for posting messages
app.post('/postMessage', async (req, res) => {
    try {
        const { Name, Phone, address, feedback, email } = req.body;

        // Find existing customer
        const existingCustomer = await collection.findOne({ email });

        if (existingCustomer) {
            // Update existing customer
            const updatedDocument = await collection.findOneAndUpdate(
                { email },
                { $set: { Name, Phone, address, feedback } },
                { new: true }
            );

            // Format the ID with leading zeros
            const formattedId = String(updatedDocument._id).padStart(3, '0');

            // Send response to client with formatted ID
            const updatedData = `${updatedDocument.Name} (${formattedId})`;
            return res.send(`<script>alert('Thank you ${updatedData} for the update');window.location.href='/feedback';</script>`);
        } else {
            // Create a new record without specifying _id
            const insertedDocument = await collection.create({ Name, Phone, email, address, feedback });

            // Format the ID with leading zeros
            const formattedId = String(insertedDocument._id).padStart(3, '0');

            // Send response to client with formatted ID
            const insertedData = `${insertedDocument.Name} (${formattedId})`;
            return res.send(`<script>alert('Thank you ${insertedData}');window.location.href='/gifts';</script>`);
        }
    } catch (error) {
        // Handle errors
        console.error('Error:', error);
        return res.status(500).send('Internal Server Error');
    }
});

// Listen on the specified port
app.listen(port, () => console.info(`Listening on port ${port}`));
