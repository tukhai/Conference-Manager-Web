const express = require('express');
const hbs = require('hbs');

var app = express();

app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    // res.send('Hello Express!');
    // res.send({
    //     name: 'KKK',
    //     likes: [
    //         'Biking',
    //         'Cities'
    //     ]
    // });
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        currentYear: new Date().getFullYear()
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});