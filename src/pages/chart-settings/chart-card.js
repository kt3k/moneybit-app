const { component, wired, on, emits, make } = capsid
const genel = require('genel')
const uuid = require('uuid')

@component('chart-card')
class ChartCard {
  @wired('tbody') tbody

  @on('ledger-update')
  onLedgerUpdate ({
    detail: {
      currentChart,
      ledger,
      domain: { MajorAccountType }
    }
  }) {
    const majorType = MajorAccountType[this.el.getAttribute('type')]

    if (!majorType) {
      throw new Error(`no such type: "${this.el.getAttribute('type')}"`)
    }

    this.tbody.innerHTML = ''

    currentChart.getAccountTypesByMajorType(majorType).forEach(type => {
      const item = make('chart-card__item', genel.tr`<td></td>`)
      item.update({
        name: type.name,
        count: ledger.hasSubledgerOfAccountType(type)
          ? ledger.getSubledgerByAccountType(type).accounts.length
          : 0
      })
      this.tbody.appendChild(item.el)
    })
  }
}

@component('chart-card__item')
class ChartCardItem {
  @wired('td') td

  __mount__ () {
    this.el.id = uuid.v4()
  }

  @emits('open-tooltip')
  @on.click
  openTooltip () {
    return {
      id: this.el.id,
      typeName: this.name,
      disabled: this.count > 0
    }
  }

  update ({ name, count }) {
    this.name = name
    this.count = count
    this.td.textContent = name
    if (this.count > 0) {
      this.td.textContent += ` (${this.count})`
    }
  }
}

module.exports = ChartCard
module.exports.ChartCardItem = ChartCardItem
