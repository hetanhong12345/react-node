/*var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');

var app = express();

app.use(cookieParser());
app.use(session({
    secret: '12345',
    name: 'testapp',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
    cookie: {maxAge: 80000},  //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
    resave: false,
    saveUninitialized: true,
}));


app.get('/awesome', function (req, res) {

    if (req.session.lastPage) {
        console.log('Last page was: ' + req.session.lastPage + ".");
    }
    req.session.lastPage = '/awesome'; //每一次访问时，session对象的lastPage会自动的保存或更新内存中的session中去。
    res.send("You're Awesome. And the session expired time is: " + req.session.cookie.maxAge);
});

app.get('/radical', function (req, res) {
    if (req.session.lastPage) {
        console.log('Last page was: ' + req.session.lastPage + ".");
    }
    req.session.lastPage = '/radical';
    res.send('What a radical visit! And the session expired time is: ' + req.session.cookie.maxAge);
});

app.get('/tubular', function (req, res) {
    if (req.session.lastPage) {
        console.log("Last page was: " + req.session.lastPage + ".");
    }

    req.session.lastPage = '/tubular';
    res.send('Are you a suffer? And the session expired time is: ' + req.session.cookie.maxAge);
});

var port =3101
app.listen(port, function (error) {
    if (error) {
        console.error(error)
    } else {
        console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
    }
})*/


var fs = require('fs');
rmdirSync('./node_modules'); // 你要删除的目录
console.log('done!');
/**
 * 删除 node 模块目录
 * @param {string} filepath 目录名
 */
function rmdirSync(filepath) {
  if (!fs.existsSync(filepath)) { // 无效路径退出
    return false;
  }
  var files = fs.readdirSync(filepath); // 获取目录下文件
  files.forEach(function (file, i) { // 遍历文件
    var subpath = filepath + '/' + file; // 拼接文件路径
    if (fs.statSync(subpath).isDirectory()) { // 判断目录还是文件
      var newpath = filepath + '/' + i; // 生成新的目录名
      fs.renameSync(subpath, newpath); // 重命名目录
      rmdirSync(newpath); // 递归遍历目录
    } else {
      fs.unlinkSync(subpath); // 删除文件
    }
  });
  fs.rmdirSync(filepath); // 删除目录
}