/*
@copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author     : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained herein is, and remains
the property of ToXSL Technologies Pvt. Ltd. and its partners.
Unauthorized copying of this file, via any medium is strictly prohibited.
*/

var users = require('../models/users.model.js');
var mongoose = require('mongoose');
var responseMessages = require('../../lib/responseMessages');

/**
 * function to get all Users.
 */
exports.getUsers = function (req, res) {
    /*get all users list*/
    users.find({}).sort({ created_on: 'desc' }).exec(function (err, user) {
        if (err) {
            res.json({
                errorCode: 1,
                message: err
            });
        } else {
            if (!user.length) {
                res.json({
                    errorCode: 0,
                    message: responseMessages.NODATAFOUND
                });
            } else {
                res.json({
                    errorCode: 0,
                    data: user
                });
            }
        }
    })
}