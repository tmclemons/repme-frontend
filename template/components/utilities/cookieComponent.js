import React from 'react';
import cookie from 'react-cookies';

  const set = (name, data, props) => {
    if (name && data) {
      props = props && typeof props === 'object' ? props : null
      cookie.save(name, data, props)
    }
  }

  const get = (name) => {
    if (name) {
      cookie.load(name);
    }
  }

  const remove = (name) => {
    if (name) {
      cookie.remove(name)
    }
  }

  const setUserFlow = (userFlow, bool) => {
    bool = typeof bool === 'boolean' ? bool : true;
    cookie.remove(userFlow);
    cookie.save(userFlow, (bool), {
      path: '/',
      maxAge: 1000,
    });
    return bool;
  }

  const getUserFlow = (userFlow) => {
    let cookieResult = cookie.load(userFlow) == 'true' ? true : false;
    return cookieResult;
  }



  export default {
    set: set,
    get: get,
    remove: remove,
    setUserFlow: setUserFlow,
    getUserFlow: getUserFlow
  }