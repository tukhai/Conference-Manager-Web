const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

var app = express();

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        currentYear: new Date().getFullYear()
    });
});

app.post('/talks-track-process', (req, res) => {
    console.log(req.body);
    res.send({
        name: "sending back data from post -- " + req.body.content,
        likes: [
            'Biking',
            'Cities'
        ]
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});