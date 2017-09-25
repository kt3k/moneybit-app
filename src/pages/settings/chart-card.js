const { MODEL_UPDATE } = require('../../app/action-types')
const { component, wire, on } = capsid
const genel = require('genel')

@component
class ChartCard {
  @wire.el('table') get table () {}

  @on(MODEL_UPDATE)
  onModelUpdate ({ detail: { currentChart, domain: { MajorAccountType } } }) {
    const majorType = MajorAccountType[this.el.getAttribute('type')]

    if (!majorType) {
      throw new Error(`no such type: "${this.el.getAttribute('type')}"`)
    }

    this.table.innerHTML = ''

    currentChart.getAccountTypesByMajorType(majorType).forEach(type => {
      this.table.appendChild(genel.tr`<td><a href="#">${type.name}</a></td>`)
    })
  }
}

module.exports = ChartCard
