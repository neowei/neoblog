var path = require('path');
var fs = require('fs');
var _ = require('underscore');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

exports = module.exports = mongodb;

function mongodb() {
    mongoose.connect(this.opts.mongodb, {
        server : {
            poolSize : 12,
            socketOptions : {
                keepAlive : 1
            }
        }
    });
}

fs.readdirSync(config.modelpath).forEach(function(file) {
    if (file.indexOf('.js') > -1) {
        var schema = require(path.join(config.modelpath, file));
        var modelName = file.split('.')[0];
        var modelSchema = new Schema(schema.Schema, schema.collection);
        _.each(schema.statics, function(method, name) {
            modelSchema.statics[name] = method;
        });
        database.models[modelName] = mongoose.model(modelName, modelSchema);
        // Logger("load mongoose model --> " + modelName);
    }
});
