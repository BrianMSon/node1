#!/usr/bin/env node

/**
 * Module dependencies.
 */

'use strict';

///////////////////
// START of CODE //
///////////////////

//global.logger = require('../mylib/logger_mylib');

var app = require('../app');
var debug = require('debug')('node1:server');
var http = require('http');
//var socketio = require('socket.io');
//var app_socketio = require('../app_socketio');
//var app_socketio_pub = require('../app_socketio_pub');

/**
 * Get port from environment and store in Express.
 */

var defaultPort = 3000;
if (process.argv.length >= 3) {
 	defaultPort = process.argv[2];
 	//console.log(defaultPort);
}

var port = normalizePort(process.env.PORT || defaultPort);
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

// upgrade http server to socket.io server
//var io = socketio(server);
//app_socketio.set(io);
//app_socketio_pub.set(io);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

//var socketio_redis = require('socket.io-redis');
//io.adapter(socketio_redis({ host: 'localhost', port: 6379 }));


/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
	var port = parseInt(val, 10);

	if (isNaN(port)) {
		// named pipe
		return val;
	}

	if (port >= 0) {
		// port number
		return port;
	}

	return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
	if (error.syscall !== 'listen') {
		throw error;
	}

	var bind = (typeof port === 'string') ? 'Pipe ' + port : 'Port ' + port;

	// handle specific listen errors with friendly messages
	switch (error.code) {
		case 'EACCES':
			console.error(bind + ' requires elevated privileges');
			process.exit(1);
			break;
		case 'EADDRINUSE':
			console.error(bind + ' is already in use');
			process.exit(1);
			break;
		default:
			throw error;
	}
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
	var addr = server.address();
	var bind = (typeof addr === 'string') ? 'pipe ' + addr : 'port ' + addr.port;
	debug('Listening on ' + bind);
	//global.logger.console.verbose('Listen Port : ' + port);
}

