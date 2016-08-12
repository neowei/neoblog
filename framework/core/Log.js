import log4js from 'log4js';
import fs from 'fs';
import path from 'path';

export default class Log {
    constructor() {
        var objConfig = JSON.parse(fs.readFileSync(path.join(config.configpath,'log4js.json'), "utf8"));
        if (objConfig.appenders) {
            var baseDir = path.join(config.rootpath, objConfig["customBaseDir"]);
            var defaultAtt = objConfig["customDefaultAtt"];
            for (var i = 0, j = objConfig.appenders.length; i < j; i++) {
                var item = objConfig.appenders[i];
                if (item["type"] == "console") {
                    continue;
                }
                if (defaultAtt != null) {
                    for ( var att in defaultAtt) {
                        if (item[att] == null)
                            item[att] = defaultAtt[att];
                    }
                }
                if (baseDir != null) {
                    if (item["filename"] == null) {
                        item["filename"] = baseDir;
                    } else {
                        item["filename"] = baseDir + item["filename"];
                    }
                }
                var fileName = item["filename"];
                if (fileName == null) {
                    continue;
                }
                var pattern = item["pattern"];
                if (pattern != null) {
                    fileName += pattern;
                }
                var dir = path.dirname(fileName);
                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir);
                }
            }
        }
        log4js.configure(objConfig);
        this.console =  log4js.getLogger('console');
        this.logAll = log4js.getLogger('logAll');
        this.logTrace = log4js.getLogger('logTrace');
        this.logDebug = log4js.getLogger('logDebug');
        this.logInfo = log4js.getLogger('logInfo');
        this.logWarn = log4js.getLogger('logWarn');
        this.logError = log4js.getLogger('logError');
        this.logFatal = log4js.getLogger('logFatal');
        this.use = function * (app){
            app.use(log4js.connectLogger(this.console, {
                level : config.loglevel,
                format : ':method :url'
            }));
        }
    }
    
    trace = function(msg) {
        if (msg == null) {
            msg = "";
        }
        if(config.env === 1) {
            this.console.trace(msg);
        }
        this.logAll.trace(msg);
        this.logTrace.trace(msg);
    }
    
    debug = function(msg) {
        if (msg == null) {
            msg = "";
        }
        if(config.env === 1) {
            this.console.debug(msg);
        }
        this.logAll.debug(msg);
        this.logDebug.debug(msg);
    }
    
    info = function(msg) {
        if (msg == null) {
            msg = "";
        }
        if(config.env === 1) {
            this.console.info(msg);
        }
        this.logAll.info(msg);
        this.logInfo.info(msg);
    }
    
    warn = function(msg) {
        if (msg == null) {
            msg = "";
        }
        if(config.env === 1) {
            this.console.warn(msg);
        }
        this.logAll.warn(msg);
        this.logWarn.warn(msg);
    }
    
    error = function(msg, exp) {
        if (msg == null) {
            msg = "";
        }
        if (exp != null) {
            msg += "\r\n" + exp;
        }
        if(config.env === 1) {
            this.console.error(msg);
        }
        this.logAll.error(msg);
        this.logError.error(msg);
    }
    
    fatal = function(msg, exp) {
        if (msg == null) {
            msg = "";
        }
        if (exp != null) {
            msg += "\r\n" + exp;
        }
        if(config.env === 1) {
            this.console.fatal(msg);
        }
        this.logAll.fatal(msg);
        this.logFatal.fatal(msg);
    }
       
}
