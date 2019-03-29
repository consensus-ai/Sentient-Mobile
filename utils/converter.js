import BigNumber from 'bignumber.js'
import moment from 'moment'
import { groupBy } from 'lodash'

BigNumber.config({ EXPONENTIAL_AT: 1e+9 })
BigNumber.config({ DECIMAL_PLACES: 30 })

const hastingsPerSen = new BigNumber('10').toPower(24)

export const hastingsToSen = (hastings) => {
  hastings = new BigNumber(hastings).dividedBy(hastingsPerSen)
  return hastings.times(1e3).round(8).toString()
}

export const formatBalance = (balance) => {
  return balance.replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
}

export const groupByDay = (transactions) => {
  if (!transactions.length) {
    return {}
  }
  return groupBy(transactions, (transaction) => {
    const currentDay = moment.unix(Date.now()).startOf('day')
    const transactionDay = moment.unix(transaction.stamp).startOf('day')
    return currentDay === transactionDay ? "Today" : transactionDay.format('DD MMMM')
  })
}