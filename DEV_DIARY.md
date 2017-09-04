# 2017-08-18

- Decided to use `uuid` for generating journal/journal-document/account-type-chart ids.

# 2017-08-20

- Creating journal-document module. This is a little hard.
- Tried to use react-native's WebView as infrastructure of moneybit-app but it seems impossible to use it because of the lack of reliable local html/js/css asset support.

# 2017-08-26

- Need to set up the default account-type-chart for English and Japanese.
  - In Japan, we have default chart of accounts for tax documents. That would be a good default of account-type-chart for Japanese users.
  - It seems very difficult to choose sensible default for English users.

# 2017-09-01

- Finally a new document has been created!

# 2017-09-04

- Next we are going to implement document selection feature.
- Application Phases
  - AppState ready
  - User ready
  - UI language ready = App ready
