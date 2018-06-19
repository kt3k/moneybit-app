(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports = require('./src')

},{"./src":5}],2:[function(require,module,exports){
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):e.genel=t()}(this,function(){var e=function(t){return Array.isArray(t)?e.div.apply(null,arguments).firstChild:function(e){var r=arguments,o=document.createElement(t);return o.innerHTML=e.map(function(e,t){return e+(r[t+1]||"")}).join("").trim(),o}};return"a,abbr,address,area,article,aside,audio,b,base,bdi,bdo,blockquote,body,br,button,canvas,caption,cite,code,col,colgroup,data,datalist,dd,del,details,dfn,dialog,div,dl,dt,em,embed,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,i,iframe,img,input,ins,kbd,keygen,label,legend,li,link,main,map,mark,math,menu,menuitem,meta,meter,nav,noscript,object,ol,optgroup,option,output,p,param,picture,pre,progress,q,rb,rp,rt,rtc,ruby,s,samp,script,section,select,slot,small,source,span,strong,style,sub,summary,sup,svg,table,tbody,td,template,textarea,tfoot,th,thead,time,title,tr,track,u,ul,var,video,wbr".split(",").forEach(function(t){e[t]=e(t)}),e});

},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
module.exports = {
  BS: '/pages/bs/index.html',
  JOURNAL: '/pages/journal/index.html',
  SETTINGS: '/pages/settings/index.html',
  APP_SETTINGS: '/pages/app-settings/index.html',
  NEW: '/pages/new/index.html',
  EDIT_CHART_OF_ACCOUNTS: '/pages/edit-chart-of-accounts/index.html'
}

},{}],5:[function(require,module,exports){
(function (global){
exports.actions = require('./const/action-types')
exports.Action = require('./const/action-types')
exports.Page = require('./const/page')
exports.capsid = global.capsid
exports.domain = global.domain

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./const/action-types":3,"./const/page":4}],6:[function(require,module,exports){
'use strict';

require('./new-item-card');
require('./journal-page');
require('./trade-list');
require('./trade-card');

},{"./journal-page":7,"./new-item-card":8,"./trade-card":9,"./trade-list":10}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _capsid = capsid,
    component = _capsid.component,
    on = _capsid.on,
    wired = _capsid.wired,
    notifies = _capsid.notifies;

var _require = require('./new-item-card'),
    SHOW = _require.SHOW,
    HIDE = _require.HIDE;

var JournalPage = exports.JournalPage = (_dec = component('journal-page'), _dec2 = wired('.new-item-card-wrapper'), _dec3 = wired('.add-entry-button'), _dec4 = on('click', { at: '.add-entry-button' }), _dec5 = notifies(Action.UI_SHOW, '.modal-overlay-shadow'), _dec6 = on(HIDE), _dec7 = notifies(Action.UI_HIDE, '.modal-overlay-shadow'), _dec(_class = (_class2 = function () {
  function JournalPage() {
    _classCallCheck(this, JournalPage);
  }

  _createClass(JournalPage, [{
    key: 'onClick',
    value: function onClick() {
      this.newItemWrapper.dispatchEvent(new CustomEvent(SHOW));
      this.addEntryButton.setAttribute('disabled', 'disabled');
    }
  }, {
    key: 'onHideNewItemCard',
    value: function onHideNewItemCard() {
      this.addEntryButton.removeAttribute('disabled');
    }
  }, {
    key: 'newItemWrapper',
    get: function get() {}
  }, {
    key: 'addEntryButton',
    get: function get() {}
  }]);

  return JournalPage;
}(), (_applyDecoratedDescriptor(_class2.prototype, 'newItemWrapper', [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, 'newItemWrapper'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'addEntryButton', [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, 'addEntryButton'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'onClick', [_dec4, _dec5], Object.getOwnPropertyDescriptor(_class2.prototype, 'onClick'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'onHideNewItemCard', [_dec6, _dec7], Object.getOwnPropertyDescriptor(_class2.prototype, 'onHideNewItemCard'), _class2.prototype)), _class2)) || _class);

},{"./new-item-card":8}],8:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _desc, _value, _class2, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _dec32, _dec33, _dec34, _class3, _desc2, _value2, _class4;

var _templateObject = _taggedTemplateLiteral(['\n      <div class="field js-field-wrapper new-item-card__account-type-wrapper">\n        <div class="control is-expanded">\n          <div class="select is-fullwidth">\n            <select class="input new-item-card__account-type">\n              <option value="" class="t-text">ui.form.select_account_title</option>\n              ', '\n            </select>\n          </div>\n        </div>\n        <div\n          class="popper error-tooltip"\n          data-popper-ref=".control"\n          data-popper-placement="top-end"\n        ><t>error.form.account_type_not_selected</t></div>\n      </div>\n      <div class="field js-field-wrapper">\n        <p class="control">\n          <input\n            class="input js-field js-number-input t-attr new-item-card__account-amount"\n            data-validate="number"\n            placeholder="t:domain.amount"\n          />\n        </p>\n        <div\n          class="popper error-tooltip"\n          data-popper-ref=".input"\n          data-popper-placement="top-end"\n        ></div>\n      </div>\n      <hr />\n    '], ['\n      <div class="field js-field-wrapper new-item-card__account-type-wrapper">\n        <div class="control is-expanded">\n          <div class="select is-fullwidth">\n            <select class="input new-item-card__account-type">\n              <option value="" class="t-text">ui.form.select_account_title</option>\n              ', '\n            </select>\n          </div>\n        </div>\n        <div\n          class="popper error-tooltip"\n          data-popper-ref=".control"\n          data-popper-placement="top-end"\n        ><t>error.form.account_type_not_selected</t></div>\n      </div>\n      <div class="field js-field-wrapper">\n        <p class="control">\n          <input\n            class="input js-field js-number-input t-attr new-item-card__account-amount"\n            data-validate="number"\n            placeholder="t:domain.amount"\n          />\n        </p>\n        <div\n          class="popper error-tooltip"\n          data-popper-ref=".input"\n          data-popper-placement="top-end"\n        ></div>\n      </div>\n      <hr />\n    ']);

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

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

var _capsid = capsid,
    _prep = _capsid.prep,
    component = _capsid.component,
    on = _capsid.on,
    emits = _capsid.emits,
    wired = _capsid.wired,
    notifies = _capsid.notifies;

var genel = require('genel');

var SHOW = exports.SHOW = 'js-new-item-card/SHOW';
var HIDE = exports.HIDE = 'js-new-item-card/HIDE';

var _global$capsidScrollL = global.capsidScrollLock,
    LOCK = _global$capsidScrollL.LOCK,
    UNLOCK = _global$capsidScrollL.UNLOCK;


var CLASS_VISIBLE = 'is-visible';
var CLASS_ERROR = 'has-error';
var RESET_SCROLL = 'mb/new-item-card-wrapper/RESET_SCROLL';

var NewItemCardWrapper = exports.NewItemCardWrapper = (_dec = component('new-item-card-wrapper'), _dec2 = wired.component('new-item-card'), _dec3 = on(RESET_SCROLL), _dec4 = on(SHOW), _dec5 = emits(LOCK), _dec6 = on(HIDE), _dec7 = emits(UNLOCK), _dec(_class = (_class2 = function () {
  function NewItemCardWrapper() {
    _classCallCheck(this, NewItemCardWrapper);
  }

  _createClass(NewItemCardWrapper, [{
    key: 'resetScroll',
    value: function resetScroll() {
      this.el.scrollTop = 0;
    }
  }, {
    key: 'show',
    value: function show() {
      this.el.classList.add(CLASS_VISIBLE);
      this.card.resetHtml();
    }
  }, {
    key: 'hide',
    value: function hide() {
      this.el.classList.remove(CLASS_VISIBLE);
    }
  }, {
    key: 'card',
    get: function get() {}
  }]);

  return NewItemCardWrapper;
}(), (_applyDecoratedDescriptor(_class2.prototype, 'card', [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, 'card'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'resetScroll', [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, 'resetScroll'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'show', [_dec4, _dec5], Object.getOwnPropertyDescriptor(_class2.prototype, 'show'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'hide', [_dec6, _dec7], Object.getOwnPropertyDescriptor(_class2.prototype, 'hide'), _class2.prototype)), _class2)) || _class);
var NewItemCard = (_dec8 = component('new-item-card'), _dec9 = wired('.new-item-card__date'), _dec10 = wired('.new-item-card__desc'), _dec11 = wired.all('.new-item-card__debit'), _dec12 = wired.all('.new-item-card__credit'), _dec13 = wired('.new-item-card__debit-total'), _dec14 = wired('.new-item-card__credit-total'), _dec15 = wired('.new-item-card__debit-total-diff'), _dec16 = wired('.new-item-card__credit-total-diff'), _dec17 = wired('.add-debit-button'), _dec18 = wired('.add-credit-button'), _dec19 = wired('.account-error-holder'), _dec20 = wired.all('.new-item-card__account-input'), _dec21 = on(Action.MODEL_UPDATE), _dec22 = emits(RESET_SCROLL), _dec23 = on('click', { at: '.add-debit-button' }), _dec24 = on('click', { at: '.add-credit-button' }), _dec25 = emits(Action.SCAN_LANGUAGE), _dec26 = on('click', { at: '.new-item-save-button' }), _dec27 = emits(Action.CREATE_TRADE), _dec28 = on('click', { at: '.new-item-cancel-button' }), _dec29 = emits(HIDE), _dec30 = on('input'), _dec31 = on('change', { at: '.new-item-card__account-type' }), _dec32 = on('input', { at: '.new-item-card__account-amount' }), _dec33 = notifies('field-error', '.js-form'), _dec34 = emits(Action.REQUEST_MONEY_FORMAT), _dec8(_class3 = (_class4 = function () {
  function NewItemCard() {
    _classCallCheck(this, NewItemCard);
  }

  _createClass(NewItemCard, [{
    key: 'update',
    value: function update(_ref) {
      var _ref$detail = _ref.detail,
          user = _ref$detail.user,
          currentChart = _ref$detail.currentChart;

      this.currentChart = currentChart;
      this.debitTypes = user.currentDocument.recentDebitTypes(this.currentChart);
      this.creditTypes = user.currentDocument.recentCreditTypes(this.currentChart);
    }
  }, {
    key: 'resetHtml',
    value: function resetHtml() {
      this.el.innerHTML = '\n      <form class="js-form">\n        <div class="card-header">\n          <p class="card-header-title">\n            Date\n          </p>\n          <div class="card-header-icon js-field-wrapper pure">\n            <p class="control">\n              <input\n                class="input js-field js-pickadate new-item-card__date"\n                data-validate="required"\n              />\n            </p>\n            <div\n              class="popper error-tooltip"\n              data-popper-ref=".new-item-card__date"\n              data-popper-placement="top-end"\n            ></div>\n          </div>\n        </div>\n        <div class="card-content">\n          <div class="content">\n            <p class="t-text">app.description</p>\n            <div class="js-field-wrapper pure">\n              <p class="control">\n                <input\n                  class="js-field input new-item-card__desc"\n                  data-validate="required"\n                />\n              </p>\n              <div\n                class="popper error-tooltip"\n                data-popper-ref=".input"\n                data-popper-placement="top-end"\n              ></div>\n            </div>\n            <h2>\n              <t>domain.debits</t>\n              <span class="new-item-card__debit-total"></span>\n              <span class="new-item-card__debit-total-diff"></span>\n            </h2>\n            <button class="button is-primary is-outlined add-debit-button">\n              <span class="icon">\n                <i class="fa fa-plus"></i>\n              </span>\n            </button>\n            <h2>\n              <t>domain.credits</t>\n              <span class="new-item-card__credit-total"></span>\n              <span class="new-item-card__credit-total-diff"></span>\n            </h2>\n            <button class="button is-primary is-outlined add-credit-button">\n              <span class="icon">\n                <i class="fa fa-plus"></i>\n              </span>\n            </button>\n          </div>\n        </div>\n        <div class="card-footer">\n          <p class="card-footer-item">\n            <a class="button is-danger t-text new-item-cancel-button" href="#">ui.form.cancel</a>\n          </p>\n          <p class="card-footer-item">\n            <button class="button is-primary t-text new-item-save-button disable-on-error">ui.form.save</button>\n          </p>\n        </div>\n        <div class="account-error-holder"></div>\n      </form>\n    ';

      this.addDebitRow();
      this.addCreditRow();

      this.prep();
    }
  }, {
    key: 'onClickAddDebitButton',
    value: function onClickAddDebitButton(e) {
      e.preventDefault();

      this.addDebitRow();

      this.prep();
    }
  }, {
    key: 'onClickCreditButton',
    value: function onClickCreditButton(e) {
      e.preventDefault();

      this.addCreditRow();

      this.prep();
    }

    /**
     * @param {string} side debit or credit
     * @param {AccountType[]} accountTypes
     * @param {HTMLElement} insertBefore
     */

  }, {
    key: 'addAccountInput',
    value: function addAccountInput(side, accountTypes, insertBefore) {
      var div = genel.div(_templateObject, this.options(accountTypes));

      div.classList.add('new-item-card__' + side, 'new-item-card__account-input');

      insertBefore.parentElement.insertBefore(div, insertBefore);
    }
  }, {
    key: 'addDebitRow',
    value: function addDebitRow() {
      this.addAccountInput('debit', this.debitTypes, this.addDebitButton);
    }
  }, {
    key: 'addCreditRow',
    value: function addCreditRow() {
      this.addAccountInput('credit', this.creditTypes, this.addCreditButton);
    }
  }, {
    key: 'options',
    value: function options(accountTypes) {
      var _this = this;

      return accountTypes.map(function (type) {
        return '<option value="' + type.name + '">' + type.name + ' (' + t10.t('domain.' + _this.currentChart.getMajorTypeByAccountType(type).name) + ')</option>';
      }).join('');
    }
  }, {
    key: 'prep',
    value: function prep() {
      _prep(null, this.el);
    }
  }, {
    key: 'onCreate',
    value: function onCreate(e) {
      e.preventDefault();

      var date = this.date.dataset.date;
      var desc = this.desc.value;
      var dr = this.createDebitObject();
      var cr = this.createCreditObject();

      this.hide();

      return { date: date, desc: desc, dr: dr, cr: cr };
    }
  }, {
    key: 'onCancel',
    value: function onCancel(e) {
      e.preventDefault();
      this.hide();
    }

    /**
     * Removes the component at the next tick.
     */

  }, {
    key: 'hide',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return Promise.resolve();

              case 2:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function hide() {
        return _ref2.apply(this, arguments);
      }

      return hide;
    }()
  }, {
    key: 'adjustPopper',
    value: function adjustPopper() {
      capsidPopper.updateAll();
    }
  }, {
    key: 'onAccountChange',
    value: function onAccountChange(e) {
      var _this2 = this;

      var dt = this.debitTotal();
      var ct = this.creditTotal();

      this.fillAccountTotalLabels(dt, ct);[].forEach.call(this.accountInputs, function (el) {
        _this2.validateAccountInput(el);
      });

      this.validateTotal(dt, ct);
    }

    /**
     * @param {HTMLElement} el
     */

  }, {
    key: 'validateAccountInput',
    value: function validateAccountInput(el) {
      var _getAccountObject = this.getAccountObject(el),
          type = _getAccountObject.type,
          amount = _getAccountObject.amount;

      el.querySelector('.new-item-card__account-type-wrapper').classList.toggle(CLASS_ERROR, this.isValidAmount(amount) && type === '');
    }

    /**
     * @param {number} dt The debit total
     * @param {number} ct The credit total
     */

  }, {
    key: 'validateTotal',
    value: function validateTotal(dt, ct) {
      this.accountErrorHolder.classList.toggle(CLASS_ERROR, !(dt > 0 && ct > 0 && dt === ct));
    }

    /**
     * @param {number} dt The debit total
     * @param {number} ct The credit total
     */

  }, {
    key: 'fillAccountTotalLabels',
    value: function fillAccountTotalLabels(dt, ct) {
      this.setAccountLabel(this.debitTotalLabel, dt);
      this.setAccountLabel(this.creditTotalLabel, ct);

      var diff = Math.abs(dt - ct);

      if (diff === 0) {
        this.debitTotalDiffLabel.textContent = '';
        this.creditTotalDiffLabel.textContent = '';
      } else if (dt > ct) {
        this.debitTotalDiffLabel.textContent = '';
        this.setAccountLabel(this.creditTotalDiffLabel, diff, function (label) {
          return '(-' + label + ')';
        });
      } else {
        this.setAccountLabel(this.debitTotalDiffLabel, diff, function (label) {
          return '(-' + label + ')';
        });
        this.creditTotalDiffLabel.textContent = '';
      }
    }
  }, {
    key: 'setAccountLabel',
    value: function setAccountLabel(el, amount) {
      var format = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function (x) {
        return x;
      };

      return {
        amount: amount,
        send: function send(label) {
          el.textContent = format(label);
        }
      };
    }

    /**
     * @return {number}
     */

  }, {
    key: 'debitTotal',
    value: function debitTotal() {
      return this.accountTotal(this.createDebitArray());
    }

    /**
     * @return {number}
     */

  }, {
    key: 'creditTotal',
    value: function creditTotal() {
      return this.accountTotal(this.createCreditArray());
    }

    /**
     * @param {Object[]}
     * @return {number}
     */

  }, {
    key: 'accountTotal',
    value: function accountTotal(accountArray) {
      return accountArray.reduce(function (sum, account) {
        return sum + account.amount;
      }, 0);
    }

    /**
     * @param {Object[]} accountArray
     */

  }, {
    key: 'createAccountMap',
    value: function createAccountMap(accountArray) {
      var accountMap = {};

      accountArray.map(function (item) {
        accountMap[item.type] = item.amount;
      });

      return accountMap;
    }

    /**
     * @param {NodeList} accountRows
     * @param {string} side debit or credit
     * @return {Object[]}
     */

  }, {
    key: 'createAccountArray',
    value: function createAccountArray(accountRows) {
      var _this3 = this;

      return [].map.call(accountRows, function (row) {
        return _this3.getAccountObject(row);
      }).filter(function (account) {
        return !!account.type && _this3.isValidAmount(account.amount);
      });
    }

    /**
     * @param {number} amount
     * @returns {boolean}
     */

  }, {
    key: 'isValidAmount',
    value: function isValidAmount(amount) {
      return amount > 0 && amount < Infinity;
    }

    /**
     * @param {HTMLElement} el
     * @returns {{type: string, amount: number}}
     */

  }, {
    key: 'getAccountObject',
    value: function getAccountObject(el) {
      return {
        type: el.querySelector('.new-item-card__account-type').value,
        amount: +el.querySelector('.new-item-card__account-amount').dataset.amount
      };
    }
  }, {
    key: 'createDebitArray',
    value: function createDebitArray() {
      return this.createAccountArray(this.debits);
    }
  }, {
    key: 'createCreditArray',
    value: function createCreditArray() {
      return this.createAccountArray(this.credits);
    }
  }, {
    key: 'createDebitObject',
    value: function createDebitObject() {
      return this.createAccountMap(this.createDebitArray());
    }
  }, {
    key: 'createCreditObject',
    value: function createCreditObject() {
      return this.createAccountMap(this.createCreditArray());
    }
  }, {
    key: 'date',
    get: function get() {}
  }, {
    key: 'desc',
    get: function get() {}
  }, {
    key: 'debits',
    get: function get() {}
  }, {
    key: 'credits',
    get: function get() {}
  }, {
    key: 'debitTotalLabel',
    get: function get() {}
  }, {
    key: 'creditTotalLabel',
    get: function get() {}
  }, {
    key: 'debitTotalDiffLabel',
    get: function get() {}
  }, {
    key: 'creditTotalDiffLabel',
    get: function get() {}
  }, {
    key: 'addDebitButton',
    get: function get() {}
  }, {
    key: 'addCreditButton',
    get: function get() {}
  }, {
    key: 'accountErrorHolder',
    get: function get() {}
  }, {
    key: 'accountInputs',
    get: function get() {}
  }]);

  return NewItemCard;
}(), (_applyDecoratedDescriptor(_class4.prototype, 'date', [_dec9], Object.getOwnPropertyDescriptor(_class4.prototype, 'date'), _class4.prototype), _applyDecoratedDescriptor(_class4.prototype, 'desc', [_dec10], Object.getOwnPropertyDescriptor(_class4.prototype, 'desc'), _class4.prototype), _applyDecoratedDescriptor(_class4.prototype, 'debits', [_dec11], Object.getOwnPropertyDescriptor(_class4.prototype, 'debits'), _class4.prototype), _applyDecoratedDescriptor(_class4.prototype, 'credits', [_dec12], Object.getOwnPropertyDescriptor(_class4.prototype, 'credits'), _class4.prototype), _applyDecoratedDescriptor(_class4.prototype, 'debitTotalLabel', [_dec13], Object.getOwnPropertyDescriptor(_class4.prototype, 'debitTotalLabel'), _class4.prototype), _applyDecoratedDescriptor(_class4.prototype, 'creditTotalLabel', [_dec14], Object.getOwnPropertyDescriptor(_class4.prototype, 'creditTotalLabel'), _class4.prototype), _applyDecoratedDescriptor(_class4.prototype, 'debitTotalDiffLabel', [_dec15], Object.getOwnPropertyDescriptor(_class4.prototype, 'debitTotalDiffLabel'), _class4.prototype), _applyDecoratedDescriptor(_class4.prototype, 'creditTotalDiffLabel', [_dec16], Object.getOwnPropertyDescriptor(_class4.prototype, 'creditTotalDiffLabel'), _class4.prototype), _applyDecoratedDescriptor(_class4.prototype, 'addDebitButton', [_dec17], Object.getOwnPropertyDescriptor(_class4.prototype, 'addDebitButton'), _class4.prototype), _applyDecoratedDescriptor(_class4.prototype, 'addCreditButton', [_dec18], Object.getOwnPropertyDescriptor(_class4.prototype, 'addCreditButton'), _class4.prototype), _applyDecoratedDescriptor(_class4.prototype, 'accountErrorHolder', [_dec19], Object.getOwnPropertyDescriptor(_class4.prototype, 'accountErrorHolder'), _class4.prototype), _applyDecoratedDescriptor(_class4.prototype, 'accountInputs', [_dec20], Object.getOwnPropertyDescriptor(_class4.prototype, 'accountInputs'), _class4.prototype), _applyDecoratedDescriptor(_class4.prototype, 'update', [_dec21], Object.getOwnPropertyDescriptor(_class4.prototype, 'update'), _class4.prototype), _applyDecoratedDescriptor(_class4.prototype, 'resetHtml', [_dec22], Object.getOwnPropertyDescriptor(_class4.prototype, 'resetHtml'), _class4.prototype), _applyDecoratedDescriptor(_class4.prototype, 'onClickAddDebitButton', [_dec23], Object.getOwnPropertyDescriptor(_class4.prototype, 'onClickAddDebitButton'), _class4.prototype), _applyDecoratedDescriptor(_class4.prototype, 'onClickCreditButton', [_dec24], Object.getOwnPropertyDescriptor(_class4.prototype, 'onClickCreditButton'), _class4.prototype), _applyDecoratedDescriptor(_class4.prototype, 'prep', [_dec25], Object.getOwnPropertyDescriptor(_class4.prototype, 'prep'), _class4.prototype), _applyDecoratedDescriptor(_class4.prototype, 'onCreate', [_dec26, _dec27], Object.getOwnPropertyDescriptor(_class4.prototype, 'onCreate'), _class4.prototype), _applyDecoratedDescriptor(_class4.prototype, 'onCancel', [_dec28], Object.getOwnPropertyDescriptor(_class4.prototype, 'onCancel'), _class4.prototype), _applyDecoratedDescriptor(_class4.prototype, 'hide', [_dec29], Object.getOwnPropertyDescriptor(_class4.prototype, 'hide'), _class4.prototype), _applyDecoratedDescriptor(_class4.prototype, 'adjustPopper', [_dec30], Object.getOwnPropertyDescriptor(_class4.prototype, 'adjustPopper'), _class4.prototype), _applyDecoratedDescriptor(_class4.prototype, 'onAccountChange', [_dec31, _dec32, _dec33], Object.getOwnPropertyDescriptor(_class4.prototype, 'onAccountChange'), _class4.prototype), _applyDecoratedDescriptor(_class4.prototype, 'setAccountLabel', [_dec34], Object.getOwnPropertyDescriptor(_class4.prototype, 'setAccountLabel'), _class4.prototype)), _class4)) || _class3);
exports.default = NewItemCard;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"genel":2}],9:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _desc, _value, _class2;

var _templateObject = _taggedTemplateLiteral(['\n      <div class="card">\n        <div class="card-header">\n          <p class="card-header-title">\n            No.16\n          </p>\n          <div class="card-header-icon">\n            <span class=""><strong class="trade-card__date-label"></strong></span>\n          </div>\n          <div class="card-header-icon">\n            <a class="button is-primary is-outlined t-text" href="">ui.form.edit</a>\n          </div>\n        </div>\n        <div class="card-content">\n          <div class="content">\n            <p class="trade-card__desc-label"></p>\n            <table>\n              <tr class="trade-card__debit-title-row u-text-uc">\n                <th><t>domain.debit</t></th>\n                <th></th>\n              </tr>\n              <tr class="trade-card__credit-title-row u-text-uc">\n                <th>\n                  <t>domain.credit</t>\n                <th>\n              </tr>\n            </table>\n            </div>\n        </div>\n      </div>\n    '], ['\n      <div class="card">\n        <div class="card-header">\n          <p class="card-header-title">\n            No.16\n          </p>\n          <div class="card-header-icon">\n            <span class=""><strong class="trade-card__date-label"></strong></span>\n          </div>\n          <div class="card-header-icon">\n            <a class="button is-primary is-outlined t-text" href="">ui.form.edit</a>\n          </div>\n        </div>\n        <div class="card-content">\n          <div class="content">\n            <p class="trade-card__desc-label"></p>\n            <table>\n              <tr class="trade-card__debit-title-row u-text-uc">\n                <th><t>domain.debit</t></th>\n                <th></th>\n              </tr>\n              <tr class="trade-card__credit-title-row u-text-uc">\n                <th>\n                  <t>domain.credit</t>\n                <th>\n              </tr>\n            </table>\n            </div>\n        </div>\n      </div>\n    ']),
    _templateObject2 = _taggedTemplateLiteral(['\n        <td>', '</td>\n        <td>', '</td>\n      '], ['\n        <td>', '</td>\n        <td>', '</td>\n      ']);

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

var _capsid = capsid,
    component = _capsid.component,
    on = _capsid.on,
    wire = _capsid.wire;

var _require = require('~'),
    Action = _require.Action;

var genel = require('genel');

var TradeCard = (_dec = component('js-trade-card'), _dec2 = wire.el('.trade-card__date-label'), _dec3 = wire.el('.trade-card__desc-label'), _dec4 = wire.el('.trade-card__debit-title-row'), _dec5 = wire.el('.trade-card__credit-title-row'), _dec6 = on(Action.UPDATE_TRADE), _dec(_class = (_class2 = function () {
  function TradeCard() {
    _classCallCheck(this, TradeCard);
  }

  _createClass(TradeCard, [{
    key: '__mount__',
    value: function __mount__() {
      this.el.classList.add('column');
      this.el.appendChild(genel(_templateObject));
    }
  }, {
    key: 'serializeAccounts',
    value: function serializeAccounts(accounts) {
      return accounts.map(function (account) {
        return account.type.name + account.amount.amount;
      }).join('|');
    }
  }, {
    key: 'serializeTrade',
    value: function serializeTrade(trade) {
      return trade.date.format(t10.t('locale.date_format')) + '|' + trade.description + '|' + this.serializeAccounts(trade.debits) + '|' + this.serializeAccounts(trade.credits);
    }
  }, {
    key: 'update',
    value: function update(_ref) {
      var _this = this;

      var _ref$detail = _ref.detail,
          doc = _ref$detail.journalDocument,
          trade = _ref$detail.trade;

      var serialized = this.serializeTrade(trade);

      if (this.lastTradeSerialized === serialized) {
        // not updated
        return;
      }

      this.el.dataset.tradeId = trade.id;
      this.dateLabel.textContent = trade.date.format(t10.t('locale.date_format'));
      this.descLabel.textContent = trade.description;

      var table = this.debitTitleRow.parentElement;

      table.querySelectorAll('.trade-card__account-row').forEach(function (el) {
        table.removeChild(el);
      });

      trade.debits.forEach(function (debit) {
        var tr = genel.tr(_templateObject2, debit.type.name, doc.format(debit.amount));
        tr.classList.add('trade-card__account-row');
        table.insertBefore(tr, _this.creditTitleRow);
      });
      trade.credits.forEach(function (credit) {
        var tr = genel.tr(_templateObject2, credit.type.name, doc.format(credit.amount));
        tr.classList.add('trade-card__account-row');
        table.insertBefore(tr, null);
      });

      this.lastTradeSerialized = serialized;
    }
  }, {
    key: 'dateLabel',
    get: function get() {}
  }, {
    key: 'descLabel',
    get: function get() {}
  }, {
    key: 'debitTitleRow',
    get: function get() {}
  }, {
    key: 'creditTitleRow',
    get: function get() {}
  }]);

  return TradeCard;
}(), (_applyDecoratedDescriptor(_class2.prototype, 'dateLabel', [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, 'dateLabel'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'descLabel', [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, 'descLabel'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'debitTitleRow', [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, 'debitTitleRow'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'creditTitleRow', [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, 'creditTitleRow'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'update', [_dec6], Object.getOwnPropertyDescriptor(_class2.prototype, 'update'), _class2.prototype)), _class2)) || _class);


module.exports = TradeCard;

},{"genel":2,"~":1}],10:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _class, _desc, _value, _class2;

var _templateObject = _taggedTemplateLiteral([''], ['']);

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

var _capsid = capsid,
    component = _capsid.component,
    on = _capsid.on,
    make = _capsid.make;

var _require = require('~'),
    Action = _require.Action;

var genel = require('genel');

var TradeList = (_dec = component('js-trade-list'), _dec2 = on(Action.MODEL_UPDATE), _dec(_class = (_class2 = function () {
  function TradeList() {
    _classCallCheck(this, TradeList);
  }

  _createClass(TradeList, [{
    key: 'onUpdate',
    value: function onUpdate(_ref) {
      var _this = this;

      var _ref$detail = _ref.detail,
          user = _ref$detail.user,
          currentJournal = _ref$detail.currentJournal;

      if (!currentJournal || !currentJournal.trades) {
        return;
      }

      currentJournal.trades.forEach(function (trade) {
        var el = _this.el.querySelector('[data-trade-id="' + trade.id + '"]') || make('js-trade-card', genel.div(_templateObject)).el;

        el.dispatchEvent(new CustomEvent(Action.UPDATE_TRADE, {
          detail: { journalDocument: user.currentDocument, trade: trade }
        }));

        _this.el.appendChild(el);
      });

      t10.scan();
    }
  }]);

  return TradeList;
}(), (_applyDecoratedDescriptor(_class2.prototype, 'onUpdate', [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, 'onUpdate'), _class2.prototype)), _class2)) || _class);


module.exports = TradeList;

},{"genel":2,"~":1}]},{},[6]);
