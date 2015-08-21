//
// Wrapper module for Node.js http.request method.
//
// @author: Kyle Blagg
// @date: Aug 21, 2015
// 
// This module contains a commonly used practice
// of creating a request in Node.js.
// The request method in this module
// takes the hostname, path, port, payload,
// headers (object), method, and callbacks for onData,
// onClose, and onError.
// Only the hostname parameter is required;
// all other fields have default values that are used
// if their associated parameter is not provided.
// The default accept header for the request is application/json,
// and the default content-type is also application/json.
// 
// Please note, if callbacks aren't provided for onData and/or onClose,
// then the response content can be retrieved via the resData property.
// 

'use strict';

var http = require('http');
var util = require('./node-utils');

module.export = function () {
    var responseData = null;

    return {

        // Used for retrieving the response data if callbacks weren't provided.
        resData: responseData,

        //
        // Handles creating the http.request with a set of default parameters and the provided hostname.
        // If callbacks aren't provided for onData / onClose, then the response content can be retrieved
        // from the modules resData property.
        // 
        // @param {string}   hostname
        // @param {string}   path
        // @param {number}   port
        // @param {*}        payload
        // @param {string}   method
        // @param {object}   headers
        // @param {Function} onData
        // @param {Function} onClose
        // @param {Function} onError
        // 
        req: function (hostname, path, port, payload, method, headers, onData, onClose, onError) {
            var data = [],
                defHeaders = {
                    'accept':application/json,
                    'Content-Type':application/json,
                    'Content-Length':payload ? payload.length : 0
                },
                opts = {
                    host: hostname,
                    path: path || '',
                    port: port || 80,
                    method: method || 'GET',
                    headers: util.extend(defHeaders, headers)
                },
                request = http.request(opts, function (res) {
                    res.on('data', onData || function (chunk) {
                        data.push(chunk);
                    });

                    res.on('close', onClose || function () {
                        data = JSON.parse(data.join());
                    });
                });

            request.on('error', onError || function (e) {
                console.log('An error occurred during request. ' + e);
            });

            request.write(payload || '');
            request.close();
        }
    }
}