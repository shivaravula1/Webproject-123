const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://shreyareddyywf59:1838231942@shreya-test-db.kavwy5f.mongodb.net/?retryWrites=true&w=majority&appName=shreya-test-db");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/js', express.static(__dirname + '/public/js'));
app.use('/img', express.static(__dirname + '/public/images'));
app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/feedback', (req, res) => {
    res.render('feedback');
});

app.get('/game', (req, res) => {
    res.render('game');
});

app.get('/gifts', (req, res) => {
    res.render('gifts');
});

app.get('/gallery', (req, res) => {
    res.render('gallery');
});

app.get('/sched', (req, res) => {
    res.render('sched');
});

const shreyaSchema = new mongoose.Schema({
    customerId: String,
    Name: String,
    Phone: String,
    email: String,
    address: String,
    feedback: String
});

const collectiona = mongoose.model('shreyaassi6', shreyaSchema);
module.exports = collectiona;

app.post('/postMessage', async (req, res) => {
    const { Name, Phone, address, feedback, email } = req.body;
    let existingCustomer = await collectiona.findOne({ email });

    if (existingCustomer) {
        const updatedDocument = await collectiona.findOneAndUpdate(
            { email },
            { $set: { Name, Phone, address, feedback } },
            { new: true }
        );

        const formattedId = String(updatedDocument.customerId).padStart(3, '0');
        const updatedData = `${updatedDocument.Name} (${formattedId})`;
        return res.send(`<script>alert('Thank you ${updatedData} for the update');window.location.href='/feedback';</script>`);
    } else {
        const count = await collectiona.countDocuments();
        const newCustomerId = (count + 1).toString().padStart(3, '0');
        
        const newCustomer = new collectiona({ _id: mongoose.Types.ObjectId(), customerId: newCustomerId, Name, Phone, email, address, feedback });
        
        await newCustomer.save();
        const insertedData = `${newCustomer.Name} (${newCustomerId})`;
        return res.send(`<script>alert('Thank you ${insertedData}');window.location.href='/gifts';</script>`);
    }
});

const port = 3024;
app.listen(port, () => console.info(`Listening on port ${port}`));
