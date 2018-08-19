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
exports.REQUEST_MONEY_FORMAT = 'mb/journa-document/REQUEST_MOENY_FORMAT'
// trade
exports.SAVE_TRADE = 'mb/trade/SAVE'
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
const basepath = "/moneybit-app/app" || ''

module.exports = {
  BS: `${basepath}/pages/bs/index.html`,
  JOURNAL: `${basepath}/pages/journal/index.html`,
  SETTINGS: `${basepath}/pages/settings/index.html`,
  APP_SETTINGS: `${basepath}/pages/app-settings/index.html`,
  NEW: `${basepath}/pages/new/index.html`,
  EDIT_CHART_OF_ACCOUNTS: `${basepath}/pages/edit-chart-of-accounts/index.html`
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

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class, _desc, _value, _class2;

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
    emits = _capsid.emits,
    on = _capsid.on,
    wired = _capsid.wired;
var SHOW = exports.SHOW = 'mb/confirm-modal/SHOW';
var HIDE = exports.HIDE = 'mb/confirm-modal/HIDE';

var CLASS_VISIBLE = 'is-visible';

var ConfirmModal = (_dec = component('confirm-modal'), _dec2 = wired('.confirm-modal__message'), _dec3 = on(SHOW), _dec4 = on(HIDE), _dec5 = on.click.at('.confirm-modal__ok'), _dec6 = emits(HIDE), _dec7 = on.click.at('.confirm-modal__cancel'), _dec8 = emits(HIDE), _dec(_class = (_class2 = function () {
  function ConfirmModal() {
    _classCallCheck(this, ConfirmModal);
  }

  _createClass(ConfirmModal, [{
    key: 'show',
    value: function show(_ref) {
      var _ref$detail = _ref.detail,
          message = _ref$detail.message,
          onOk = _ref$detail.onOk;

      this.onOk = onOk;
      this.message.textContent = message;

      this.el.classList.add(CLASS_VISIBLE);
    }
  }, {
    key: 'hide',
    value: function hide() {
      this.el.classList.remove(CLASS_VISIBLE);
    }
  }, {
    key: 'onClickOk',
    value: function onClickOk() {
      if (typeof this.onOk === 'function') {
        this.onOk.call(null);
      }
    }
  }, {
    key: 'onClickCancel',
    value: function onClickCancel() {}
  }, {
    key: 'message',
    get: function get() {}
  }]);

  return ConfirmModal;
}(), (_applyDecoratedDescriptor(_class2.prototype, 'message', [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, 'message'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'show', [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, 'show'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'hide', [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, 'hide'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'onClickOk', [_dec5, _dec6], Object.getOwnPropertyDescriptor(_class2.prototype, 'onClickOk'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'onClickCancel', [_dec7, _dec8], Object.getOwnPropertyDescriptor(_class2.prototype, 'onClickCancel'), _class2.prototype)), _class2)) || _class);
exports.default = ConfirmModal;

},{}],7:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class, _desc, _value, _class2;

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
    emits = _capsid.emits,
    wired = _capsid.wired,
    notifies = _capsid.notifies;
var SHOW = exports.SHOW = 'mb/edit-item-card/SHOW';
var HIDE = exports.HIDE = 'mb/edit-item-card/HIDE';
var OPEN = exports.OPEN = 'mb/edit-item-card/OPEN';
var RESET_SCROLL = exports.RESET_SCROLL = 'mb/edit-item-card-wrapper/RESET_SCROLL';

var _global$capsidScrollL = global.capsidScrollLock,
    LOCK = _global$capsidScrollL.LOCK,
    UNLOCK = _global$capsidScrollL.UNLOCK;

var CLASS_VISIBLE = 'is-visible';

var EditItemCardWrapper = exports.EditItemCardWrapper = (_dec = component('edit-item-card-wrapper'), _dec2 = wired.component('edit-item-card'), _dec3 = on(RESET_SCROLL), _dec4 = on(SHOW), _dec5 = emits(LOCK), _dec6 = notifies(OPEN, '.edit-item-card'), _dec7 = on(HIDE), _dec8 = emits(UNLOCK), _dec(_class = (_class2 = function () {
  function EditItemCardWrapper() {
    _classCallCheck(this, EditItemCardWrapper);
  }

  _createClass(EditItemCardWrapper, [{
    key: 'resetScroll',
    value: function resetScroll() {
      this.el.scrollTop = 0;
    }
  }, {
    key: 'show',
    value: function show(_ref) {
      var trade = _ref.detail.trade;

      this.el.classList.add(CLASS_VISIBLE);
      this.openEditItemCard(trade);
    }
  }, {
    key: 'openEditItemCard',
    value: function openEditItemCard(trade) {
      return { trade: trade };
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

  return EditItemCardWrapper;
}(), (_applyDecoratedDescriptor(_class2.prototype, 'card', [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, 'card'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'resetScroll', [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, 'resetScroll'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'show', [_dec4, _dec5], Object.getOwnPropertyDescriptor(_class2.prototype, 'show'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'openEditItemCard', [_dec6], Object.getOwnPropertyDescriptor(_class2.prototype, 'openEditItemCard'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'hide', [_dec7, _dec8], Object.getOwnPropertyDescriptor(_class2.prototype, 'hide'), _class2.prototype)), _class2)) || _class);

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _dec32, _dec33, _dec34, _dec35, _class, _desc, _value, _class2;

var _templateObject = _taggedTemplateLiteral(['\n      <div class="field js-field-wrapper edit-item-card__account-type-wrapper">\n        <div class="control is-expanded">\n          <div class="select is-fullwidth">\n            <select class="input edit-item-card__account-type">\n              <option value="" class="t-text">ui.form.select_account_title</option>\n              ', '\n            </select>\n          </div>\n        </div>\n        <div\n          class="popper error-tooltip"\n          data-popper-ref=".control"\n          data-popper-placement="top-end"\n        ><t>error.form.account_type_not_selected</t></div>\n      </div>\n      <div class="field js-field-wrapper">\n        <p class="control">\n          <input\n            class="input js-field js-number-input t-attr edit-item-card__account-amount"\n            data-validate="number"\n            placeholder="t:domain.amount"\n          />\n        </p>\n        <div\n          class="popper error-tooltip"\n          data-popper-ref=".input"\n          data-popper-placement="top-end"\n        ></div>\n      </div>\n      <hr />\n    '], ['\n      <div class="field js-field-wrapper edit-item-card__account-type-wrapper">\n        <div class="control is-expanded">\n          <div class="select is-fullwidth">\n            <select class="input edit-item-card__account-type">\n              <option value="" class="t-text">ui.form.select_account_title</option>\n              ', '\n            </select>\n          </div>\n        </div>\n        <div\n          class="popper error-tooltip"\n          data-popper-ref=".control"\n          data-popper-placement="top-end"\n        ><t>error.form.account_type_not_selected</t></div>\n      </div>\n      <div class="field js-field-wrapper">\n        <p class="control">\n          <input\n            class="input js-field js-number-input t-attr edit-item-card__account-amount"\n            data-validate="number"\n            placeholder="t:domain.amount"\n          />\n        </p>\n        <div\n          class="popper error-tooltip"\n          data-popper-ref=".input"\n          data-popper-placement="top-end"\n        ></div>\n      </div>\n      <hr />\n    ']);

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

var _require = require('./edit-item-card-wrapper'),
    HIDE = _require.HIDE,
    RESET_SCROLL = _require.RESET_SCROLL,
    OPEN = _require.OPEN;

var _require2 = require('../confirm-modal.js'),
    SHOW_CONFIRM_MODAL = _require2.SHOW;

var CLASS_ERROR = 'has-error';

var EditItemCard = exports.EditItemCard = (_dec = component('edit-item-card'), _dec2 = wired('.edit-item-card__id'), _dec3 = wired('.edit-item-card__date'), _dec4 = wired('.edit-item-card__desc'), _dec5 = wired.all('.edit-item-card__debit'), _dec6 = wired.all('.edit-item-card__credit'), _dec7 = wired('.edit-item-card__debit-total'), _dec8 = wired('.edit-item-card__credit-total'), _dec9 = wired('.edit-item-card__debit-total-diff'), _dec10 = wired('.edit-item-card__credit-total-diff'), _dec11 = wired('.add-debit-button'), _dec12 = wired('.add-credit-button'), _dec13 = wired('.account-error-holder'), _dec14 = wired.all('.edit-item-card__account-input'), _dec15 = on(Action.MODEL_UPDATE), _dec16 = on(OPEN), _dec17 = emits(RESET_SCROLL), _dec18 = notifies('blur', '.js-number-input'), _dec19 = on.click.at('.add-debit-button'), _dec20 = on.click.at('.add-credit-button'), _dec21 = emits(Action.SCAN_LANGUAGE), _dec22 = on.click.at('.edit-item-save-button'), _dec23 = emits(Action.SAVE_TRADE), _dec24 = emits(HIDE), _dec25 = on.click.at('.edit-item-cancel-button'), _dec26 = emits(HIDE), _dec27 = on.click.at('.edit-item-card__delete-button'), _dec28 = emits(SHOW_CONFIRM_MODAL), _dec29 = emits(Action.DELETE_TRADE), _dec30 = emits(HIDE), _dec31 = on('input'), _dec32 = on.change.at('.edit-item-card__account-type'), _dec33 = on.input.at('.edit-item-card__account-amount'), _dec34 = notifies('field-error', '.js-form'), _dec35 = emits(Action.REQUEST_MONEY_FORMAT), _dec(_class = (_class2 = function () {
  function EditItemCard() {
    _classCallCheck(this, EditItemCard);
  }

  _createClass(EditItemCard, [{
    key: 'update',
    value: function update(_ref) {
      var _ref$detail = _ref.detail,
          user = _ref$detail.user,
          currentChart = _ref$detail.currentChart;

      this.currentChart = currentChart;
      this.debitTypes = user.currentDocument.recentDebitTypes(this.currentChart);
      this.creditTypes = user.currentDocument.recentCreditTypes(this.currentChart);
    }

    /**
     * @param {Trade} trade The trade
     */

  }, {
    key: 'onOpen',
    value: function onOpen(_ref2) {
      var trade = _ref2.detail.trade;

      this.el.innerHTML = '\n      <form class="js-form">\n        <input type="hidden" class="edit-item-card__id"/>\n        <div class="card-header">\n          <p class="card-header-title">\n            <t>domain.date</t>\n          </p>\n          <div class="card-header-icon js-field-wrapper pure">\n            <p class="control">\n              <input\n                class="input js-field js-pickadate edit-item-card__date"\n                data-validate="required"\n              />\n            </p>\n            <div\n              class="popper error-tooltip"\n              data-popper-ref=".edit-item-card__date"\n              data-popper-placement="top-end"\n            ></div>\n          </div>\n        </div>\n        <div class="card-content">\n          <div class="content">\n            <p class="t-text">app.description</p>\n            <div class="js-field-wrapper pure">\n              <p class="control">\n                <input\n                  class="js-field input edit-item-card__desc"\n                  data-validate="required"\n                />\n              </p>\n              <div\n                class="popper error-tooltip"\n                data-popper-ref=".input"\n                data-popper-placement="top-end"\n              ></div>\n            </div>\n            <h2>\n              <t>domain.debits</t>\n              <span class="edit-item-card__debit-total"></span>\n              <span class="edit-item-card__debit-total-diff"></span>\n            </h2>\n            <button class="button is-primary is-outlined add-debit-button">\n              <span class="icon">\n                <i class="fa fa-plus"></i>\n              </span>\n            </button>\n            <h2>\n              <t>domain.credits</t>\n              <span class="edit-item-card__credit-total"></span>\n              <span class="edit-item-card__credit-total-diff"></span>\n            </h2>\n            <button class="button is-primary is-outlined add-credit-button">\n              <span class="icon">\n                <i class="fa fa-plus"></i>\n              </span>\n            </button>\n          </div>\n        </div>\n        <div class="card-footer">\n          ' + (trade ? '<p class="card-footer-item"><a class="button is-dark t-text edit-item-card__delete-button" href="#">ui.form.delete</a></p>' : '') + '\n          <p class="card-footer-item">\n            <a class="button is-danger t-text edit-item-cancel-button" href="#">ui.form.cancel</a>\n          </p>\n          <p class="card-footer-item">\n            <button class="button is-primary t-text edit-item-save-button disable-on-error">ui.form.save</button>\n          </p>\n        </div>\n        <div class="account-error-holder"></div>\n      </form>\n    ';

      this.prep();

      if (trade) {
        this.fillTradeInForm(trade);
      } else {
        this.addDebitRow();
        this.addCreditRow();
        this.prep();
      }
    }
  }, {
    key: 'fillTradeInForm',
    value: function fillTradeInForm(trade) {
      var _this = this;

      this.id.value = trade.id;
      this.desc.value = trade.description;
      this.desc.dispatchEvent(new CustomEvent('input'));
      this.date.dispatchEvent(new CustomEvent(window.PICKDATE, { detail: trade.date }));
      trade.debits.forEach(function (debit) {
        _this.addDebitRow(debit);
      });
      trade.credits.forEach(function (credit) {
        _this.addCreditRow(credit);
      });

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
     * @param {Account} account The account
     * @param {AccountType[]} accountTypes
     * @param {HTMLElement} insertBefore
     */

  }, {
    key: 'addAccountInput',
    value: function addAccountInput(side, account, accountTypes, insertBefore) {
      var div = genel.div(_templateObject, this.options(accountTypes));

      div.classList.add('edit-item-card__' + side, 'edit-item-card__account-input');

      if (account) {
        div.querySelector('.edit-item-card__account-amount').dataset.amount = account.amount.amount;
        div.querySelector('select').value = account.type.name;
      }

      insertBefore.parentElement.insertBefore(div, insertBefore);
    }

    /**
     * @param {Debit | undefined} debit
     */

  }, {
    key: 'addDebitRow',
    value: function addDebitRow(debit) {
      this.addAccountInput('debit', debit, this.debitTypes, this.addDebitButton);
    }

    /**
     * @param {Credit | undefined} credit
     */

  }, {
    key: 'addCreditRow',
    value: function addCreditRow(credit) {
      this.addAccountInput('credit', credit, this.creditTypes, this.addCreditButton);
    }
  }, {
    key: 'options',
    value: function options(accountTypes) {
      var _this2 = this;

      return accountTypes.map(function (type) {
        return '<option value="' + type.name + '">' + type.name + ' (' + t10.t('domain.' + _this2.currentChart.getMajorTypeByAccountType(type).name) + ')</option>';
      }).join('');
    }
  }, {
    key: 'prep',
    value: function prep() {
      _prep(null, this.el);
    }
  }, {
    key: 'onSave',
    value: function onSave(e) {
      e.preventDefault();

      return {
        id: this.id.value,
        date: this.date.dataset.date,
        desc: this.desc.value,
        debitArray: this.createDebitArray(),
        creditArray: this.createCreditArray()
      };
    }
  }, {
    key: 'onCancel',
    value: function onCancel(e) {
      e.preventDefault();
    }
  }, {
    key: 'onClickAtDelete',
    value: function onClickAtDelete(e) {
      var _this3 = this;

      e.preventDefault();

      return {
        message: t10.t('app.ask_delete_this_trade'),
        onOk: function onOk() {
          return _this3.deleteTrade();
        }
      };
    }
  }, {
    key: 'deleteTrade',
    value: function deleteTrade() {
      return { id: this.id.value };
    }
  }, {
    key: 'adjustPopper',
    value: function adjustPopper() {
      capsidPopper.updateAll();
    }
  }, {
    key: 'onAccountChange',
    value: function onAccountChange() {
      var _this4 = this;

      var dt = this.debitTotal();
      var ct = this.creditTotal();

      this.fillAccountTotalLabels(dt, ct);[].forEach.call(this.accountInputs, function (el) {
        _this4.validateAccountInput(el);
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

      el.querySelector('.edit-item-card__account-type-wrapper').classList.toggle(CLASS_ERROR, this.isValidAmount(amount) && type === '');
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
     * @param {Object[]} accountArray
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
     * @param {NodeList} accountRows
     * @return {Object[]}
     */

  }, {
    key: 'createAccountArray',
    value: function createAccountArray(accountRows) {
      var _this5 = this;

      return [].map.call(accountRows, function (row) {
        return _this5.getAccountObject(row);
      }).filter(function (account) {
        return !!account.type && _this5.isValidAmount(account.amount);
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
        type: el.querySelector('.edit-item-card__account-type').value,
        amount: +el.querySelector('.edit-item-card__account-amount').dataset.amount
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
    key: 'id',
    get: function get() {}
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

  return EditItemCard;
}(), (_applyDecoratedDescriptor(_class2.prototype, 'id', [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, 'id'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'date', [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, 'date'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'desc', [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, 'desc'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'debits', [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, 'debits'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'credits', [_dec6], Object.getOwnPropertyDescriptor(_class2.prototype, 'credits'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'debitTotalLabel', [_dec7], Object.getOwnPropertyDescriptor(_class2.prototype, 'debitTotalLabel'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'creditTotalLabel', [_dec8], Object.getOwnPropertyDescriptor(_class2.prototype, 'creditTotalLabel'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'debitTotalDiffLabel', [_dec9], Object.getOwnPropertyDescriptor(_class2.prototype, 'debitTotalDiffLabel'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'creditTotalDiffLabel', [_dec10], Object.getOwnPropertyDescriptor(_class2.prototype, 'creditTotalDiffLabel'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'addDebitButton', [_dec11], Object.getOwnPropertyDescriptor(_class2.prototype, 'addDebitButton'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'addCreditButton', [_dec12], Object.getOwnPropertyDescriptor(_class2.prototype, 'addCreditButton'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'accountErrorHolder', [_dec13], Object.getOwnPropertyDescriptor(_class2.prototype, 'accountErrorHolder'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'accountInputs', [_dec14], Object.getOwnPropertyDescriptor(_class2.prototype, 'accountInputs'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'update', [_dec15], Object.getOwnPropertyDescriptor(_class2.prototype, 'update'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'onOpen', [_dec16, _dec17], Object.getOwnPropertyDescriptor(_class2.prototype, 'onOpen'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'fillTradeInForm', [_dec18], Object.getOwnPropertyDescriptor(_class2.prototype, 'fillTradeInForm'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'onClickAddDebitButton', [_dec19], Object.getOwnPropertyDescriptor(_class2.prototype, 'onClickAddDebitButton'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'onClickCreditButton', [_dec20], Object.getOwnPropertyDescriptor(_class2.prototype, 'onClickCreditButton'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'prep', [_dec21], Object.getOwnPropertyDescriptor(_class2.prototype, 'prep'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'onSave', [_dec22, _dec23, _dec24], Object.getOwnPropertyDescriptor(_class2.prototype, 'onSave'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'onCancel', [_dec25, _dec26], Object.getOwnPropertyDescriptor(_class2.prototype, 'onCancel'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'onClickAtDelete', [_dec27, _dec28], Object.getOwnPropertyDescriptor(_class2.prototype, 'onClickAtDelete'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'deleteTrade', [_dec29, _dec30], Object.getOwnPropertyDescriptor(_class2.prototype, 'deleteTrade'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'adjustPopper', [_dec31], Object.getOwnPropertyDescriptor(_class2.prototype, 'adjustPopper'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'onAccountChange', [_dec32, _dec33, _dec34], Object.getOwnPropertyDescriptor(_class2.prototype, 'onAccountChange'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'setAccountLabel', [_dec35], Object.getOwnPropertyDescriptor(_class2.prototype, 'setAccountLabel'), _class2.prototype)), _class2)) || _class);

},{"../confirm-modal.js":6,"./edit-item-card-wrapper":7,"genel":2}],9:[function(require,module,exports){
'use strict';

module.exports = require('./edit-item-card-wrapper');
require('./edit-item-card');

},{"./edit-item-card":8,"./edit-item-card-wrapper":7}],10:[function(require,module,exports){
'use strict';

require('./edit-item-card');
require('./confirm-modal');
require('./journal-page');
require('./trade-month-list');
require('./trade-list');
require('./no-trade-placeholder');
require('./trade-card');

},{"./confirm-modal":6,"./edit-item-card":9,"./journal-page":11,"./no-trade-placeholder":12,"./trade-card":13,"./trade-list":14,"./trade-month-list":15}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _class, _desc, _value, _class2;

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

var _require = require('./edit-item-card'),
    SHOW_EDIT_ITEM_CARD = _require.SHOW,
    HIDE_EDIT_ITEM_CARD = _require.HIDE;

var _require2 = require('./confirm-modal.js'),
    SHOW_CONFIRM_MODAL = _require2.SHOW,
    HIDE_CONFIRM_MODAL = _require2.HIDE;

var _require3 = require('./trade-card'),
    REQUEST_EDIT = _require3.REQUEST_EDIT;

var JournalPage = exports.JournalPage = (_dec = component('journal-page'), _dec2 = wired('.edit-item-card-wrapper'), _dec3 = wired('.add-entry-button'), _dec4 = on('click', { at: '.add-entry-button' }), _dec5 = on(REQUEST_EDIT), _dec6 = notifies(Action.UI_SHOW, '.modal-overlay-shadow'), _dec7 = on(HIDE_EDIT_ITEM_CARD), _dec8 = notifies(Action.UI_HIDE, '.modal-overlay-shadow'), _dec9 = on(SHOW_CONFIRM_MODAL), _dec10 = notifies(Action.UI_SHOW, '.confirm-modal-overlay-shadow'), _dec11 = notifies(SHOW_CONFIRM_MODAL, '.confirm-modal'), _dec12 = on(HIDE_CONFIRM_MODAL), _dec13 = notifies(Action.UI_HIDE, '.confirm-modal-overlay-shadow'), _dec(_class = (_class2 = function () {
  function JournalPage() {
    _classCallCheck(this, JournalPage);
  }

  _createClass(JournalPage, [{
    key: 'onClickAddEntryButton',
    value: function onClickAddEntryButton() {
      this.openEditItemCard(null); // creates new entry
    }
  }, {
    key: 'onClickEditButton',
    value: function onClickEditButton(_ref) {
      var trade = _ref.detail.trade;

      this.openEditItemCard(trade); // start editing the item
    }

    /**
     * @param {Trade | null} tradeId
     */

  }, {
    key: 'openEditItemCard',
    value: function openEditItemCard(trade) {
      this.editItemWrapper.dispatchEvent(new CustomEvent(SHOW_EDIT_ITEM_CARD, { detail: { trade: trade } }));
      this.addEntryButton.setAttribute('disabled', 'disabled');
    }
  }, {
    key: 'onHideNewItemCard',
    value: function onHideNewItemCard() {
      this.addEntryButton.removeAttribute('disabled');
    }
  }, {
    key: 'openConfirmModal',
    value: function openConfirmModal(_ref2) {
      var detail = _ref2.detail;

      return detail;
    }
  }, {
    key: 'hideConfirmModal',
    value: function hideConfirmModal() {}
  }, {
    key: 'editItemWrapper',
    get: function get() {}
  }, {
    key: 'addEntryButton',
    get: function get() {}
  }]);

  return JournalPage;
}(), (_applyDecoratedDescriptor(_class2.prototype, 'editItemWrapper', [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, 'editItemWrapper'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'addEntryButton', [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, 'addEntryButton'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'onClickAddEntryButton', [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, 'onClickAddEntryButton'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'onClickEditButton', [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, 'onClickEditButton'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'openEditItemCard', [_dec6], Object.getOwnPropertyDescriptor(_class2.prototype, 'openEditItemCard'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'onHideNewItemCard', [_dec7, _dec8], Object.getOwnPropertyDescriptor(_class2.prototype, 'onHideNewItemCard'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'openConfirmModal', [_dec9, _dec10, _dec11], Object.getOwnPropertyDescriptor(_class2.prototype, 'openConfirmModal'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'hideConfirmModal', [_dec12, _dec13], Object.getOwnPropertyDescriptor(_class2.prototype, 'hideConfirmModal'), _class2.prototype)), _class2)) || _class);

},{"./confirm-modal.js":6,"./edit-item-card":9,"./trade-card":13}],12:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _class, _desc, _value, _class2;

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
    on = _capsid.on;
var NoTradePlaceholder = (_dec = component('no-trade-placeholder'), _dec2 = on(Action.MODEL_UPDATE), _dec(_class = (_class2 = function () {
  function NoTradePlaceholder() {
    _classCallCheck(this, NoTradePlaceholder);
  }

  _createClass(NoTradePlaceholder, [{
    key: 'update',
    value: function update(_ref) {
      var trades = _ref.detail.currentJournal.trades;

      if (trades.length > 0) {
        this.el.style.display = 'none';
        return;
      }

      this.el.style.display = '';
    }
  }]);

  return NoTradePlaceholder;
}(), (_applyDecoratedDescriptor(_class2.prototype, 'update', [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, 'update'), _class2.prototype)), _class2)) || _class);


module.exports = NoTradePlaceholder;

},{}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _class, _desc, _value, _class2;

var _templateObject = _taggedTemplateLiteral(['\n      <div class="card">\n        <div class="card-header">\n          <p class="card-header-title">\n            No.<span class="trade-card__number-label">-</span>\n          </p>\n          <div class="card-header-icon">\n            <span class=""><strong class="trade-card__date-label"></strong></span>\n          </div>\n          <div class="card-header-icon">\n            <a class="button is-primary is-outlined t-text trade-card__edit-item-button">ui.form.edit</a>\n          </div>\n        </div>\n        <div class="card-content">\n          <div class="content">\n            <p class="trade-card__desc-label"></p>\n            <table>\n              <tr class="trade-card__debit-title-row u-text-uc">\n                <th><t>domain.debit</t></th>\n                <th></th>\n              </tr>\n              <tr class="trade-card__credit-title-row u-text-uc">\n                <th>\n                  <t>domain.credit</t>\n                <th>\n              </tr>\n            </table>\n            </div>\n        </div>\n      </div>\n    '], ['\n      <div class="card">\n        <div class="card-header">\n          <p class="card-header-title">\n            No.<span class="trade-card__number-label">-</span>\n          </p>\n          <div class="card-header-icon">\n            <span class=""><strong class="trade-card__date-label"></strong></span>\n          </div>\n          <div class="card-header-icon">\n            <a class="button is-primary is-outlined t-text trade-card__edit-item-button">ui.form.edit</a>\n          </div>\n        </div>\n        <div class="card-content">\n          <div class="content">\n            <p class="trade-card__desc-label"></p>\n            <table>\n              <tr class="trade-card__debit-title-row u-text-uc">\n                <th><t>domain.debit</t></th>\n                <th></th>\n              </tr>\n              <tr class="trade-card__credit-title-row u-text-uc">\n                <th>\n                  <t>domain.credit</t>\n                <th>\n              </tr>\n            </table>\n            </div>\n        </div>\n      </div>\n    ']),
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
    wired = _capsid.wired,
    emits = _capsid.emits;

var _require = require('~'),
    Action = _require.Action;

var genel = require('genel');

var REQUEST_EDIT = exports.REQUEST_EDIT = 'mb/trade-card/REQUEST_EDIT';

var TradeCard = exports.TradeCard = (_dec = component('trade-card'), _dec2 = wired('.trade-card__date-label'), _dec3 = wired('.trade-card__edit-item-button'), _dec4 = wired('.trade-card__number-label'), _dec5 = wired('.trade-card__desc-label'), _dec6 = wired('.trade-card__debit-title-row'), _dec7 = wired('.trade-card__credit-title-row'), _dec8 = on.click.at('.trade-card__edit-item-button'), _dec9 = emits(REQUEST_EDIT), _dec10 = on(Action.UPDATE_TRADE), _dec(_class = (_class2 = function () {
  function TradeCard() {
    _classCallCheck(this, TradeCard);
  }

  _createClass(TradeCard, [{
    key: '__mount__',
    value: function __mount__() {
      this.el.classList.add('column', 'is-3');
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
    key: 'onEditButtonClick',
    value: function onEditButtonClick() {
      return { trade: this.trade };
    }
  }, {
    key: 'update',
    value: function update(_ref) {
      var _this = this;

      var _ref$detail = _ref.detail,
          doc = _ref$detail.journalDocument,
          trade = _ref$detail.trade,
          number = _ref$detail.number;

      var serialized = this.serializeTrade(trade);

      if (this.lastTradeSerialized === serialized) {
        // not updated
        return;
      }

      this.lastTradeSerialized = serialized;
      this.trade = trade;

      this.el.dataset.tradeId = trade.id;
      this.editItemButton.dataset.tradeId = trade.id;
      this.numberLabel.textContent = number;
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
    }
  }, {
    key: 'dateLabel',
    get: function get() {}
  }, {
    key: 'editItemButton',
    get: function get() {}
  }, {
    key: 'numberLabel',
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
}(), (_applyDecoratedDescriptor(_class2.prototype, 'dateLabel', [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, 'dateLabel'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'editItemButton', [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, 'editItemButton'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'numberLabel', [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, 'numberLabel'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'descLabel', [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, 'descLabel'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'debitTitleRow', [_dec6], Object.getOwnPropertyDescriptor(_class2.prototype, 'debitTitleRow'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'creditTitleRow', [_dec7], Object.getOwnPropertyDescriptor(_class2.prototype, 'creditTitleRow'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'onEditButtonClick', [_dec8, _dec9], Object.getOwnPropertyDescriptor(_class2.prototype, 'onEditButtonClick'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'update', [_dec10], Object.getOwnPropertyDescriptor(_class2.prototype, 'update'), _class2.prototype)), _class2)) || _class);

},{"genel":2,"~":1}],14:[function(require,module,exports){
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _dec3, _dec4, _dec5, _class, _desc, _value, _class2;

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
    make = _capsid.make,
    wired = _capsid.wired;

var genel = require('genel');

var TradeList = (_dec = component('trade-list'), _dec2 = wired.all('.trade-card'), _dec3 = wired('.trade-list__main'), _dec4 = wired('.title'), _dec5 = on('trade-updated'), _dec(_class = (_class2 = function () {
  function TradeList() {
    _classCallCheck(this, TradeList);
  }

  _createClass(TradeList, [{
    key: '__mount__',
    value: function __mount__() {
      this.el.innerHTML = '<hr /><h2 class="title"></h2><div class="trade-list__main columns is-multiline"></div>';
    }
  }, {
    key: 'setTitle',
    value: function setTitle(title) {
      this.title.textContent = title;
    }
  }, {
    key: 'update',
    value: function update(_ref) {
      var _this = this;

      var _ref$detail = _ref.detail,
          trades = _ref$detail.trades,
          currentDocument = _ref$detail.currentDocument;

      if (trades.length === 0) {
        this.el.style.display = 'none';
        return;
      }

      this.el.style.display = '';

      Array.prototype.forEach.call(this.tradeCards, function (el) {
        // TODO: do not use find each time
        if (!trades.find(function (_ref2) {
          var _ref3 = _slicedToArray(_ref2, 2),
              trade = _ref3[0],
              i = _ref3[1];

          return trade.id === el.dataset.tradeId;
        })) {
          _this.main.removeChild(el);
        }
      });

      trades.forEach(function (_ref4) {
        var _ref5 = _slicedToArray(_ref4, 2),
            trade = _ref5[0],
            number = _ref5[1];

        var el = _this.el.querySelector('[data-trade-id="' + trade.id + '"]') || make('trade-card', genel.div(_templateObject)).el;

        el.dispatchEvent(new CustomEvent(Action.UPDATE_TRADE, {
          detail: { journalDocument: currentDocument, trade: trade, number: number }
        }));

        _this.main.appendChild(el);
      });
    }
  }, {
    key: 'tradeCards',
    get: function get() {}
  }, {
    key: 'main',
    get: function get() {}
  }, {
    key: 'title',
    get: function get() {}
  }]);

  return TradeList;
}(), (_applyDecoratedDescriptor(_class2.prototype, 'tradeCards', [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, 'tradeCards'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'main', [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, 'main'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'title', [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, 'title'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'update', [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, 'update'), _class2.prototype)), _class2)) || _class);


module.exports = TradeList;

},{"genel":2}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _dec3, _class, _desc, _value, _class2;

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
    make = _capsid.make,
    wired = _capsid.wired;

var genel = require('genel');

var TradeMonthList = (_dec = component('trade-month-list'), _dec2 = wired.all('.trade-list'), _dec3 = on(Action.MODEL_UPDATE), _dec(_class = (_class2 = function () {
  function TradeMonthList() {
    _classCallCheck(this, TradeMonthList);
  }

  _createClass(TradeMonthList, [{
    key: 'classForMonth',
    value: function classForMonth(month) {
      return 'trade-month-list_' + month.format('MMMM-YYYY');
    }
  }, {
    key: 'monthsAreReady',
    value: function monthsAreReady() {
      return this.tradeLists.length > 0;
    }
  }, {
    key: 'setUpMonths',
    value: function setUpMonths(months) {
      var _this = this;

      months.forEach(function (month) {
        var el = genel.div(_templateObject);

        el.classList.add(_this.classForMonth(month));

        var tradeList = make('trade-list', el);

        tradeList.setTitle(month.format('MMMM YYYY'));

        _this.el.appendChild(el);
      });
    }
  }, {
    key: 'update',
    value: function update(_ref) {
      var _this2 = this;

      var _ref$detail = _ref.detail,
          user = _ref$detail.user,
          currentJournal = _ref$detail.currentJournal;

      var months = user.currentDocument.getMonths().reverse();

      if (!this.monthsAreReady()) {
        this.setUpMonths(months);
      }

      var allTrades = Array.from(currentJournal.trades).map(function (trade, i) {
        return [trade, i + 1];
      }).reverse();

      months.forEach(function (month) {
        // TODO: do not use filter on each item
        var trades = allTrades.filter(function (_ref2) {
          var _ref3 = _slicedToArray(_ref2, 2),
              trade = _ref3[0],
              i = _ref3[1];

          return trade.date.clone().startOf('month').valueOf() === month.valueOf();
        });
        _this2.el.querySelector('.' + _this2.classForMonth(month)).dispatchEvent(new CustomEvent('trade-updated', {
          detail: { trades: trades, currentDocument: user.currentDocument }
        }));
      });

      t10.scan();
    }
  }, {
    key: 'tradeLists',
    get: function get() {}
  }]);

  return TradeMonthList;
}(), (_applyDecoratedDescriptor(_class2.prototype, 'tradeLists', [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, 'tradeLists'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'update', [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, 'update'), _class2.prototype)), _class2)) || _class);
exports.default = TradeMonthList;

},{"genel":2}]},{},[10]);
