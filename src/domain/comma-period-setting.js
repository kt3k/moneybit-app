class CommaPeriodSetting {
  constructor ({ name }) {
    this.name = name
  }
}

CommaPeriodSetting.CommaPeriod = new CommaPeriodSetting({ name: 'comma-period' })
CommaPeriodSetting.PeriodComma = new CommaPeriodSetting({ name: 'period-comma' })

module.exports = CommaPeriodSetting
