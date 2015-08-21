// 
// Utility functions for Node.js
// 
// @author: Kyle Blagg
// @date: Aug 21, 2015
// 
// This module contains some common utility methods,
// and helper functions.
// 

'use strict';

module.export = function () {
    return {

        //
        // This function simulates the behavior of
        // jQuery's $.extend method.
        // The first object passed is the default object,
        // so any property with the same name defined
        // in the second object will override the
        // property in the first object.
        // As of right now deep copying is not supported, so
        // the entire value of a property in the secondObject
        // will replace the value in the first object.
        // It's worth noting that the original objects will
        // not actually be modified.  A new object is
        // created that contains the result of the merger.
        // 
        // @param {object}  defObj
        // @param {object}  overrideObj
        // @param {boolean} deep        - NOT CURRENTLY SUPPORTED
        // 
        // @return {object}
        // 
        extend: function (defObj, overrideObj, deep) {
            // TODO: Implement support for 'deep'

            // Weird cloning trick for JSON objects
            var newObj = JSON.parse(JSON.stringify(defObj)),
                overrideObjKeys = Object.keys(overrideObj),
                key;

            while (key = overrideObjKeys.shift()) {
                newObj[key] = overrideObj[key];
            }

            return newObj;
        },

        // 
        // Utility function that handles comparing two
        // objects to see if they are equal.
        // Returns true if equal, false otherwise.
        // You can optionally provide a class to compare the
        // object against as a kind of first pass equality check.
        // 
        // @param {object}   expected
        // @param {object}   actual
        // @param {Function} cls      - Optional class that extends object.
        // 
        // @return {boolean}
        // 
        equalTo: function (expected, actual, cls) {
            var isEqual = false;
            cls = cls || Object;

            if (actual instanceof cls) {
                isEqual = true
                var compare = function (val, key) {
                    if ((!expected.hasOwnProperty(key) || expected[key] !== val)) {
                        return isEqual = false;
                    }
                };
                this.foreach(actual, compare);
            }

            return isEqual;
        },

        // 
        // Utility function for performing some
        // task in a loop.  Takes the object you
        // wish to iterate over, and a callback
        // function.
        // The callback function will receive two
        // arguments.  The first parameter passed to
        // the callback is the element to evaluate,
        // and the optional second parameter is the
        // index/key of the element being evaluated.
        // Note: You can exit the loop early by returning
        // false in your callback function.
        // 
        // @param {object}   obj
        // @param {Function} cb
        // 
        foreach: function (obj, cb) {
            var keys = Object.keys(obj),
                key;

            while (key = keys.shift()) {
                if (cb(obj[key], key) === false) {
                    break;
                }
            }
        }
    }
}