import React, { Component } from "react";


const ApiCallComponent = (url) => {
  fetch(url)
  .then(results => {
    console.log('results', results)
    return results.json();
  })
}

export default ApiCallComponent;