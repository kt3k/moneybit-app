(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.t10 = global.t10 || {})));
}(this, (function (exports) { 'use strict';

/**
 * t10 provides basic translation functionalities in Browsers.
 */

// The translation resource
var resource = {};

// The list of avaialable locales
var availables = [];

// The default language
var defaultLanguage = null;

/**
 * Sets the translation resource
 * @param {Object} resource The mapping from key to translated string
 */
var setResource = function (newResource) { resource = newResource; };

var getResource = function () { return resource; };

var clearResource = function () { return setResource({}); };

/**
 * Translates the key.
 * @param {String} key The key to translate
 * @return {String} The translated string
 */
var t = function (key) {
  var value = resource[key];

  if (value != null) {
    return value
  }

  return key
};

/**
 * Scan <t> tags and .t-text and .t-attr class elements and translate its contents
 * @param {?HTMLElement} dom The range to perform translation
 */
var scan = function (dom) {
  if (dom == null) {
    dom = document.body;
  }

  scanTTag(dom);
  scanTText(dom);
  scanTAttr(dom);
};

/**
 * remove <t> tag and insert string for key
 * @param {HTMLElement} dom The range to perform translation
 */
var scanTTag = function (dom) {
  [].forEach.call(dom.querySelectorAll('t'), function (el) {
    el.parentElement.insertBefore(new Text(t(el.textContent)), el);
    el.parentElement.removeChild(el);
  });
};

/**
 * scan .t-text class and replace text with translated string
 * @param {HTMLElement} dom The range to perform translation
 */
var scanTText = function (dom) {
  [].forEach.call(dom.querySelectorAll('.t-text'), function (el) {
    // replace text with translated string
    el.textContent = t(el.textContent);

    el.classList.remove('t-text');
    el.classList.add('t-text-done');
  });
};

var T_ATTR_REGEXP = /^t:/; // translatable attribute starts with 't:'

/**
 * scan .t-attr class and translate its attr starts with 't:' prefix
 * @param {HTMLElement} dom The range to perform translation
 */
var scanTAttr = function (dom) {
  [].forEach.call(dom.querySelectorAll('.t-attr'), function (el) {
    [].forEach.call(el.attributes, function (attr) {
      var label = attr.value;

      el.setAttribute(attr.name, 'abcde');
      if (T_ATTR_REGEXP.test(label)) {
        label = label.replace(T_ATTR_REGEXP, '');

        // replace attribute value with translated string
        el.setAttribute(attr.name, t(label));
      }
    });

    el.classList.remove('t-attr');
    el.classList.add('t-attr-done');
  });
};

/**
 * @param {string[]} languages The list of available languages
 */
var setAvailableLanguages = function (languages) {
  availables = languages;

  defaultLanguage = languages[0];
};

/**
 * Gets the avialable languages.
 * @return {string[]}
 */
var getAvailableLanguages = function () { return availables; };

/**
 * Returns the best match language among the available languages
 *
 */
var getBestLanguage = function (language) {
  if (language == null) {
    return defaultLanguage
  }

  if (availables.indexOf(language) !== -1) {
    return language
  }

  var candidates = [];

  availables.forEach(function (available) {
    var c = 0;

    while (!!available.charAt(c) && available.charAt(c) === language.charAt(c)) { c++; }

    if (c >= 2) {
      if (language.indexOf(available) !== -1) {
        // The available is included in the given language
        // The it gets the bonus point 100
        // Could be wrong approach
        c += 100;
      }
      candidates.push({ score: c, language: available });
    }
  });

  if (candidates.length === 0) {
    return defaultLanguage
  }

  candidates.sort(function (x, y) { return -x.score + y.score; });

  return candidates[0].language
};

exports.setResource = setResource;
exports.getResource = getResource;
exports.clearResource = clearResource;
exports.t = t;
exports.scan = scan;
exports.setAvailableLanguages = setAvailableLanguages;
exports.getAvailableLanguages = getAvailableLanguages;
exports.getBestLanguage = getBestLanguage;

Object.defineProperty(exports, '__esModule', { value: true });

})));

},{}],2:[function(require,module,exports){
(function (global){
'use strict';

global.t10 = require('t10');

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"t10":1}]},{},[2]);
