/*
@copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author     : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained herein is, and remains
the property of ToXSL Technologies Pvt. Ltd. and its partners.
Unauthorized copying of this file, via any medium is strictly prohibited.
*/

var mongoose = require('mongoose');
const validator = require('validator');

/**
 * module.exports allows us to pass this to other files when it is called.
 * database schema for users.
 */
module.exports = mongoose.model('users', {
	email: {
		type: String,
		required: true,
		unique: true,
		validate: (value) => {
			return validator.isEmail(value)
		}
	},
	username: { type: String, required: true },
	password: { type: String, required: true },
	state_id: {
		type: String,
		required: true,
		default: 'active',
		enum: ['active', 'inactive', 'deleted', 'pending']
	},
	type_id: {
		type: String,
		required: true,
		default: 'user',
		enum: ['admin', 'sub-admin', 'user']
	},
	created_on: {
		type: Date,
		default: Date.now
	},
	updated_on: {
		type: Date,
		default: Date.now
	}
});