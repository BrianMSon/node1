'use strict';
var express = require('express');
var router = express.Router();
////////////////////////////////////////////////////////////////////

/* GET home page. */
router.get('/', function (req, res, next) {
	//console.log('REAL IP : ' + req.header('x-forwarded-for') || req.connection.remoteAddress);
	res.render('index', { title: 'Rapid Express' });
});

////////////////////////////////////////////////////////////////////
module.exports = router;
