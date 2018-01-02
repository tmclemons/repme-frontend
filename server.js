import express from 'express'
import path from 'path'
import React from 'react'
import { match, RouterContext } from 'react-router'
import { renderToString } from 'react-dom/server'
import routes from './app/routing'


const app = express()
const port = process.env.PORT || 3000

// serve static assets normally
// app.use(express.static(__dirname + '/public'))

app.get('*', function (req, res) {
  match(
    {routes, location: req.url},
    (error, redirectLocation, renderProps) => {
      if (error) {
        res.status(500).send(error.message)
      } else if (redirectLocation) {
        res.redirect(302, redirectLocation.pathname
        + redirectLocation.search)
      } else if (renderProps) {
        const appHtml = renderToString(
           <RouterContext {...renderProps} />
         )
        res.send(
          renderPage(appHtml)
        )
      } else {
        res.status(404)
          .send('Not Found')
      }
    }
  )
  res.send(path.resolve(path.join(__dirname, './public'), 'index.html'))
})


function renderPage(appHtml, appTitle) {
  return `
  <!DOCTYPE html public="storage">
  <html>
  <head>
      <meta charset="utf-8">
      <title>AppMetrix</title>
  <body>
      <div id="app">${appHtml}</div>
      <script src="/bundle.js"></script>
  </body>
  </html>
    `
}

app.listen(port)
console.log("server started on port " + port)