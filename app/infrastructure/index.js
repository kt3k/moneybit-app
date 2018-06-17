(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (global){
'use strict';

var storage = require('./storage');
var locale = require('./locale');

global.infrastructure = { storage: storage, locale: locale };

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./locale":2,"./storage":3}],2:[function(require,module,exports){
'use strict';

/**
 * Gets the lang tag which the user use.
 * @return {string}
 */
exports.getLangTag = function () {
  return Promise.resolve(undefined || 'en');
};

},{}],3:[function(require,module,exports){
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
