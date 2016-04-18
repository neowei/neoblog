'use strict';

String.prototype.replaceAll = function(str, replaceStr) {
    return this.replace(new RegExp(str, 'gm'), replaceStr);
};