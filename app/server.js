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
app.set('views', path.join(process.cwd(), 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(process.cwd(), 'css')));


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

app.use(routes);

// app.use('/vote', (req, res, next) => {
//   console.log(routes)
//   console.log('THIS IS A TEST')
//   res.send('THIS IS A TEST')
// });
// app.use('/aarp', routes);
// app.use('/repme', routes);
app.use('/test/test', (req, res, next) => {
  console.log('THIS IS A TEST')
  res.send('THIS IS A TEST')
});


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

// app.use('/:org', routes);

// app.use('/', (err, req, res, next) => {
//   res.send('hello world');
//   // console.log(err);
//   // console.log('Time:', Date.now())
//   // renderHTML(req, res);
//   // next()
// });

// app.get('/:org', (err, req, res, next) => {
//   console.log(req.params.org),
//   console.log('req.params.org'),
//   renderHTML(req, res)
// });

// app.use(function (req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });
// function renderHTML(req, res) {
//   match({ routes, location: req.url}, (error, redirectLocation, renderProps) => {
//     if (error) {
//       if (error.message === 'Not found') {
//         res.status(404).send(error.message);
//       } else {
//         res.status(500).send(error.message);
//       }
//     } else if (redirectLocation) {
//       res.redirect(302, redirectLocation.pathname + redirectLocation.search);
//     } else {
//       const html = renderToString(<StaticRouter location={req.url} context={renderProps} />);
//         res.render('index', {
//           content: html
//         })
//     }
//   });
// }


// function renderHTML(req, res) {
//   let context = {};
//   const html = renderToString(
//     <StaticRouter
//       location={req.url}
//       context={context}
//     >
//       <Component />
//     </StaticRouter>
//   );
//   console.log(context, "router ran")
//   res.render('index', {
//       content: html
//   });
// }

// router.get('/:org', (req, res) => { renderHTML(req, res) });
// router.get('/', (req, res) => { renderHTML(req, res) });
// router.get('/', (req, res) => { renderHTML(req, res) });

// router.get('/:org', (req, res) => { renderHTML(req, res) });
// router.get('/export/:org/:zipcode', (req, res) => { renderHTML(req, res) });
console.log("server is running")
// router.get('/vote/testpage', (req, res) => {
//   fs.writeFileSync(`${__dirname}/testimage.png`, decodeBase64Image(base64).data, function (err) { console.warn(err, "err")});
// })

module.exports = app;
