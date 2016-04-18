'use strict';
exports = module.exports = ArrayMap;

function ArrayMap() {
    this._size = 0;
    this._map = {};
}

var proto = ArrayMap.prototype;

proto.put = function(key, value) {
    if (!this.containsKey(key)) {
        this._size++;
    }
    this._map[key] = value;
};

proto.get = function(key) {
    if (this.containsKey(key)) {
        return this._map[key];
    } else {
        return null;
    }
};

proto.size = function() {
    return this._size;
};

proto.remove = function(key) {
    if (delete this._map[key]) {
        this._size--;
    }
};

proto.containsKey = function(key) {
    return (key in this._map);
};

proto.containsValue = function(value) {
    for ( var prop in this._map) {
        if (this._map[prop] == value) {
            return true;
        }
    }
    return false;
}

proto.keyValues = function() {
    var list = [];
    for ( var prop in this._map) {
        var tag = {};
        tag.key = prop;
        tag.value = this._map[prop];
        list.push(tag);
    }
    return list;
}
