const {
  capsid: {
    component,
    on,
    emits
  },
  actions: {
    CREATE_TRADE
  }
} = require('~')

@component('js-new-item-card')
export default class NewItemCard {
  @on('click', { at: '.new-item-save-button' })
  @emits(CREATE_TRADE)
  onCreateNewTrade () {
    return {
      date: '2017-12-15',
      desc: '売上12月分',
      dr: {
        '売上': 100000
      },
      cr: {
        '現金': 100000
      }
    }
  }
}
