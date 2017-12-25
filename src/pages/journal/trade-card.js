const { component, emits, on, wire } = capsid
const { Action } = require('~')
const genel = require('genel')

@component('js-trade-card')
class TradeCard {
  @wire.el('.trade-card__date-label')
  get dateLabel () {}

  __init__ () {
    this.el.classList.add('column')
    this.el.appendChild(genel`
      <div class="card">
        <div class="card-header">
          <p class="card-header-title">
            No.16
          </p>
          <div class="card-header-icon">
            <span class=""><strong class="trade-card__date-label">2016/04/05</strong></span>
          </div>
          <div class="card-header-icon">
            <a class="button is-primary is-outlined t-text" href="">ui.form.edit</a>
          </div>
        </div>
        <div class="card-content">
          <div class="content">
            <p>期首
            <table>
              <tr>
                <th><t>domain.debit</t>
                <th>
              <tr>
                <td>普通預金
                <td>¥3,128,097
              <tr>
                <td>売掛金
                <td>¥1,069,200
              <tr>
                <th><t>domain.credit</t>
                <th>
              <tr>
                <td>元入金
                <td>¥4,197,297
            </table>
            </div>
        </div>
      </div>
    `)
  }

  @on(Action.UPDATE_TRADE)
  update ({ detail: trade }) {
    console.log(trade)
    this.dateLabel.textContent = trade.date.format('YYYY/MM/DD')
  }
}

module.exports = TradeCard
