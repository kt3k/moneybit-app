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
      let name = type.name
      if (ledger.hasSubledgerOfAccountType(type)) {
        const subledger = ledger.getSubledgerByAccountType(type)
        name += ` (${subledger.accounts.length})`
      }
      item.update(name)
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
      typeName: this.el.textContent
    }
  }

  update (name) {
    this.td.textContent = name
  }
}

module.exports = ChartCard
module.exports.ChartCardItem = ChartCardItem
