"use strict";

var express = require('express'),
	http = require('http'),
	app = express();

/* Include the app engine handlers to respond to start, stop, and health checks. */
app.use(require('./lib/appengine-handlers'));

function extend(object, origObject) {
	var newObject = JSON.stringify(origObject),
		objKeys = Object.keys(object);

	newObject = JSON.parse(newObject);
	for (var i = 0, len = objKeys.length; i < len; i++) {
		var key = objKeys[i];
		newObject[key] = object[key];
	}

	return newObject;
}

function requestHandler(host, path, port, method, data, onData, onClose, onError, headers) {
	var defaultHeaders = {
		'Content-Length': data ? data.length : 0
	};
	headers = extend(headers || {}, defaultHeaders);
	var options = {
		hostname: host,
		port: port || 80,
		path: path || '',
		method: method || 'POST',
		headers: headers
	},
	result = '';
	var req = http.request(options, function(res) {
		res.setEncoding('utf8');
		res.on('data', onData || function (chunk) {
			result += chunk;
		});

		res.on('close', onClose || function () {
			console.log('Connection closed with result: ' + result);
		});
	});

	req.on('error', onError || function(e) {
		console.log('Problem with request: ' + e.message);
	});

	req.write(data);
	req.end();
}

function getPlexData(getAll) {
	var host = '',
		port = 32400,
		result = [],
		onData = function (chunk) {
			result.push(chunk);
		},
		onClose = function () {
			result = JSON.parse(result.join(''));
		},
		headers = {
			'Content-Type':'application/json'
		};

	if (getAll) {
		host += PLEX_ALL_ROUTE;
	} else {
		host += PLEX_RECENT_ROUTE;
	}
	requestHandler(host, null, port, null, null, onData, onClose, null, headers);

	return result;
}

// [START hello_world]
/* Say hello! */
app.post('/update/contentstore', function(req, res) {
	var data = getPlexData(true);
});
// [END hello_world]

// [START server]
/* Start the server */
var server = app.listen(process.env.PORT || '8080', '0.0.0.0', function() {
  console.log('App listening at http://%s:%s', server.address().address, server.address().port);
  console.log("Press Ctrl+C to quit.");
});
// [END server]
