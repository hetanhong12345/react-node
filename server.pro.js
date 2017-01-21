var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session')
var cookieParser = require('cookie-parser');
var app = express();
var port = 3010;
var router = require('./server/router')
var ssl = require('./server/ssl')
var publicFile = require('./server/public')
app.use(cookieParser());
app.use(session({
    secret: 'abcdefg',
    name: 'mfSystem',
    cookie: {maxAge: 60 * 60 * 1000},
    resave: true,
    saveUninitialized: true,
}));
app.use(express.static(path.resolve('public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(router);
app.use('/ssl', ssl);
/*静态文件*/
app.use('/public', publicFile);
//res.redirect('index');
app.get('/', function (req, res) {
    res.redirect('./index');
});
app.get("*", function (req, res) {
    res.sendFile(__dirname + '/i.html')
})
app.listen(port, function (error) {
    if (error) {
        console.error(error)
    } else {
        console.info(new Buffer('travis').toString('base64'))
        console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
    }
})
