(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
'use strict';

var storage = require('./storage');

global.infrastructure = { storage: storage };

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./storage":2}],2:[function(require,module,exports){
"use strict";

/**
 * Gets the value of the key.
 * @param {string} key The key
 * @param {object} defaultValue The default value
 * @return {Promise<object>}
 */
exports.get = function (key, defaultValue) {
  var value = window.localStorage.getItem(key);

  return Promise.resolve(value != null ? JSON.parse(value) : defaultValue);
};

/**
 * Sets the value to the key.
 * @param {string} ket The key
 * @param {object} value The value to set
 * @return {Promise}
 */
exports.set = function (key, value) {
  window.localStorage.setItem(key, JSON.stringify(value));

  return Promise.resolve();
};

},{}]},{},[1]);
