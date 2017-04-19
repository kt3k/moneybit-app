# Document
- id: string
- name: string
- journal: Journal
- chart: AccountTypeChart
- currency: Currency
- start: moment
- end: moment
- commaPeriod: CommaPeriodSetting

# CommaPeriodSetting
- name: string

# Currency
- name: string
- code: string
- symbol: string

# User
- id: string
- documentIds: string[]
- documentNames: Object<string>
- settings: UserSettings

# UserSettings
- language: Language
- defaultChart: AccountTypeChart

# Language
- name: string
