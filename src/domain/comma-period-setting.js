class CommaPeriodSetting {
  constructor ({ name }) {
    this.name = name
  }
}

CommaPeriodSetting['comma-period'] = new CommaPeriodSetting({ name: 'comma-period' })
CommaPeriodSetting['period-comma'] = new CommaPeriodSetting({ name: 'period-comma' })

module.exports = CommaPeriodSetting
