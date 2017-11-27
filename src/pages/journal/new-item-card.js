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
    }
  }
}
