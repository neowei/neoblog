var http = require('http');
var url = require("url");
var qs = require('querystring');
var zlib = require('zlib');
var thunkify = require('thunkify');
exports = module.exports = httpclient;

function httpclient() {
}

httpclient.prototype.get = thunkify(function(uri, sendData, callback) {
    if (sendData.length > 0) {
        uri = uri + '?' + qs.stringify(sendData);
    }
    var options = {
        host : config.apidomain,
        port : 80,
        path : uri,
        agent : false,
        method : 'GET',
        headers : {
            'accept' : '*/*',
            'content-type' : "application/x-www-form-urlencoded",
            'accept-encoding' : 'gzip, deflate',
            'user-agent' : 'nodejs rest client'
        }
    };
    var request = http.request(options, function(response) {
        // console.log('HEADERS: ' + JSON.stringify(response.headers));
        if (response.statusCode == 200) {
            var chunks = [];
            response.on('data', function(chunk) {
                chunks.push(chunk);
            }).on('end', function() {
                var buffer = Buffer.concat(chunks);
                var encoding = response.headers['content-encoding'];
                if (encoding == 'gzip') {
                    zlib.gunzip(buffer, function(err, decoded) {
                        callback(err, decoded && decoded.toString());
                    });
                } else if (encoding == 'deflate') {
                    zlib.inflate(buffer, function(err, decoded) {
                        callback(err, decoded && decoded.toString());
                    })
                } else {
                    callback(err, buffer.toString());
                }
            });
        } else {

        }
    });
    request.on('error', function(e) {
        console.log('problem with request: ' + e.message);
    });
    request.end();
});

httpclient.prototype.post = thunkify(function(data, uri) {
    var postData = querystring.stringify({
        'msg' : 'Hello World!'
    });
});
