/*
@copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author     : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained herein is, and remains
the property of ToXSL Technologies Pvt. Ltd. and its partners.
Unauthorized copying of this file, via any medium is strictly prohibited.
*/

const jwt = require('jsonwebtoken');
const responseMessages = require('../../lib/responseMessages');

/**
 * verify if authenticated user with jwt token.
 */
exports.authenticate = (req, res, next) => {
	let token = req.headers['authorization'];
	jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
		if (decoded) {
			req.id = decoded.user._id;
			next();
		} else {
			res.json({
				errorCode: 0,
				message: responseMessages.INVALIDTOKEN
			});
		}
	});
}