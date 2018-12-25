const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const mainLogic = require('./main_logic/app');

const port = process.env.PORT || 3000;

var app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Conference Manager WebApp'
    });
});

app.post('/talks-track-process', (req, res) => {
    var contentFromPost = req.body.content;
    var talkList = [contentFromPost.split("\n")];

    var mainResContent = mainLogic.processTracks(talkList);

    res.send({
        mainList: mainResContent
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});