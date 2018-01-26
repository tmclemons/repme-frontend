import express from 'express'
import path from 'path'
import compression from 'compression';
import cookieParser from 'cookie-parser';
import fs from 'fs';

import React from 'react';
import { StaticRouter } from 'react-router';
import { renderToString } from 'react-dom/server';

import { matchRoutes, renderRoutes } from 'react-router-config';

import routes from './app/routes';

const port = process.env.PORT || 3000
let app = express()
let router = express.Router()

app.use(compression());
app.use(cookieParser());
app.use(express.static(path.join(process.cwd(), 'public')));
app.set('views', path.join(process.cwd(), 'views'));
app.set('view engine', 'pug');

function renderHTML(req, res) {
  console.log(res, req.url, routes)
  const route = matchRoutes(routes, req.url);
  console.log('routes Matched')
    let context = {};
    const html = renderToString(
      <StaticRouter location={req.url} context={context}>
        {renderRoutes(routes)}
      </StaticRouter>
    );
    console.log(context)
    res.render('index', {
      content: html
    })
}

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

app.get('/', (req, res) => { renderHTML(req, res) });
app.get('/:org', (req, res) => { renderHTML(req, res) });
// router.get('/:org', (req, res) => { renderHTML(req, res) });
// router.get('/', (req, res) => { renderHTML(req, res) });
// router.get('/', (req, res) => { renderHTML(req, res) });

// router.get('/:org', (req, res) => { renderHTML(req, res) });
// router.get('/export/:org/:zipcode', (req, res) => { renderHTML(req, res) });
console.log("server is running")
// router.get('/vote/testpage', (req, res) => {
//   fs.writeFileSync(`${__dirname}/testimage.png`, decodeBase64Image(base64).data, function (err) { console.warn(err, "err")});
// })

app.listen(port, () => {
  console.log("server started on port " + port)
})

module.exports = router;
