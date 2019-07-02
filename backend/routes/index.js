/*
@copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author     : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained herein is, and remains
the property of ToXSL Technologies Pvt. Ltd. and its partners.
Unauthorized copying of this file, via any medium is strictly prohibited.
*/

/**
 * app routing.
 */
var express = require('express');
var router = express.Router();

var user = require('../app/controllers/user.controller.js');
var access = require('../app/controllers/login.controller.js');
var auth = require('../app/controllers/auth.controller.js');

router.get('/getUsers', auth.authenticate, user.getUsers);
router.post('/login', access.login);
router.post('/register', access.register);

module.exports = router;