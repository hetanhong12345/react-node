var express = require('express');
var router = express.Router();
var request = require('request');
var Promise = require('bluebird');
var fs = require('fs');
Promise.promisifyAll(request);
Promise.promisifyAll(fs);

router.use(function (req, res, next) {
    // .. some logic here .. like any other middleware
    next();
});
router.get('/test', function (req, res) {
    var param = {
        startRow: 0,
        pageSize: 15,
        jobCity: '861105'
    };
    var url = 'https://mobile-application.mofanghr.com/member/o2o/jobList.json?params=' + encodeURIComponent(JSON.stringify(param));
    return request.getAsync(url)
        .then(function (response) {
            return response.body;
        }).then(function (body) {
            return JSON.parse(body)
        }).then(function (data) {
            res.send(data);
        })
        .catch(function (err) {
            console.log(err);
            res.status(500).json(err);
        })
});
router.get('/html', function (req, res) {
    return fs.readFileAsync('./index.html', 'utf8')
        .then(function (response) {
            res.send(response);

        }).catch(function (err) {
            res.status(500).json(err);
        })


});
module.exports = router;