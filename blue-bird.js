var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session')
var cookieParser = require('cookie-parser');
var app = express();
var port = 6100;
var router = require('./bluebird/router')
app.use(cookieParser());
app.use(session({
    secret: 'abcdefg',
    name: 'mfSystem',
    cookie: {maxAge: 60 * 60 * 1000},
    resave: true,
    saveUninitialized: true,
}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(router);

app.get("*", function (req, res) {
    res.sendFile(__dirname + '/blurbird.html')
})
app.listen(port, function (error) {
    if (error) {
        console.error(error)
    } else {
        console.info(new Buffer('travis').toString('base64'))
        console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
    }
})
