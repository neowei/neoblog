//'use strict';
var path = require('path');
var request = require('request');
var thunkify = require('thunkify');
var get = thunkify(request.get);
// var HttpClient = require(path.join(config.librariespath, 'httpclient.js'));
var controller = {};

exports = module.exports = controller;

controller.index = function*(next) {
    // var httpclient = new HttpClient();
    this.session.test = 'test123';
    var result1 = get('http://dev.www.egobus.com/gdmap/ajaxListStation');
    var result2 = get('http://dev.www.egobus.com/gdmap/ajaxRefreshVehicle');
    var res = yield [result1, result2];
    logger.trace(1);
    logger.debug(2);
    logger.info(3);
    logger.warn(4);
    logger.error(5);
    logger.fatal(6);
    // console.log(JSON.parse(result.toString()).code);
    this.body = yield view.render('index.jade',{'content' : res[1][0].body}); 
};

controller.test = function*(next) {
    this.body = yield view.render('index.jade', { 'content': this.session.test }); 
}
