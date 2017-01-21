var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var config = require('./webpack.config')
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session')
var cookieParser = require('cookie-parser');
var app = express();
var port = 3011;
var router = require('./server/router')
var ssl = require('./server/ssl')
var publicFile = require('./server/public')

var compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: config.output.publicPath}))
app.use(webpackHotMiddleware(compiler))
app.use(cookieParser());
app.use(session({
    secret: 'abcdefg',
    name: 'mfSystem',
    cookie: {maxAge: 60 * 60 * 1000},
    resave: true,
    saveUninitialized: true
}));
app.use(express.static(path.join(__dirname, 'public')));
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
    res.sendFile(__dirname + '/index.html')
})
app.listen(port, function (error) {
    if (error) {
        console.error(error)
    } else {
        console.info(new Buffer('travis').toString('base64'))
        console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
    }
})
