import express from 'express'
import path from 'path'
import React from 'react'
import { match, RouterContext } from 'react-router'
import { renderToString } from 'react-dom/server'

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
        res.status(200).send(
          renderToString(
            <RouterContext {...renderProps} />
          )
        )
      } else {
        res.status(404)
          .send('Not Found')
      }
    }
  )
  res.send(path.resolve(path.join(__dirname, './public'), 'index.html'))
})

app.listen(port)
console.log("server started on port " + port)