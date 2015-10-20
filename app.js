'use strict';

var express = require('express');
var domain = require('express-domain-middleware');
var path = require('path');
//var favicon = require('serve-favicon');
//var morgan_logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

app.use(domain);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(morgan_logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//////////////////////////////////////////
app.use('/', require('./routes_base/index'));
app.use('/users', require('./routes_base/users'));
//////////////////////////////////////////

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

////////////////////////
// error handlers
////////////////////////

// domain error handler (first of all)
app.use(function errorHandler(err, req, res, next) {
	console.log('error on request %d %s %s: %j', process.domain.id, req.method, req.url, err);
	res.send("Something bad happened --;");
	if (err.domain) {
		//you should think about gracefully stopping & respawning your server 
		//since an unhandled error might put your application into an unknown state 
	}
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function (err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});

module.exports = app;
