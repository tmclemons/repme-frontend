import express from 'express'
import path from 'path'
import compression from 'compression';
import cookieParser from 'cookie-parser';

import React from 'react';
import { StaticRouter } from 'react-router';
import { renderToString } from 'react-dom/server';

import routes from './app/routing'

const port = process.env.PORT || 3000
let app = express()

app.use(compression());
app.use(cookieParser());
app.use(express.static(path.join(process.cwd(), 'public')));
app.set('views', path.join(process.cwd(), 'views'));
app.set('view engine', 'pug');

// function renderHTML(req, res) {

//   match(routes, req, (error, redirectLocation, renderProps) => {
//     console.log(renderProps)
//     if (error) {
//       if (error.message === 'Not found') {
//         res.status(404).send(error.message);
//       } else {
//         res.status(500).send(error.message);
//       }
//     } else if (redirectLocation) {
//       res.redirect(302, redirectLocation.pathname + redirectLocation.search);
//     } else {
//         const html = renderToString(
//           <StaticRouter location={req.url} context={renderProps}>
//             <App />
//           </StaticRouter>
//         );
//         res.send(
//           renderPage(html)
//         )
//     }
//   });
// }
// app.get('*', (req, res) => { renderHTML(req, res) });

app.get('/testpage', (req, res) => {
  res.send({
    msg: "here is the test"
  }) 
})

app.listen(port, () => {
  console.log("server started on port " + port)
})
