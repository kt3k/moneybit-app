const {
  actions: { MODEL_UPDATE }
} = require('~')

const { component, wire, on } = capsid
const genel = require('genel')

@component
class ChartCard {
  @wire.el('tbody')
  get tbody () {}

  @on(MODEL_UPDATE)
  onModelUpdate ({
    detail: {
      defaultChart,
      domain: { MajorAccountType }
    }
  }) {
    const majorType = MajorAccountType[this.el.getAttribute('type')]

    if (!majorType) {
      throw new Error(`no such type: "${this.el.getAttribute('type')}"`)
    }

    this.tbody.innerHTML = ''

    defaultChart.getAccountTypesByMajorType(majorType).forEach(type => {
      this.tbody.appendChild(genel.tr`<td><a href="#">${type.name}</a></td>`)
    })
  }
}

module.exports = ChartCard
