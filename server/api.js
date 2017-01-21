/**
 * Created by Administrator on 2016/9/9.
 */
var request = require('request');
var config = require('./config');
var session = require('./session');
var logger = require('./logger');
var api = {
    get: get,
    post: post,
    put: put
}
function get(url, res, data, cb) {

    data = data || {};
    var username = session.get('username');
    var logname = session.get('username');
    if (username) {
        username = new Buffer(username).toString('base64')
    }
    var query = [];
    for (var key in data) {
        query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
    }
    query = query.join('&');
    if (query.length) {
        url = url + '?' + query;
    }

    var id = session.get('id');
    var writeLog =true;
    if (/import-file-batch/.test(url)){
        writeLog =false;
    }
    if(writeLog){
        logger.info('request begin url:' + url + ',username:' + logname);
    }
    var options = {
        url: url,
        baseUrl: config.serverUrl,
        method: 'GET',
        headers: {
            'X-USER-NAME-BASE64': username || "",
            'X-USER-ID': id || "",
            'X-USER-TYPE': 'EMPLOYEE_USER',
            'X-APP-KEY': '!(*%)^@@@)!%!!!)',
            'Content-type': 'application/json'
        }
    };
    return request(options, function (er, response, body) {
        if (er) {
            if (writeLog){
                logger.error('request end  url:' + url + ',username:' + logname+ ',status: error 404');
            }

            return res.sendStatus(404);
        }
        if (!er && response.statusCode == 200) {
            if (writeLog)
                logger.info('request end  url:' + url + ',username:' + 'status:ok 200');
            try {
                body = JSON.parse(body);
                if (cb) {
                    return cb(body);
                }
                res.send({msg: 1, body: body});

            } catch (e) {
                logger.error('an error in api.js line 67');
                res.sendStatus(500);
            }
        } else {
            if (writeLog)
                logger.error('request end  url:' + url + ',username:' + logname  + ',status:' + response.statusCode);
            return res.sendStatus(response.statusCode);

        }

    })
}
function post(url, res, data, cb) {
    data = data || {};
    var username = session.get('username');
    var logname = session.get('username');
    if (username) {
        username = new Buffer(username).toString('base64')
    }
    var id = session.get('id');
    var writeLog =true;
    if (/import-file-batch/.test(url)){
        writeLog =false;
    }
    var options = {
        url: url,
        baseUrl: config.serverUrl,
        method: 'POST',
        headers: {
            'X-USER-NAME-BASE64': username || "",
            'X-USER-ID': id || "",
            'X-USER-TYPE': 'EMPLOYEE_USER',
            'X-APP-KEY': '!(*%)^@@@)!%!!!)',
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    return request(options, function (er, response, body) {
        if (er) {
            if (writeLog){
                logger.error('request end  url:' + url + ',username:' + logname + ',status: error 404');
            }

            return res.sendStatus(404);
        }
        if (!er && response.statusCode == 200) {
            if (writeLog)
                logger.info('request end  url:' + url + ',username:' + logname +',status:ok 200');
            try {
                body = JSON.parse(body);
                if (cb) {
                    return cb(body);
                }
                res.send({msg: 1, body: body});

            } catch (e) {
                res.sendStatus(500)
            }
        } else {
            if (writeLog){
                logger.error('request end  url:' + url + ',username:' + logname + ',status:' + response.statusCode);
            }

            return res.sendStatus(response.statusCode)
        }
    });
}
function put(url, data, cb) {

}
module.exports = api;