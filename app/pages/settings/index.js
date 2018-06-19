(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports = require('./src')

},{"./src":8}],2:[function(require,module,exports){
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):e.genel=t()}(this,function(){var e=function(t){return Array.isArray(t)?e.div.apply(null,arguments).firstChild:function(e){var r=arguments,o=document.createElement(t);return o.innerHTML=e.map(function(e,t){return e+(r[t+1]||"")}).join("").trim(),o}};return"a,abbr,address,area,article,aside,audio,b,base,bdi,bdo,blockquote,body,br,button,canvas,caption,cite,code,col,colgroup,data,datalist,dd,del,details,dfn,dialog,div,dl,dt,em,embed,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,i,iframe,img,input,ins,kbd,keygen,label,legend,li,link,main,map,mark,math,menu,menuitem,meta,meter,nav,noscript,object,ol,optgroup,option,output,p,param,picture,pre,progress,q,rb,rp,rt,rtc,ruby,s,samp,script,section,select,slot,small,source,span,strong,style,sub,summary,sup,svg,table,tbody,td,template,textarea,tfoot,th,thead,time,title,tr,track,u,ul,var,video,wbr".split(",").forEach(function(t){e[t]=e(t)}),e});

},{}],3:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],4:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _desc, _value, _class2;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

var nextTick = require('../quarks/next-tick');
var _capsid = capsid,
    emits = _capsid.emits,
    on = _capsid.on,
    component = _capsid.component,
    wire = _capsid.wire;


var OPEN = 'mb/input-modal/OPEN';
var CLOSE = 'mb/input-modal/CLOSE';
var INPUT = 'mb/input-modal/INPUT';

