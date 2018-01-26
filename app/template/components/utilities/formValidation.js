import React from 'react';

const emailValidation = (address, characterLimit) => {
  if(address.length > 0){
    let regExTest = /^([A-Z|a-z|0-9](\.|_){0,1})+[A-Z|a-z|0-9]\@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){2}\.[a-z]{2,3}$/;
    let passRegexTest = regExTest.test(address.toLowerCase());
    let characterLimitTest = address.length > (characterLimit || 64) ?
    false : true;
    return passRegexTest && characterLimitTest;
  } else {
    return true;
  }
}

const zipCodeValidation = (zipCode) => {
  if(zipCode.length > 0) {
    let regExTest = /^\d{5}(\-?\d{4})?$/;
    let passRegexTest = regExTest.test(zipCode);
    return passRegexTest;
  } else {
    return true;
  }
};

export default {
  emailValidation: emailValidation,
  zipCodeValidation: zipCodeValidation
}