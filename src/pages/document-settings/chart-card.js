const {
  actions: { MODEL_UPDATE }
} = require('~')
const { component, wired, on } = capsid
const genel = require('genel')

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
      this.tbody.appendChild(genel.tr`<td>${type.name}</td>`)
    })
  }
}

module.exports = ChartCard
