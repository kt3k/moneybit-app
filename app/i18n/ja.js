(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports={
  "app.menu.app_settings": "アプリの設定",
  "app.menu.create_new_journal": "新しい仕訳帳を作る",
  "app.menu.export": "エクスポート",
  "app.menu.review_app": "アプリをレビューする",
  "app.menu.help": "ヘルプ",
  "app.settings": "設定",
  "app.title": "タイトル",
  "app.total": "合計",
  "app.description": "説明",
  "app.language.auto": "自動",
  "app.journal.add_an_entry": "仕訳帳に追加する",
  "app.journal.create_new": "新しい仕訳帳を作成する",
  "app.edit_chart_of_accounts": "勘定科目一覧を編集する",
  "app.save_this_chart_as_the_default_chart": "上記の内容をデフォルトの勘定科目一覧として保存する",
  "app.lets_create_new_journal": "年度を超える場合は新しい仕訳帳を作成しましょう!",
  "app.ask_delete_this_trade": "この取引を本当に削除しますか?",
  "app.title.language": "あA 言語",
  "app.this_chart_of_accounts_is_used_as_default": "アプリのデフォルトの勘定科目一覧です. 新しい仕訳帳を作る際にデフォルトとして使用されます.",
  "app.onboarding.lets_start": "上のボタンを押して仕訳を始めましょう! 😃",
  "domain.balancesheet": "貸借対照表",
  "domain.asset": "資産",
  "domain.assets": "資産",
  "domain.amount": "金額",
  "domain.liability": "負債",
  "domain.liabilities": "負債",
  "domain.equity": "純資産",
  "domain.revenue": "収益",
  "domain.revenues": "収益",
  "domain.expense": "費用",
  "domain.expenses": "費用",
  "domain.journal": "仕訳帳",
  "domain.debit": "借方",
  "domain.debits": "借方",
  "domain.credit": "貸方",
  "domain.credits": "貸方",
  "domain.chart_of_accounts": "勘定科目一覧",
  "domain.currency": "通貨",
  "domain.comma_period_style": "コンマスタイル",
  "domain.journal.start_date": "開始日",
  "domain.journal.end_date": "終了日",
  "domain.journal.title": "仕訳帳タイトル",
  "domain.date": "日付",
  "ui.form.save": "保存",
  "ui.form.create": "作成",
  "ui.form.cancel": "キャンセル",
  "ui.form.edit": "編集",
  "ui.form.finish_editing": "編集を終了",
  "ui.form.delete": "削除",
  "ui.form.select_date": "日付を選択",
  "ui.form.select_account_title": "勘定科目を選択",
  "error.form.field_required": "必須項目です💦",
  "error.form.not_valid_number": "数値の形式が正しくありません💦",
  "error.form.account_type_not_selected": "勘定科目が選択されていません💦",
  "locale.date_format": "YYYY/MM/DD"
}

},{}],2:[function(require,module,exports){
'use strict';

t10.setResource(require('./ja.json'));

},{"./ja.json":1}]},{},[2]);
