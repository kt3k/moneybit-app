---
name: Document
desc: The document model
src: https://github.com/kt3k/moneybit-app/blob/master/src/domain/document.js
props:
- name: id
  type: string
  desc: The id of the document
- name: name
  type: string
  desc: The name of the document
- name: journal
  type: Journal
  desc: The journal of the document
- name: chart
  type: AccountTypeChart
  desc: The chart of the account types
- name: currency
  type: Currency
  desc: The currency of the document
- name: start
  type: moment
  desc: The start date of the document
- name: end
  type: moment
  desc: The end date of the document
- name: commaPeriodSetting
  type: CommaPeriodSetting
  desc: The setting of comma and period for separating number
---

Document is the unit of the accounting document in moneybit app.
