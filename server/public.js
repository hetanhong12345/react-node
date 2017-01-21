/**
 * Created by Administrator on 2016/10/11.
 */
var express = require('express');
var router = express();
var fs = require('fs');
var path = require('path');
var url = require('url');
var mime = require('mime');
router.get('*',function (request, response) {
    var pathname = url.parse(request.url).pathname;
    pathname = path.resolve(__dirname, '../public'+pathname)
    var ext = path.extname(pathname);
    ext = ext ? ext.slice(1) : 'unknown';
    var contentType = mime[ext] || "text/plain";
    response.setHeader("Content-Type", contentType);
    fs.stat(pathname, function (err, stat) {
        if (err) {
            response.writeHead(404, "Not Found", {'Content-Type': 'text/plain'});
            response.write("文件不存在");

            response.end();
            return
        }
        var lastModified = stat.mtime.toUTCString();
        var ifModifiedSince = "If-Modified-Since".toLowerCase();
        response.setHeader("Last-Modified", lastModified);
        if (request.headers[ifModifiedSince] && lastModified == request.headers[ifModifiedSince]) {
            response.writeHead(304, "Not Modified");
            response.end();
        } else {
            fs.readFile(pathname, "binary", function (err, file) {
                if (err) {
                    response.writeHead(500, "Internal Server Error", {'Content-Type': 'text/plain'});
                    response.end(err);
                } else {
                    response.writeHead(200, "Ok");
                    response.write(file, "binary");
                    response.end();
                }
            });
        }

    })

})
module.exports = router;