const { make } = require('capsid')
const genel = require('genel')
const { describe, beforeEach, it } = require('kocha')
const { OPEN_SUBLEDGER_MODAL } = require('../../bs-page')
const {
  AccountType,
  Language,
  MajorAccountType,
  Journal,
  AccountTypeChart
} = require('../../../../domain')
const moment = require('moment')
require('../subledger-modal')

const journalFactory = new Journal.Factory()

describe('subledger-modal', () => {
  let el

  beforeEach(() => {
    el = genel.div`
      <div class="card">
        <div class="card-content">
          <div class="contents">
            <h2 class="subtitle"><t>domain.title</t></h2>
            <h1 class="account-title title"></h1>
            <hr />
            <div class="subledger-modal__month-list"></div>
          </div>
        </div>
        <div class="card-footer">
          <a class="card-footer-item close-button"><t>ui.close</t></a>
        </div>
      </div>
    `
    make('subledger-modal', el)
  })

  describe('on OPEN_SUBLEDGER_MODAL', () => {
    it('renders subledger in ui', () => {
      const journal = journalFactory.createFromArray([
        {
          id: 1,
          date: '2018-01-01',
          desc: 'Initial account',
          dr: {
            'Cash at Bank': 2300000
          },
          cr: {
            "Owner's Capital": 2300000
          }
        },
        {
          id: 2,
          date: '2018-01-03',
          desc: '',
          dr: {
            Drawings: 100000
          },
          cr: {
            'Cash at Bank': 100000
          }
        },
        {
          id: 3,
          date: '2018-01-02',
          desc: '',
          dr: {
            Drawings: 100000
          },
          cr: {
            'Cash at Bank': 100000
          }
        },
        {
          id: 4,
          date: '2018-01-02',
          desc: '',
          dr: {
            Drawings: 100000
          },
          cr: {
            'Cash at Bank': 100000
          }
        }
      ])
      const ledger = journal.toLedger(
        AccountTypeChart.defaults[Language.EN.code]
      )
      const accountType = new AccountType('Cash at Bank')

      el.dispatchEvent(
        new CustomEvent(OPEN_SUBLEDGER_MODAL, {
          detail: {
            accountType,
            majorAccountType: MajorAccountType.ASSET,
            subledger: ledger.getSubledgerByAccountType(accountType),
            months: [
              moment('2018-01-01'),
              moment('2018-02-01'),
              moment('2018-03-01'),
              moment('2018-04-01'),
              moment('2018-05-01'),
              moment('2018-06-01'),
              moment('2018-07-01'),
              moment('2018-08-01'),
              moment('2018-09-01'),
              moment('2018-10-01'),
              moment('2018-11-01'),
              moment('2018-12-01')
            ]
          }
        })
      )
    })

    it('renders empty subledger', () => {
      el.dispatchEvent(
        new CustomEvent(OPEN_SUBLEDGER_MODAL, {
          detail: {
            accountType: new AccountType('Cash at Bank'),
            majorAccountType: MajorAccountType.ASSET,
            subledger: { accounts: [] },
            months: [
              moment('2018-01-01'),
              moment('2018-02-01'),
              moment('2018-03-01'),
              moment('2018-04-01'),
              moment('2018-05-01'),
              moment('2018-06-01'),
              moment('2018-07-01'),
              moment('2018-08-01'),
              moment('2018-09-01'),
              moment('2018-10-01'),
              moment('2018-11-01'),
              moment('2018-12-01')
            ]
          }
        })
      )
    })
  })
})
