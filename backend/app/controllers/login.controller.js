/*
@copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author     : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained herein is, and remains
the property of ToXSL Technologies Pvt. Ltd. and its partners.
Unauthorized copying of this file, via any medium is strictly prohibited.
*/

const jwt = require('jsonwebtoken');
const users = require('../models/users.model.js');
const bcrypt = require('bcrypt');
const responseMessages = require('../../lib/responseMessages');

/**
 * function to log in.
 */
exports.login = function (req, res) {
	var data = req.body;
	users.findOne({ email: data.email }, function (err, user) {
		/*find user*/
		if (err) {
			res.json({
				errorCode: 1,
				message: err
			})
		} else {
			if (!user) {
				/*if user not found*/
				res.json({
					errorCode: 1,
					message: responseMessages.USERNOTFOUND
				});
			} else {
				bcrypt.compare(data.password, user.password, function (err, pwPresent) {
					/*check token*/
					if (pwPresent == true) {
						var token = jwt.sign({ user: user }, process.env.JWT_SECRET);
						user.state_id = 'active';
						user.updated_at = Date.now;
						user.save();
						res.json({
							errorCode: 0,
							message: responseMessages.LOGINSUCCESSFULL,
							token: token
						});
					} else {
						/*password not match*/
						res.json({
							errorCode: 1,
							message: responseMessages.PASSWORDMATCH
						});
					}
				});
			}
		}
	})
}

/**
 * function to register.
 */
exports.register = function (req, res) {
	var data = req.body;
	bcrypt.hash(data.password, parseInt(process.env.SALT_ROUNDS), function (err, hash) {
		/*encode password*/
		if (hash) {
			data = {
				email: data.email,
				username: data.username,
				password: hash,
				type_id: data.type_id,
				state_id: data.state_id
			};
			var InsertUser = new users(data);
			InsertUser.save(function (err, user) {
				if (err) {
					res.json({
						errorCode: 1,
						message: err
					});
				} else {
					/*create token*/
					let token = jwt.sign({ user: user }, process.env.JWT_SECRET);
					res.json({
						errorCode: 0,
						message: responseMessages.NEWREGISTRATION,
						token: token
					});
				}
			})
		} else {
			res.json({
				errorCode: 1,
				message: err
			});
		}
	})
}