var InputModal = (_dec = component('input-modal'), _dec2 = wire.el('input'), _dec3 = on(OPEN), _dec4 = on('click', { at: 'button' }), _dec5 = emits(INPUT), _dec6 = on.outside('click'), _dec7 = on(CLOSE), _dec(_class = (_class2 = function () {
  function InputModal() {
    _classCallCheck(this, InputModal);
  }

  _createClass(InputModal, [{
    key: 'open',
    value: function open(_ref) {
      var title = _ref.detail;

      this.input.value = title;
      this.el.parentElement.classList.add('is-visible');
    }
  }, {
    key: 'onSave',
    value: function onSave() {
      return this.input.value;
    }
  }, {
    key: 'close',
    value: function close() {
      this.el.parentElement.classList.remove('is-visible');
    }
  }, {
    key: 'input',
    get: function get() {}
  }]);

  return InputModal;
}(), (_applyDecoratedDescriptor(_class2.prototype, 'input', [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, 'input'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'open', [_dec3, nextTick], Object.getOwnPropertyDescriptor(_class2.prototype, 'open'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'onSave', [_dec4, _dec5], Object.getOwnPropertyDescriptor(_class2.prototype, 'onSave'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'close', [_dec6, _dec7], Object.getOwnPropertyDescriptor(_class2.prototype, 'close'), _class2.prototype)), _class2)) || _class);


module.exports = InputModal;
module.exports.OPEN = OPEN;
module.exports.CLOSE = CLOSE;
module.exports.INPUT = INPUT;

},{"../quarks/next-tick":5}],5:[function(require,module,exports){
"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * Decorator which delays the execution of the method to the next tick.
 */
module.exports = function (target, key, descriptor) {
  var method = descriptor.value;

  return _extends({}, descriptor, {
    value: function value() {
      var _this = this,
          _arguments = arguments;

      setTimeout(function () {
        method.apply(_this, _arguments);
      });
    }
  });
};

},{}],6:[function(require,module,exports){
// hub
exports.HUB_READY = 'mb/hub/READY'
// ui
exports.UI_READY = 'mb/ui/READY'
// app state
exports.INIT_APP_STATE = 'mb/app-state/INIT'
exports.APP_STATE_READY = 'mb/app-state/READY'
// location
exports.CHECK_LOCATION = 'mb/location/CHECK'
exports.LOCATION_OK = 'mb/location/OK'
exports.LOCATION_NG = 'mb/location/NG'
// user
exports.INIT_USER = 'mb/user/INIT'
exports.USER_READY = 'mb/user/READY'
// journal document
exports.CREATE_JOURNAL_DOCUMENT = 'mb/journal-document/CREATE'
exports.CHANGE_CURRENT_DOCUMENT = 'mb/journal-document/CHANGE'
exports.UPDATE_CURRENT_DOCUMENT = 'mb/journal-document/UPDATE'
// trade
exports.CREATE_TRADE = 'mb/trade/CREATE'
exports.UPDATE_TRADE = 'mb/trade/UPDATE'
exports.DELETE_TRADE = 'mb/trade/DELETE'
// language
exports.SWITCH_LANGUAGE = 'mb/language/SWITCH'
exports.INIT_LANGUAGE = 'mb/language/INIT'
exports.SCAN_LANGUAGE = 'mb/language/SCAN'
exports.UI_LANGUAGE_READY = 'mb/language/READY'
// chart
exports.INIT_CHART = 'mb/chart/INIT'
exports.LOAD_CHART = 'mb/chart/LOAD'
exports.CHART_READY = 'mb/chart/READY'
// models
exports.MODEL_SAVE = 'mb/model/SAVE'
exports.MODEL_SAVE_AND_RELOAD = 'mb/model/SAVE_AND_RELOAD'
exports.MODEL_UPDATE = 'mb/model/UPDATE'

// ui
exports.UI_SHOW = 'mb/ui/SHOW'
exports.UI_HIDE = 'mb/ui/HIDE'

},{}],7:[function(require,module,exports){
(function (process){
const basepath = process.env.BASEPATH || ''

console.log(`basepath=${basepath}`)

module.exports = {
  BS: `${basepath}/pages/bs/index.html`,
  JOURNAL: `${basepath}/pages/journal/index.html`,
  SETTINGS: `${basepath}/pages/settings/index.html`,
  APP_SETTINGS: `${basepath}/pages/app-settings/index.html`,
  NEW: `${basepath}/pages/new/index.html`,
  EDIT_CHART_OF_ACCOUNTS: `${basepath}/pages/edit-chart-of-accounts/index.html`
}

}).call(this,require('_process'))
},{"_process":3}],8:[function(require,module,exports){
(function (global){
exports.actions = require('./const/action-types')
exports.Action = require('./const/action-types')
exports.Page = require('./const/page')
exports.capsid = global.capsid
exports.domain = global.domain

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./const/action-types":6,"./const/page":7}],9:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _class, _desc, _value, _class2;

var _templateObject = _taggedTemplateLiteral(['<td><a href="#">', '</a></td>'], ['<td><a href="#">', '</a></td>']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

var _require = require('~'),
    MODEL_UPDATE = _require.actions.MODEL_UPDATE;

var _capsid = capsid,
    component = _capsid.component,
    wire = _capsid.wire,
    on = _capsid.on;

var genel = require('genel');

var ChartCard = (_dec = wire.el('tbody'), _dec2 = on(MODEL_UPDATE), component(_class = (_class2 = function () {
  function ChartCard() {
    _classCallCheck(this, ChartCard);
  }

  _createClass(ChartCard, [{
    key: 'onModelUpdate',
    value: function onModelUpdate(_ref) {
      var _this = this;

      var _ref$detail = _ref.detail,
          currentChart = _ref$detail.currentChart,
          MajorAccountType = _ref$detail.domain.MajorAccountType;

      var majorType = MajorAccountType[this.el.getAttribute('type')];

      if (!majorType) {
        throw new Error('no such type: "' + this.el.getAttribute('type') + '"');
      }

      this.tbody.innerHTML = '';

      currentChart.getAccountTypesByMajorType(majorType).forEach(function (type) {
        _this.tbody.appendChild(genel.tr(_templateObject, type.name));
      });
    }
  }, {
    key: 'tbody',
    get: function get() {}
  }]);

  return ChartCard;
}(), (_applyDecoratedDescriptor(_class2.prototype, 'tbody', [_dec], Object.getOwnPropertyDescriptor(_class2.prototype, 'tbody'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'onModelUpdate', [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, 'onModelUpdate'), _class2.prototype)), _class2)) || _class);


module.exports = ChartCard;

},{"genel":2,"~":1}],10:[function(require,module,exports){
'use strict';

require('./title-area');
require('./misc-settings');
require('./chart-card');

},{"./chart-card":9,"./misc-settings":11,"./title-area":12}],11:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _class, _desc, _value, _class2;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

var _capsid = capsid,
    wire = _capsid.wire,
    on = _capsid.on,
    emits = _capsid.emits,
    component = _capsid.component;

var _require = require('~'),
    _require$actions = _require.actions,
    MODEL_UPDATE = _require$actions.MODEL_UPDATE,
    UPDATE_CURRENT_DOCUMENT = _require$actions.UPDATE_CURRENT_DOCUMENT;

var MiscSettings = (_dec = wire.el('.misc-settings__currency'), _dec2 = wire.el('.misc-settings__comma-style select'), _dec3 = wire.el('.misc-settings__start-date input'), _dec4 = wire.el('.misc-settings__end-date input'), _dec5 = on(MODEL_UPDATE), _dec6 = on('change', { at: '.misc-settings__comma-style' }), _dec7 = emits(UPDATE_CURRENT_DOCUMENT), _dec8 = on('input', { at: '.misc-settings__start-date' }), _dec9 = emits(UPDATE_CURRENT_DOCUMENT), _dec10 = on('input', { at: '.misc-settings__end-date' }), _dec11 = emits(UPDATE_CURRENT_DOCUMENT), component(_class = (_class2 = function () {
  function MiscSettings() {
    _classCallCheck(this, MiscSettings);
  }

  _createClass(MiscSettings, [{
    key: 'onModelUpdate',
    value: function onModelUpdate(_ref) {
      var currentDocument = _ref.detail.user.currentDocument;
      var currency = currentDocument.currency,
          commaPeriodSetting = currentDocument.commaPeriodSetting,
          start = currentDocument.start,
          end = currentDocument.end;


      this.currencyLabel.textContent = currency.symbol + ' - ' + currency.code;
      this.commaStyleSelectBox.value = commaPeriodSetting.name;
      this.startDateInput.value = start.format(t10.t('locale.date_format'));
      this.endDateInput.value = end.format(t10.t('locale.date_format'));
    }
  }, {
    key: 'onCommaStyleChange',
    value: function onCommaStyleChange(e) {
      return {
        commaPeriodSetting: e.target.value
      };
    }
  }, {
    key: 'onStartDateChange',
    value: function onStartDateChange(e) {
      return {
        start: e.target.dataset.date
      };
    }
  }, {
    key: 'onEndDateChange',
    value: function onEndDateChange(e) {
      return {
        end: e.target.dataset.date
      };
    }
  }, {
    key: 'currencyLabel',
    get: function get() {}
  }, {
    key: 'commaStyleSelectBox',
    get: function get() {}
  }, {
    key: 'startDateInput',
    get: function get() {}
  }, {
    key: 'endDateInput',
    get: function get() {}
  }]);

  return MiscSettings;
}(), (_applyDecoratedDescriptor(_class2.prototype, 'currencyLabel', [_dec], Object.getOwnPropertyDescriptor(_class2.prototype, 'currencyLabel'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'commaStyleSelectBox', [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, 'commaStyleSelectBox'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'startDateInput', [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, 'startDateInput'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'endDateInput', [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, 'endDateInput'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'onModelUpdate', [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, 'onModelUpdate'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'onCommaStyleChange', [_dec6, _dec7], Object.getOwnPropertyDescriptor(_class2.prototype, 'onCommaStyleChange'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'onStartDateChange', [_dec8, _dec9], Object.getOwnPropertyDescriptor(_class2.prototype, 'onStartDateChange'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'onEndDateChange', [_dec10, _dec11], Object.getOwnPropertyDescriptor(_class2.prototype, 'onEndDateChange'), _class2.prototype)), _class2)) || _class);


module.exports = MiscSettings;

},{"~":1}],12:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _class, _desc, _value, _class2;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

var _capsid = capsid,
    emits = _capsid.emits,
    on = _capsid.on,
    notifies = _capsid.notifies,
    wire = _capsid.wire,
    component = _capsid.component;

var _require = require('~'),
    _require$actions = _require.actions,
    MODEL_UPDATE = _require$actions.MODEL_UPDATE,
    UPDATE_CURRENT_DOCUMENT = _require$actions.UPDATE_CURRENT_DOCUMENT;

var _require2 = require('../../common/molecules/input-modal'),
    OPEN = _require2.OPEN,
    CLOSE = _require2.CLOSE,
    INPUT = _require2.INPUT;

var TitleArea = (_dec = component('settings-title-area'), _dec2 = wire.el('.journal-title'), _dec3 = wire.el('.input-modal'), _dec4 = on(MODEL_UPDATE), _dec5 = notifies(CLOSE, '.input-modal'), _dec6 = notifies(OPEN, '.input-modal'), _dec7 = on('click', { at: 'button.opens-input-modal' }), _dec8 = on(INPUT), _dec9 = emits(UPDATE_CURRENT_DOCUMENT), _dec(_class = (_class2 = function () {
  function TitleArea() {
    _classCallCheck(this, TitleArea);
  }

  _createClass(TitleArea, [{
    key: 'onModelUpdate',
    value: function onModelUpdate(_ref) {
      var user = _ref.detail.user;

      this.title.textContent = user.currentDocument.title;
    }
  }, {
    key: 'onClickButton',
    value: function onClickButton() {
      return this.title.textContent;
    }
  }, {
    key: 'onInput',
    value: function onInput(_ref2) {
      var title = _ref2.detail;

      return { title: title };
    }
  }, {
    key: 'title',
    get: function get() {}
  }, {
    key: 'inputModal',
    get: function get() {}
  }]);

  return TitleArea;
}(), (_applyDecoratedDescriptor(_class2.prototype, 'title', [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, 'title'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'inputModal', [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, 'inputModal'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'onModelUpdate', [_dec4, _dec5], Object.getOwnPropertyDescriptor(_class2.prototype, 'onModelUpdate'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'onClickButton', [_dec6, _dec7], Object.getOwnPropertyDescriptor(_class2.prototype, 'onClickButton'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'onInput', [_dec8, _dec9], Object.getOwnPropertyDescriptor(_class2.prototype, 'onInput'), _class2.prototype)), _class2)) || _class);


module.exports = TitleArea;

},{"../../common/molecules/input-modal":4,"~":1}]},{},[10]);
