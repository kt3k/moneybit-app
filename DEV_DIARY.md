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

# 2017-09-16
- Spent many days on capsid works. renamed some APIs. Updated capsid todomvc implementation (that was hard, but interesting work). Created tool to run todomvc e2e test. The tool name is `todomvc-test` and it had some feedbacks from todomvc authors.
- In the course of renewing the implementation of capsid's todomvc, I felt that flux architecture really works for capsid. The ducks style modularization of the flux store seems working as well.
- But finally come back here!

# 2017-09-20

- Started implementing model and view connections!
- Feeling the need of some model inspection tool. Currently I use a query like `capsid.get('js-model-hub', $('.js-model-hub')[0]).user` in dev console, but this is a little bit too inconvenient.

# 2017-09-25

- Created [genel](https://npm.im/genel) utility for generating dom elements.

# 2017-09-26

- Changed sidux action/event naming policy.

# 2017-09-28

- Needing event debugger for capsid. -> done!

# 2017-10-04

- Needing big modals for small inputs

# 2017-10-08

- Modal is far harder than I expected. Lifecyclea and Data flow control of it are not trivial.
