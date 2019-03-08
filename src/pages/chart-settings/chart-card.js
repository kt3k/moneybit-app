const {
  actions: { MODEL_UPDATE }
} = require('~')

const { component, wired, on, emits, make } = capsid
const genel = require('genel')
const uuid = require('uuid')

@component('chart-card')
class ChartCard {
  @wired('tbody') tbody

  @on(MODEL_UPDATE)
  onModelUpdate ({
    detail: {
      currentChart,
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
      item.update(type.name)
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
