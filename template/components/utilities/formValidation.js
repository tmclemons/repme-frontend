import React from 'react';

const emailValidation = (address, characterLimit) => {
  let regExTest = /^([A-Z|a-z|0-9](\.|_){0,1})+[A-Z|a-z|0-9]\@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){2}\.[a-z]{2,3}$/;
  let passRegexTest = regExTest.test(address.toLowerCase());
  let characterLimitTest = address.length > (characterLimit || 64) ?
  false : true;
  return passRegexTest && characterLimitTest;
}

const zipCodeValidation = (zipCode) => {
  let regExTest = /^\d{5}(\-?\d{4})?$/;
  let passRegexTest = regExTest.test(zipCode);
  return passRegexTest;
};

export default {
  emailValidation: emailValidation,
  zipCodeValidation: zipCodeValidation
}