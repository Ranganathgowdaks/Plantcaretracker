// ijoo
const express = require('express');
const hbs = require('hbs');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const collection = require('./dbsearch');

const app = express();

// Connect to the database
mongoose.connect('mongodb+srv://gowdaranganath916:ranga@cluster0.okdpgbe.mongodb.net/plantsdetails?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(async () => {
    console.log('Connected to database:');
    // Once connected, save the plants
    await savePlants();
}).catch((err) => {
    console.log('Error while connecting ',err);
});

// Define plant data
const plants = [
    {
        id:4,
        name:'african voilet plant',
        img:''
    },
    {
        id:3,
        name:'aleovera',
        img:''
    }
];

// Function to save plants to the database
const savePlants = async () => {
    try {
        const savedPlants = await collection.insertMany(plants);
        console.log('Plants saved:', savedPlants);
    } catch (err) {
        console.log('Error saving plants:', err);
    }
};

// Set view engine to Handlebars
app.set('view engine', 'hbs');

// Set views directory
app.set('views', path.join(__dirname, '../views'));

// Use body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from public directory
app.use(express.static(path.join(__dirname, '../public')));

// Route for home page
app.get('/',(re,res)=>{
    res.render('home')
});

// Set port number
const port=9000;
app.listen(port,()=>{
    console.log(`Listening to ${port}`);
});
