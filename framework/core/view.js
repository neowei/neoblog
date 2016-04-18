var path = require('path');
var views = require('co-views');

exports = module.exports = view;

function view() {
}

view.prototype.render = views(config.viewpath, {
default : 'jade'
});