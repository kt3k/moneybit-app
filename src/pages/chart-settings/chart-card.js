const { component, wired, on, emits, make } = capsid
const { OPEN_CREATE_MODAL, OPEN_TOOLTIP } = require('./event-types')
const genel = require('genel')
const uuid = require('uuid')

@component('chart-card')
class ChartCard {
  @wired('tbody') tbody

  @on.click.at('.card-header-title .button')
  @emits(OPEN_CREATE_MODAL)
  onOpenCreateModal () {
    return {
      message: `Input a new account title for "${this.majorType.name}"`, // TODO: i18n
      onSave: input => this.addAccountType(input)
    }
  }

  @emits(Action.CHART_ADD_ACCOUNT_TYPE)
  addAccountType (typeName) {
    return {
      accountTypeName: typeName,
      majorType: this.majorType
    }
  }

  getType () {
    return this.el.getAttribute('type')
  }

  @on('ledger-update')
  onLedgerUpdate ({
    detail: {
      currentChart,
      ledger,
      domain: { MajorAccountType }
    }
  }) {
    const majorType = (this.majorType = MajorAccountType[this.getType()])

    if (!majorType) {
      throw new Error(`no such type: "${this.getType()}"`)
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

  @emits(OPEN_TOOLTIP)
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
