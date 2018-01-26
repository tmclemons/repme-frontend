import express from 'express'
import path from 'path'
import compression from 'compression';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import fs from 'fs';

import React from 'react';
import { StaticRouter } from 'react-router';
import { renderToString } from 'react-dom/server';

import { matchRoutes, renderRoutes } from 'react-router-config';
import routes from './server-routes/server-routes';

let app = express()

app.use(compression());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'views')));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, '..', 'public')));


function decodeBase64Image(dataString) {
  var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
    response = {};

  if (matches.length !== 3) {
    return new Error('Invalid input string');
  }

  response.type = matches[1];
  response.data = new Buffer(matches[2], 'base64');
  return response;
}

app.use('/', routes);
app.use('/vote/:org', routes);
app.use('/export/:org/:zip', routes);

app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('index', {
    message: err.message,
    error: err
  });
});

console.log("server is running")

module.exports = app;
