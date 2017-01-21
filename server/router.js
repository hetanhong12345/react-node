/**
 * Created by Administrator on 2016/9/9.
 */
var express = require('express');
var xlsx = require('node-xlsx');
var formidable = require('formidable');
var fs = require('fs');
var path = require('path');
var api = require('./api');
var session = require('./session')
var router = express.Router();
router.use(function (req, res, next) {
    // .. some logic here .. like any other middleware
    next();
});
router.post('/login', function (req, res) {
    console.log(req.body);
    var param = req.body;
    var name = param.name, pass = param.pass;
    var mfuser = req.session.mfuser;
    if (!mfuser) {
        mfuser = req.session.mfuser = {};
    }
    var param = {
        username: name,
        password: pass
    };
    api.post('/employees/login', res, param, function (body) {
        var userInfo = body;
        mfuser = userInfo;
        req.session.mfuser = {
            id: mfuser.id,
            username: mfuser.username
        };
        /*将session保存在变量中*/
        session.set('id', mfuser.id);
        session.set('username', mfuser.username)
        res.send(userInfo);
    });


});
router.post('/logout', function (req, res) {
    if (req.session.mfuser) {
        req.session.mfuser = null;
        session.clear();
    }
    res.send({msg: 1})
})

/* GET export excel test. */
router.get('/exportExcel', function (req, res, next) {
// write
    var data = [[1, 2, 3], [true, false, null, 'sheetjs'], ['foo', 'bar', new Date('2014-02-19T14:30Z'), '0.3'], ['baz', null, 'qux']];
    var buffer = xlsx.build([{name: "mySheetName", data: data}]);
    fs.writeFileSync('static/b.xlsx', buffer, 'binary');
    res.send({msg: 1, info: "export successfully!"});

});
/*get  excel title*/
api.post('/domain-data/key/job_excle_templet', {}, {}, function (body) {
    session.set('xlsx', body);
});
module.exports = router;