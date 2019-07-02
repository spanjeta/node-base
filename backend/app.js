/*
@copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author     : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained herein is, and remains
the property of ToXSL Technologies Pvt. Ltd. and its partners.
Unauthorized copying of this file, via any medium is strictly prohibited.
*/

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var mongoose = require('mongoose');
var cors = require('cors')

require('dotenv').config();

var app = express();

/**
 * view engine setup.
 */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use('/', indexRouter);

/**
 * connection with mongoose.
 */
mongoose.connect(process.env.DB_URl, { useNewUrlParser: true }, function (err, db) {
  if (err) {
    console.log("error", err);
  } else {
    console.log('connected');
  }
});
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

/**
 * catch 404 and forward to error handler.
 */
app.use(function (req, res, next) {
  next(createError(404));
});

/**
 * error handler.
 */
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;