(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):e.genel=t()}(this,function(){var e=function(t){return Array.isArray(t)?e.div.apply(null,arguments).firstChild:function(e){var r=arguments,o=document.createElement(t);return o.innerHTML=e.map(function(e,t){return e+(r[t+1]||"")}).join("").trim(),o}};return"a,abbr,address,area,article,aside,audio,b,base,bdi,bdo,blockquote,body,br,button,canvas,caption,cite,code,col,colgroup,data,datalist,dd,del,details,dfn,dialog,div,dl,dt,em,embed,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,i,iframe,img,input,ins,kbd,keygen,label,legend,li,link,main,map,mark,math,menu,menuitem,meta,meter,nav,noscript,object,ol,optgroup,option,output,p,param,picture,pre,progress,q,rb,rp,rt,rtc,ruby,s,samp,script,section,select,slot,small,source,span,strong,style,sub,summary,sup,svg,table,tbody,td,template,textarea,tfoot,th,thead,time,title,tr,track,u,ul,var,video,wbr".split(",").forEach(function(t){e[t]=e(t)}),e});

},{}],2:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _dec3, _dec4, _class, _desc, _value, _class2;

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
    notifies = _capsid.notifies;


var UPDATE_BS_DATE = 'mb/bs/UPDATE_BS_DATE';
var CHANGE_BS_DATE = 'mb/bs/CHANGE_BS_DATE';
var CLASS_UPDATE_BS_DATE = 'observes-bs-date';

