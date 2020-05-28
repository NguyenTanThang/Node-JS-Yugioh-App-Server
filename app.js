var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var dotenv = require("dotenv");
var cors = require("cors");

dotenv.config({path: path.join("config", "config.env")});
require("./config/db")();

var indexRouter = require('./routes/index');
var typeRouter = require('./routes/types');
var attributesRouter = require('./routes/attributes');
var categoriesRouter = require('./routes/categories');
var cardsRouter = require('./routes/cards');
var spellCategoriesRouter = require('./routes/spell-categories');
var trapCategoriesRouter = require('./routes/trap-categories');
var spellCardsRouter = require('./routes/spell-cards');
var trapCardsRouter = require('./routes/trap-cards');

var app = express();

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/types', typeRouter);
app.use('/attributes', attributesRouter);
app.use('/categories', categoriesRouter);
app.use('/spell-categories', spellCategoriesRouter);
app.use('/trap-categories', trapCategoriesRouter);
app.use('/cards', cardsRouter);
app.use('/spell-cards', spellCardsRouter);
app.use('/trap-cards', trapCardsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err);
});

module.exports = app;
