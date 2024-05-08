const express = require('express');
const hbs = require('hbs');
const fs=require('fs')
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const searchdata = require('../search.json');
const collection = require('./dbsearch'); 
const signup = require('./logindb');
const plantCaretrack = require('./plantcare');
const ShopItem=require('./shop')

const app = express();

// Connect to the database
mongoose.connect('mongodb+srv://gowdaranganath916:ranga@cluster0.okdpgbe.mongodb.net/plantsdetails?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to database:');
}).catch((err) => {
    console.log('Error while connecting ',err);
});

// Set view engine to Handlebars
app.set('view engine', 'hbs');

// Set views directory
app.set('views', path.join(__dirname, '../views'));

// Use body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from public directory
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../public/images')));

// Route for home page
app.get('/',async (req, res) => {
   res.render('home')
});
//home
app.get('/home',async(req,res)=>{
    try{
        const plants=await ShopItem.find();
        res.render('home',{plants})
    }catch(err){
        console.log(err);
        res.status(500).send('interna; server error')
    }
})


app.get('/plant-details', async (req, res) => {
    try {
        const searchTerm = req.query.search?.toLowerCase();
        if (!searchTerm) {
            res.render('home');
        } else {
            const result = await collection.findOne({ name: { $regex: searchTerm, $options: 'i' }});
            if (result) {
                res.render('plant-details', { data: result });
            } else {
                res.render('home');
            }
        }
    } catch (err) {
        console.error('Error searching:', err);
        res.status(500).send('Internal Server Error');
    }
});

//signup
app.get('/signup', (req, res) => {
    res.render('signup');
});

app.post('/signup', async (req, res) => {
    const data = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password
    };

    try {
        const userdata = await signup.insertMany(data);
        res.render('login');
    } catch (err) {
        console.log('There was an error', err);
    }
});

//login
app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', async (req, res) => {
    const { Email, pass } = req.body;

    try {
        const user = await signup.findOne({ email: Email });

        if (!user) {
            console.log('No user exists with this email');
            return res.render('login', { error: 'Invalid email or password' });
        }

        const passwordMatch = user.password === pass;

        if (passwordMatch) {
            res.render('home', { name: user.name });
        } else {
            console.log('Incorrect password');
            return res.render('login', { error: 'Invalid email or password' });
        }
    } catch (err) {
        console.log('An error occurred during login:', err);
        return res.render('login', { error: 'An error occurred. Please try again later.' });
    }
});

//plant care track
app.get('/plantcaretrack', (req, res) => {
    res.render('plantcaretrack');
});

app.post('/plantcaretrack', async (req, res) => {
    // Check if user is logged in
    // const userId = req.body.email; // Assuming you have a field named 'userId' in your form

    // if (!userId) {
    //     return res.status(401).send('Unauthorized'); // User is not logged in
    // }

    const data = {
        weather: req.body.weather,
        temperature: req.body.temperature,
        watered: req.body.watered,
        fertilized: req.body.fertilized,
        height: req.body.height,
        healthCondition: req.body.healthCondition,
        diseases: req.body.diseases,
        pruning: req.body.pruning,
        repotting: req.body.repotting,
        // userId:userId // Associate the user ID with the plant data
    };

    try {
        console.log('Data received:', data);
        const savedData = await plantCaretrack.create(data);
        console.log('Data saved:', savedData);
        res.render('reporting', { plantdata: savedData });
    } catch (err) {
        console.error('Error processing form data:', err);
        res.status(500).send('Internal Server Error');
    }
});
//shop page

    app.get('/shop1', async (req, res) => {
        try {
          // Fetch plant data from the database
          const plants = await ShopItem.find(); // Assuming 'ShopItem' is your Mongoose model
      
          // Pass the data to the view
          res.render('shop1', { plants });
        } catch (err) {
          // Handle error
          console.error(err);
          res.status(500).send('Internal Server Error');
        }
      });


// Set port number
const port = 9000;
app.listen(port, () => {
    console.log(`Listening to ${port}`);
});