var BsPage = (_dec = component('bs-page'), _dec2 = notifies(UPDATE_BS_DATE, '.' + CLASS_UPDATE_BS_DATE), _dec3 = on(Action.MODEL_UPDATE), _dec4 = on(CHANGE_BS_DATE), _dec(_class = (_class2 = function () {
  function BsPage() {
    _classCallCheck(this, BsPage);
  }

  _createClass(BsPage, [{
    key: 'notifyUpdates',
    value: function notifyUpdates() {
      var _this = this;

      var journal = this.journal;

      if (this.date) {
        journal = new this.domain.Journal.Factory().createFromArray([]);
        journal.addTrades(this.journal.trades.filter(function (trade) {
          return trade.date <= _this.date;
        }));
      }

      var date = journal.lastTrade().date;

      return {
        date: date,
        journal: journal,
        chart: this.chart,
        domain: this.domain,
        baseJournal: this.journal
      };
    }
  }, {
    key: 'update',
    value: function update(_ref) {
      var _ref$detail = _ref.detail,
          currentJournal = _ref$detail.currentJournal,
          currentChart = _ref$detail.currentChart,
          domain = _ref$detail.domain;

      this.journal = currentJournal;
      this.chart = currentChart;
      this.domain = domain;
      this.notifyUpdates();
    }
  }, {
    key: 'updateDate',
    value: function updateDate(_ref2) {
      var date = _ref2.detail;

      this.date = moment(date);

      this.notifyUpdates();
    }
  }]);

  return BsPage;
}(), (_applyDecoratedDescriptor(_class2.prototype, 'notifyUpdates', [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, 'notifyUpdates'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'update', [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, 'update'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'updateDate', [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, 'updateDate'), _class2.prototype)), _class2)) || _class);


module.exports = BsPage;
module.exports.UPDATE_BS_DATE = UPDATE_BS_DATE;
module.exports.CLASS_UPDATE_BS_DATE = CLASS_UPDATE_BS_DATE;
module.exports.CHANGE_BS_DATE = CHANGE_BS_DATE;

},{}],3:[function(require,module,exports){
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
    component = _capsid.component,
    on = _capsid.on,
    wired = _capsid.wired,
    emits = _capsid.emits;

var _require = require('./bs-page'),
    CLASS_UPDATE_BS_DATE = _require.CLASS_UPDATE_BS_DATE,
    UPDATE_BS_DATE = _require.UPDATE_BS_DATE,
    CHANGE_BS_DATE = _require.CHANGE_BS_DATE;

var DatePanel = (_dec = component('date-panel'), _dec2 = wired('.title'), _dec3 = wired('.last-date'), _dec4 = wired('.first-date'), _dec5 = on.click.at('.last-date'), _dec6 = emits(CHANGE_BS_DATE), _dec7 = on.click.at('.first-date'), _dec8 = emits(CHANGE_BS_DATE), _dec9 = on(UPDATE_BS_DATE), _dec(_class = (_class2 = function () {
  function DatePanel() {
    _classCallCheck(this, DatePanel);
  }

  _createClass(DatePanel, [{
    key: '__mount__',
    value: function __mount__() {
      this.el.classList.add(CLASS_UPDATE_BS_DATE);
    }
  }, {
    key: 'onClickLastDate',
    value: function onClickLastDate() {
      return this.lastDate;
    }
  }, {
    key: 'onClickFirstDate',
    value: function onClickFirstDate() {
      return this.firstDate;
    }
  }, {
    key: 'update',
    value: function update(_ref) {
      var _ref$detail = _ref.detail,
          date = _ref$detail.date,
          baseJournal = _ref$detail.baseJournal;

      this.label.textContent = date.format(t10.t('locale.date_format'));

      this.firstDate = baseJournal.firstTrade().date;
      this.lastDate = baseJournal.lastTrade().date;

      this.updateDisplay(date.isSame(this.firstDate), this.firstDateLabel);
      this.updateDisplay(date.isSame(this.lastDate), this.lastDateLabel);
    }
  }, {
    key: 'updateDisplay',
    value: function updateDisplay(condition, el) {
      if (!el) {
        return;
      }

      if (condition) {
        el.style.display = 'none';
      } else {
        el.style.display = '';
      }
    }
  }, {
    key: 'label',
    get: function get() {}
  }, {
    key: 'lastDateLabel',
    get: function get() {}
  }, {
    key: 'firstDateLabel',
    get: function get() {}
  }]);

  return DatePanel;
}(), (_applyDecoratedDescriptor(_class2.prototype, 'label', [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, 'label'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'lastDateLabel', [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, 'lastDateLabel'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'firstDateLabel', [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, 'firstDateLabel'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'onClickLastDate', [_dec5, _dec6], Object.getOwnPropertyDescriptor(_class2.prototype, 'onClickLastDate'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'onClickFirstDate', [_dec7, _dec8], Object.getOwnPropertyDescriptor(_class2.prototype, 'onClickFirstDate'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'update', [_dec9], Object.getOwnPropertyDescriptor(_class2.prototype, 'update'), _class2.prototype)), _class2)) || _class);


module.exports = DatePanel;

},{"./bs-page":2}],4:[function(require,module,exports){
'use strict';

require('./major-account-type-card');
require('./summary-cards');
require('./bs-page');
require('./date-panel');

},{"./bs-page":2,"./date-panel":3,"./major-account-type-card":5,"./summary-cards":6}],5:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _desc, _value, _class, _dec2, _class2, _dec3, _class3, _dec4, _class4, _dec5, _class5, _dec6, _class6;

var _templateObject = _taggedTemplateLiteral(['\n      <td>', '</td>\n      <td>-</td>\n    '], ['\n      <td>', '</td>\n      <td>-</td>\n    ']),
    _templateObject2 = _taggedTemplateLiteral(['\n      <td><t>domain.retained_earnings</t></td>\n      <td>-</td>\n    '], ['\n      <td><t>domain.retained_earnings</t></td>\n      <td>-</td>\n    ']),
    _templateObject3 = _taggedTemplateLiteral(['\n      <th><t>app.total</t></th>\n      <th>-</th>\n    '], ['\n      <th><t>app.total</t></th>\n      <th>-</th>\n    ']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

var genel = require('genel');

var _require = require('./summary-cards'),
    SummaryCard = _require.SummaryCard;

var _require2 = require('./bs-page'),
    UPDATE_BS_DATE = _require2.UPDATE_BS_DATE;

var MajorAccountTypeCard = (_dec = on(UPDATE_BS_DATE), (_class = function (_SummaryCard) {
  _inherits(MajorAccountTypeCard, _SummaryCard);

  function MajorAccountTypeCard() {
    _classCallCheck(this, MajorAccountTypeCard);

    return _possibleConstructorReturn(this, (MajorAccountTypeCard.__proto__ || Object.getPrototypeOf(MajorAccountTypeCard)).apply(this, arguments));
  }

  _createClass(MajorAccountTypeCard, [{
    key: 'majorAccountType',
    value: function majorAccountType(MajorAccountType) {
      return MajorAccountType.ASSET;
    }
  }, {
    key: 'update',
    value: function update(_ref) {
      var _this2 = this;

      var _ref$detail = _ref.detail,
          journal = _ref$detail.journal,
          chart = _ref$detail.chart,
          domain = _ref$detail.domain;

      var subledgers = journal.toLedger(chart).getSubledgersByMajorType(this.majorAccountType(domain.MajorAccountType));

      this.table.innerHTML = '';

      var amounts = [];

      subledgers.forEach(function (subledger) {
        amounts.push(subledger.total().amount);
        _this2.createSubledgerTotalRow(subledger);
      });

      this.createTotalRow(amounts.reduce(function (x, y) {
        return x + y;
      }, 0), journal, chart, domain.MajorAccountType);

      t10.scan();
    }

    /**
     * @param {Subledger} subledger
     */

  }, {
    key: 'createSubledgerTotalRow',
    value: function createSubledgerTotalRow(subledger) {
      var tr = genel.tr(_templateObject, subledger.type.name);
      this.table.appendChild(tr);

      this.assignMoneyFormat(subledger.total().amount, tr.lastChild);
    }
  }, {
    key: 'createRetainedEarningsRow',
    value: function createRetainedEarningsRow(retainedEarnings) {
      var tr = genel.tr(_templateObject2);
      this.table.appendChild(tr);
      this.assignMoneyFormat(retainedEarnings, tr.lastChild);
    }
  }, {
    key: 'createTotalRow',
    value: function createTotalRow(total, currentJournal, currentChart, MajorAccountType) {
      if (this.majorAccountType(MajorAccountType) === MajorAccountType.EQUITY) {
        var retainedEarnings = currentJournal.toBalanceSheet(currentChart).retainedEarnings().amount;
        total += retainedEarnings;
        this.createRetainedEarningsRow(retainedEarnings);
      }

      var row = genel.tr(_templateObject3);

      this.table.appendChild(row);

      this.assignMoneyFormat(total, row.lastChild);
    }
  }]);

  return MajorAccountTypeCard;
}(SummaryCard), (_applyDecoratedDescriptor(_class.prototype, 'update', [_dec], Object.getOwnPropertyDescriptor(_class.prototype, 'update'), _class.prototype)), _class));
var AssetCard = (_dec2 = component('asset-card'), _dec2(_class2 = function (_MajorAccountTypeCard) {
  _inherits(AssetCard, _MajorAccountTypeCard);

  function AssetCard() {
    _classCallCheck(this, AssetCard);

    return _possibleConstructorReturn(this, (AssetCard.__proto__ || Object.getPrototypeOf(AssetCard)).apply(this, arguments));
  }

  _createClass(AssetCard, [{
    key: 'title',
    value: function title() {
      return '<t>domain.assets</t>';
    }
  }, {
    key: 'majorAccountType',
    value: function majorAccountType(MajorAccountType) {
      return MajorAccountType.ASSET;
    }
  }]);

  return AssetCard;
}(MajorAccountTypeCard)) || _class2);
var LiabilityCard = (_dec3 = component('liability-card'), _dec3(_class3 = function (_MajorAccountTypeCard2) {
  _inherits(LiabilityCard, _MajorAccountTypeCard2);

  function LiabilityCard() {
    _classCallCheck(this, LiabilityCard);

    return _possibleConstructorReturn(this, (LiabilityCard.__proto__ || Object.getPrototypeOf(LiabilityCard)).apply(this, arguments));
  }

  _createClass(LiabilityCard, [{
    key: 'title',
    value: function title() {
      return '<t>domain.liabilities</t>';
    }
  }, {
    key: 'majorAccountType',
    value: function majorAccountType(MajorAccountType) {
      return MajorAccountType.LIABILITY;
    }
  }]);

  return LiabilityCard;
}(MajorAccountTypeCard)) || _class3);
var EquityCard = (_dec4 = component('equity-card'), _dec4(_class4 = function (_MajorAccountTypeCard3) {
  _inherits(EquityCard, _MajorAccountTypeCard3);

  function EquityCard() {
    _classCallCheck(this, EquityCard);

    return _possibleConstructorReturn(this, (EquityCard.__proto__ || Object.getPrototypeOf(EquityCard)).apply(this, arguments));
  }

  _createClass(EquityCard, [{
    key: 'title',
    value: function title() {
      return '<t>domain.equity</t>';
    }
  }, {
    key: 'majorAccountType',
    value: function majorAccountType(MajorAccountType) {
      return MajorAccountType.EQUITY;
    }
  }]);

  return EquityCard;
}(MajorAccountTypeCard)) || _class4);
var RevenueCard = (_dec5 = component('revenue-card'), _dec5(_class5 = function (_MajorAccountTypeCard4) {
  _inherits(RevenueCard, _MajorAccountTypeCard4);

  function RevenueCard() {
    _classCallCheck(this, RevenueCard);

    return _possibleConstructorReturn(this, (RevenueCard.__proto__ || Object.getPrototypeOf(RevenueCard)).apply(this, arguments));
  }

  _createClass(RevenueCard, [{
    key: 'title',
    value: function title() {
      return '<t>domain.revenues</t>';
    }
  }, {
    key: 'majorAccountType',
    value: function majorAccountType(MajorAccountType) {
      return MajorAccountType.REVENUE;
    }
  }]);

  return RevenueCard;
}(MajorAccountTypeCard)) || _class5);
var ExpenseCard = (_dec6 = component('expense-card'), _dec6(_class6 = function (_MajorAccountTypeCard5) {
  _inherits(ExpenseCard, _MajorAccountTypeCard5);

  function ExpenseCard() {
    _classCallCheck(this, ExpenseCard);

    return _possibleConstructorReturn(this, (ExpenseCard.__proto__ || Object.getPrototypeOf(ExpenseCard)).apply(this, arguments));
  }

  _createClass(ExpenseCard, [{
    key: 'title',
    value: function title() {
      return '<t>domain.expenses</t>';
    }
  }, {
    key: 'majorAccountType',
    value: function majorAccountType(MajorAccountType) {
      return MajorAccountType.EXPENSE;
    }
  }]);

  return ExpenseCard;
}(MajorAccountTypeCard)) || _class6);


exports.AssetCard = AssetCard;
exports.LiabilityCard = LiabilityCard;
exports.EquityCard = EquityCard;
exports.RevenueCard = RevenueCard;
exports.ExpenseCard = ExpenseCard;

},{"./bs-page":2,"./summary-cards":6,"genel":1}],6:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _desc, _value, _class, _dec3, _dec4, _class2, _desc2, _value2, _class3, _dec5, _dec6, _class4, _desc3, _value3, _class5;

var _templateObject = _taggedTemplateLiteral(['\n      <th><t>app.total</t></th>\n      <th>-</th>\n    '], ['\n      <th><t>app.total</t></th>\n      <th>-</th>\n    ']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

var genel = require('genel');

var _require = require('./bs-page'),
    CLASS_UPDATE_BS_DATE = _require.CLASS_UPDATE_BS_DATE,
    UPDATE_BS_DATE = _require.UPDATE_BS_DATE;

var SummaryCard = (_dec = wired('tbody'), _dec2 = emits(Action.REQUEST_MONEY_FORMAT), (_class = function () {
  function SummaryCard() {
    _classCallCheck(this, SummaryCard);
  }

  _createClass(SummaryCard, [{
    key: '__mount__',
    value: function __mount__() {
      this.el.innerHTML = '\n      <header class="card-header">\n        <div class="card-header-title">\n          ' + this.title() + '\n        </div>\n      </header>\n      <div class="card-content">\n        <div class="content">\n          <table>\n            <tbody></tbody>\n          </table>\n        </div>\n      </div>\n    ';

      this.el.classList.add('card', CLASS_UPDATE_BS_DATE);
    }
  }, {
    key: 'title',
    value: function title() {
      return 'Title';
    }
  }, {
    key: 'assignMoneyFormat',
    value: function assignMoneyFormat(amount, el) {
      return {
        amount: amount,
        send: function send(format) {
          el.textContent = format;
        }
      };
    }
  }, {
    key: 'table',
    get: function get() {}
  }]);

  return SummaryCard;
}(), (_applyDecoratedDescriptor(_class.prototype, 'table', [_dec], Object.getOwnPropertyDescriptor(_class.prototype, 'table'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'assignMoneyFormat', [_dec2], Object.getOwnPropertyDescriptor(_class.prototype, 'assignMoneyFormat'), _class.prototype)), _class));
var LiabilityEquityTotalCard = (_dec3 = component('liability-equity-total-card'), _dec4 = on(UPDATE_BS_DATE), _dec3(_class2 = (_class3 = function (_SummaryCard) {
  _inherits(LiabilityEquityTotalCard, _SummaryCard);

  function LiabilityEquityTotalCard() {
    _classCallCheck(this, LiabilityEquityTotalCard);

    return _possibleConstructorReturn(this, (LiabilityEquityTotalCard.__proto__ || Object.getPrototypeOf(LiabilityEquityTotalCard)).apply(this, arguments));
  }

  _createClass(LiabilityEquityTotalCard, [{
    key: 'title',
    value: function title() {
      return '<t>domain.liabilities</t> + <t>domain.equity</t>';
    }
  }, {
    key: 'update',
    value: function update(_ref) {
      var _ref$detail = _ref.detail,
          journal = _ref$detail.journal,
          chart = _ref$detail.chart,
          domain = _ref$detail.domain;

      this.table.innerHTML = '';

      var bs = journal.toBalanceSheet(chart);
      var _domain$MajorAccountT = domain.MajorAccountType,
          EQUITY = _domain$MajorAccountT.EQUITY,
          LIABILITY = _domain$MajorAccountT.LIABILITY;

      var row = genel.tr(_templateObject);

      this.table.appendChild(row);

      this.assignMoneyFormat(bs.totalByMajorType(EQUITY).plus(bs.totalByMajorType(LIABILITY)).amount, row.lastChild);
    }
  }]);

  return LiabilityEquityTotalCard;
}(SummaryCard), (_applyDecoratedDescriptor(_class3.prototype, 'update', [_dec4], Object.getOwnPropertyDescriptor(_class3.prototype, 'update'), _class3.prototype)), _class3)) || _class2);
var IncomeCard = (_dec5 = component('income-card'), _dec6 = on(UPDATE_BS_DATE), _dec5(_class4 = (_class5 = function (_SummaryCard2) {
  _inherits(IncomeCard, _SummaryCard2);

  function IncomeCard() {
    _classCallCheck(this, IncomeCard);

    return _possibleConstructorReturn(this, (IncomeCard.__proto__ || Object.getPrototypeOf(IncomeCard)).apply(this, arguments));
  }

  _createClass(IncomeCard, [{
    key: 'title',
    value: function title() {
      return '<t>domain.income</t>';
    }
  }, {
    key: 'update',
    value: function update(_ref2) {
      var _ref2$detail = _ref2.detail,
          journal = _ref2$detail.journal,
          chart = _ref2$detail.chart,
          domain = _ref2$detail.domain;

      this.table.innerHTML = '';

      var bs = journal.toBalanceSheet(chart);
      var _domain$MajorAccountT2 = domain.MajorAccountType,
          REVENUE = _domain$MajorAccountT2.REVENUE,
          EXPENSE = _domain$MajorAccountT2.EXPENSE;

      var row = genel.tr(_templateObject);

      this.table.appendChild(row);

      this.assignMoneyFormat(bs.totalByMajorType(REVENUE).minus(bs.totalByMajorType(EXPENSE)).amount, row.lastChild);

      t10.scan();
    }
  }]);

  return IncomeCard;
}(SummaryCard), (_applyDecoratedDescriptor(_class5.prototype, 'update', [_dec6], Object.getOwnPropertyDescriptor(_class5.prototype, 'update'), _class5.prototype)), _class5)) || _class4);


exports.SummaryCard = SummaryCard;
exports.LiabilityEquityTotalCard = LiabilityEquityTotalCard;
exports.IncomeCard = IncomeCard;

},{"./bs-page":2,"genel":1}]},{},[4]);
