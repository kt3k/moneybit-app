const { MODEL_UPDATE } = require('../../app/action-types')
const { component, wire, on } = capsid
const genel = require('genel')

@component
class ChartCard {
  @wire.el('ul') get list () {}

  @on(MODEL_UPDATE)
  onModelUpdate ({ detail: { currentChart, domain: { MajorAccountType } } }) {
    const majorType = MajorAccountType[this.el.getAttribute('type')]

    if (!majorType) {
      throw new Error(`no such type: "${this.el.getAttribute('type')}"`)
    }

    this.list.innerHTML = ''

    currentChart.getAccountTypesByMajorType(majorType).forEach(type => {
      const li = genel.li`<a href="#">${type.name}</a>`
      this.list.appendChild(li)
    })
  }
}

module.exports = ChartCard
