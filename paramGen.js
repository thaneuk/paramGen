/*
 * Copyright (c) 2017 Gregory Jackson. All rights reserved.
 */

/**
 * ES5 Class for constructing url parameters from object/array with full recursion
 * @class
 */
function UrlParameters() {
}

/**
 * Turns an object into a url parameter string
 * @param obj {Object} object to parse
 * @returns {string}
 */
UrlParameters.prototype.fromObj = function (obj) {
    return this.toArray(obj).join('&').replace(/%20/g, '+');
};

/**
 * Parses an object or array and returns an array of encoded values
 * @param objOrArray {Object|Array} object or array to parse
 * @param parents {Array} list of parent object property names
 * @returns {Array}
 */
UrlParameters.prototype.toArray = function (objOrArray, parents) {
    var me = this,
        paramArray = [];

    /* validate the objOrArray parameter */
    if (objOrArray === null || typeof objOrArray !== 'object') {
        throw 'UrlParamGenerator.toArray: Object/Array expected.';
    }

    /* first level there are no parents so it will be undefined, so we set it to empty array */
    parents = parents || [];

    /* iterate the object/array */
    Object.keys(objOrArray).forEach(function (key) {
        var value = objOrArray[key],
            childObjParents = me.dupeAndAdd(parents, key);

        if (value !== null && typeof value === 'object') {
            /* if value is an object or array we concat the results of a recursive call */
            paramArray = paramArray.concat(me.toArray(value, childObjParents));
        } else {
            /* we have a primitive value so push the encoded information onto our results array */
            paramArray.push(me.enc(Array.isArray(objOrArray) ? me.propName(parents) + '[]' : me.propName(childObjParents), value));
        }
    });

    return paramArray;
};

/**
 * Creates key name for a url property based on array values
 * @param propArr {Array} list of parent object property names
 * @returns {string}
 */
UrlParameters.prototype.propName = function (propArr) {
    var propStr = '';

    /* validate propArr param */
    if (!Array.isArray(propArr)) {
        throw 'UrlParamGenerator.propName: Array expected.';
    }

    propArr.forEach(function (propName, i) {
        if (i === 0) {
            /* first property doesn't have square brackets */
            propStr += propName;
        } else {
            propStr += '[' + propName + ']';
        }
    });

    return propStr;
};

/**
 * Takes key and value properties and returns an encoded string
 * @param key {string}
 * @param value {string|Function|null|Boolean}
 * @returns {string}
 */
UrlParameters.prototype.enc = function (key, value) {
    /* if the value passed in we run it for the value */
    if (typeof value === 'function') {
        value = value();
    }

    /* encode key value pair, if null then result should be empty string */
    return window.encodeURIComponent(key) + '=' + window.encodeURIComponent(value === null ? '' : value);
};

/**
 * Simple array duplicator which additionally pushes a property onto the duplicated array
 * @param arr {array} array to duplicate
 * @param [item] {*} optional item to push onto array
 * @returns {Array}
 */
UrlParameters.prototype.dupeAndAdd = function (arr, item) {
    if (!Array.isArray(arr)) {
        throw 'UrlParamGenerator.copy: Array expected.';
    }

    /* simple dupe array using map */
    arr = arr.map(function (item) {
        return item;
    });

    /* push item if exists */
    if (item !== undefined) {
        arr.push(item);
    }

    return arr;
};
