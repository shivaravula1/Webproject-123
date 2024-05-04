const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
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
app.get('/auth', (req, res) => {
    res.render('auth');
});
app.get('/auths', (req, res) => {
    res.render('auths');
});
const shreyaSchema = new mongoose.Schema({
    customerId: String,
    Name: String,
    Phone: String,
    email: String,
    address: String,
    password: String,
    feedback: String
});

const collections = mongoose.model('shreyaassi7', shreyaSchema);

module.exports = collections;

app.post('/signup', async (req, res) => {
    const { email } = req.body;
    let alexistingCustomer = await collections.findOne({ email });
    if (alexistingCustomer) {
        // If the email exists, return an alert
        return res.send(`<script>alert('Email already exists');window.location.href='/auth';</script>`);
    }
    try {
      // Hash the password before storing it in the database
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      
      // Create a new user object
      const newUser = new collections({
        Name: req.body.Name,
        email: req.body.email,
        password: hashedPassword
      });
  
      // Save the user to the database
      const savedUser = await newUser.save();
      
      // Redirect the user to the sign-in page after successful sign-up
      return res.send(`<script>alert('Thank you');window.location.href='/feedback';</script>`);
    } catch (error) {
      // Handle errors, such as duplicate username or email
      console.error(error);
      res.status(500).send('Error signing up. Please try again later.');
    }
  });
  app.post('/signin', async (req, res) => {
    try {
      // Find the user by username
      const user = await collections.findOne({ email: req.body.email });
  
      // Check if the user exists and the password is correct
      if (user && await bcrypt.compare(req.body.password, user.password)) {
        // Set session variables or JWT token to manage authentication
       
        const greetingMessage = `Hello, ${user.Name}!`;
        // Redirect the user to the dashboard or home page after successful sign-in
        return res.send(`<script>alert('${greetingMessage}');window.location.href='/feedback';</script>`);
      } else {
        // Invalid username or password
        res.status(401).send('Invalid username or password.');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Error signing in. Please try again later.');
    }
  });

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

const port = 3027;
app.listen(port, () => console.info(`Listening on port ${port}`));