import express from 'express'

import React from 'react';
import { StaticRouter } from 'react-router';
import { renderToString } from 'react-dom/server';

import { matchRoutes, renderRoutes } from 'react-router-config';
import routeProps from '../routes';


const router = express.Router();

function renderHTML(req, res) {
  // const route = matchRoutes(routes, req.url);
    let context = {};
    const html = renderToString(
      <StaticRouter location={req.url} context={context}>
        {renderRoutes(routeProps)}
      </StaticRouter>
    );
    console.log(context)
    res.render('index', {
      content: html
    })
}

router.get('*', (err, req, res, next) => {
  console.log('hello world');
  console.log(err);
  // renderHTML(req, res);
  next()
});

module.exports = router;
