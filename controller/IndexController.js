import path from 'path';
import request from 'request';
import thunkify from 'thunkify';
import {route, HttpMethod} from 'koa-router-decorators';

@route('/index')
export default class IndexController {
    
    constructor() {
    }
    
    @route('/', HttpMethod.GET)
    static *index(next) {
        var get = thunkify(request.get);
        var result1 = get('http://baidu.com/1');
        var result2 = get('http://baidu.com/2');
        var res = yield [result1, result2];
        logger.trace(1);
        logger.debug(2);
        logger.info(3);
        logger.warn(4);
        logger.error(5);
        logger.fatal(6);
        this.body = yield view.render('index.pug',{'content' : res[1][0].body}); 
    }
}



// var HttpClient = require(path.join(config.librariespath, 'httpclient.js'));
// var controller = {};

// exports = module.exports = controller;

// controller.index = function*(next) {
    // var httpclient = new HttpClient();
// this.session.test = 'test123';
// var result1 = get('http://baidu.com/1');
// var result2 = get('http://baidu.com/2');
// var result3 = get('http://baidu.com/3');
// var result4 = get('http://baidu.com/4');
// var result5 = get('http://baidu.com/5');
// var result6 = get('http://baidu.com/6');
    // var result7 = get('http://youku.com');
// var res = yield [result1, result2,result3,result4,result5,result6];
// logger.trace(1);
// logger.debug(2);
// logger.info(3);
// logger.warn(4);
// logger.error(5);
// logger.fatal(6);
    // console.log(JSON.parse(result.toString()).code);
// this.body = yield view.render('index.jade',{'content' : res[1][0].body});
// };
//
// controller.test = function*(next) {
// this.body = yield view.render('index.jade', { 'content': this.session.test
// });
// }
