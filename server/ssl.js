/**
 * Created by Administrator on 2016/9/9.
 */
var express = require('express');
var request = require('request');
var xlsx = require('node-xlsx');
var formidable = require('formidable');
var fs = require('fs');
var path = require('path');
var router = express.Router();
var api = require('./api');
var session = require('./session');
var units = require('./units');
var logger = require('./logger');
router.use(function (req, res, next) {
    // .. some logic here .. like any other middleware
    var mfuser = req.session.mfuser;
    if (mfuser && mfuser.username && mfuser.id) {
        session.set('id', mfuser.id);
        session.set('username', mfuser.username)
        next();
    } else {
        session.clear();
        res.sendStatus(401);
    }
});
/*登录状态*/
router.get('/loginStatus', function (req, res) {
    if (session.get('id') && session.get('username')) {
        res.send({msg: 1});
    } else {
        res.sendStatus(401);
    }
});
/*个人信息*/
router.get('/user', function (req, res) {
    var id = session.get('id');
    api.get('/employees/' + id, res, {})
});
/*c端拉新 项目列表*/

router.get('/pullc/lists', function (req, res) {
    api.get('/projects/search-paging', res, {});
});
/*上传xlsx文件 导入信息*/
router.post('/upload/xls', function (req, res) {
    if (!session.get('xlsx')) {
        return res.send({"msg": "-1", "msgInfo": "系统错误"});
    }
    var fileTypeError = false;
    var target_path = path.resolve("upload/xls");
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.keepExtensions = true;
    form.maxFieldsSize = 10 * 1024 * 1024;
    form.uploadDir = target_path;
    form.maxFields = 100;
    var fileError = false;
    var fileTempName = null;
    var fields = [];
    var files = [];
    form.on('fileBegin', function (name, file) {
        try{
            var extendName = path.extname(file.path);
            fileTempName = path.resolve(__dirname, '../upload/xls/xlsx' + new Date().getTime() + extendName);
            file.path = fileTempName;
        }
        catch(e){
            logger.error('file upload error');
            res.sendStatus(500)
        }

    });
    form.on('field', function (field, value) {
        fields.push([field, value]);
    });
    form.on('file', function (field, file) {
        console.log('upload file: ' + file.name);
        //判断文件类型是否是xlsx
        if (file.type != 'application/octet-stream' && file.type != 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
            fileTypeError = true;
        }
        files.push([field, file]);
    });
    form.on('end', function () {
        var obj = '';
        var fileExists =null
       try{
           fileExists = fs.existsSync(fileTempName);
       }
        catch(e){
            logger.error('readFile error');
            return res.sendStatus(500);
        }
        if (fileExists) {
            if (!fileTypeError) {
                //解析excel
                obj = xlsx.parse(fileTempName);
                obj = units.xlsxParse(obj);
                fs.unlinkSync(fileTempName);
                if (!obj) {
                    return res.send({"msg": "-1", "msgInfo": "文件表头不正确"});
                }
                if (obj.msg == -1) {
                    return res.send({"msg": "-1", "msgInfo": obj.msgInfo});
                }
                if (!obj.length) {
                    return res.send({"msg": "-1", "msgInfo": "文件表头不正确,缺少来源字段"});
                }

                api.post('/jobs/import-batch-job', res, obj, function (body) {
                    if (fileError) {
                        return res.sendStatus(404);
                    }
                    return res.send({msg: 1, msgInfo: '上传成功', body: body});
                });
            } else {
                /*格式不对*/
                fs.unlinkSync(fileTempName);
                res.send({"msg": "-1", "msgInfo": "文件格式不正确"});
            }
        } else {
            /*没传上*/
            res.send({"msg": "-1", "msgInfo": "系统错误"});
        }

    });
    form.on('error', function (err) {
        fileError = true;
        res.send({"msg": "-1", "msgInfo": "系统错误"}).end();
    });
    form.on('aborted', function () {
        fileError = true;
    });
    form.parse(req);
});
/*转换xlsx文件信息*/

router.get('/xlsxInfo/:id', function (req, res) {
    var id = req.params.id;
    api.get('/import-file-batch/' + id, res, {})
});
router.get('/jobsLog', function (req, res) {
    var query = req.query
    api.get('/jobs/search-log', res, query)
});
module.exports = router;