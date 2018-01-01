class CommaPeriodSetting {
  constructor ({ name, delimiter, decimalPoint }) {
    this.name = name
    this.delimiter = delimiter
    this.decimalPoint = decimalPoint
  }

  /**
   * Formats the given number to the appropriate format.
   * @param {number} num
   * @return {string}
   */
  format (num) {
    return num
      .toString()
      .split(/(?=(?:\d{3})+$)/)
      .join(this.delimiter)
  }
}

CommaPeriodSetting['comma-period'] = new CommaPeriodSetting({
  name: 'comma-period',
  delimiter: ',',
  decimalPoint: '.'
})
CommaPeriodSetting['period-comma'] = new CommaPeriodSetting({
  name: 'period-comma',
  delimiter: '.',
  decimalPoint: ','
})

module.exports = CommaPeriodSetting
