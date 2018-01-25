import express from 'express'
import path from 'path'
import compression from 'compression';
import cookieParser from 'cookie-parser';
import fs from 'fs';

import React from 'react';
import { match, RouterContext } from 'react-router';
import { renderToString } from 'react-dom/server';

import routes from './app/routing';
import MiddleWare from './tools/routeMiddleWare';

const port = process.env.PORT || 3000;

let app = express();
app.use(compression());
app.use(cookieParser());
app.use(express.static(path.join(process.cwd(), 'public')));
app.set('views', path.join(process.cwd(), 'views'));
app.set('view engine', 'pug');

function renderHTML(req, res) {
  //public/bundle.js // prolly wrong
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      if (error.message === 'Not found') {
        res.status(404).send(error.message);
      } else {
        res.status(500).send(error.message);
      }
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else {
      const html = renderToString(<RouterContext { ...renderProps} />);
      res.render('index', {
        content: html,
      })
    }
  });
}

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


app.get('*', MiddleWare(), (req, res) => { renderHTML(req, res) });

// app.get('/vote/testpage', (req, res) => {
//   fs.writeFileSync(`${__dirname}/testimage.png`, decodeBase64Image(base64).data, function (err) { console.warn(err, "err") });
// })

app.listen(port, () => {
  console.log("server started on port " + port)
})
