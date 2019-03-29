import React, { Component } from 'react'
import { View, Text, NativeModules } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'

import { TransactionStatusIcon, CashOutIcon, CashInIcon, SenIcon } from '../../components/Icons'
import { TransactionButton } from "../../components/Buttons"
import { SendSenModal } from "../../components/SendSenModal"
import { ReceiveSenModal } from "../../components/ReceiveSenModal"
import { formatBalance, groupByDay } from '../../utils/converter'

//TODO REMOVE
import SplashScreen from 'react-native-splash-screen'


export class Transactions extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    }
  }

  constructor (props) {
    super(props)
    const { navigation } = this.props
    const showSendModal = navigation.getParam('showSendModal', false)
    const address = navigation.getParam('address', '')
    const amount = navigation.getParam('amount', '')
    this.state = {
      showSendModal,
      address,
      amount,
      showControls: true,
      showReceiveModal: false,
      transactions: {},
      balance: '0'
    }
    this.toggleSendModal = this.toggleSendModal.bind(this)
    this.toggleReceiveModal = this.toggleReceiveModal.bind(this)
  }

  async componentDidMount() {
    //TODO REMOVE
    SplashScreen.hide()
    NativeModules.MobileWallet.getBalance((err, balance) => {
      if (err) {
        console.log(err)
        alert(err)
        this.props.navigation.navigate('WalletScreen')
      } else {
        this.setState({ balance })
      }
    })
    NativeModules.MobileWallet.transactions((err, transactions) => {
      if (err) {
        console.log(err)
        alert(err)
      } else {
        console.log(transactions)
        this.setState({ transactions: transactions })
      }
    })
  }

  toggleSendModal () {
    this.setState({ showSendModal: !this.state.showSendModal })
  }

  toggleReceiveModal () {
    this.setState({ showReceiveModal: !this.state.showReceiveModal })
  }

  render () {
    const { showControls, showSendModal, transactions, showReceiveModal, balance, address, amount } = this.state
    const transactionGroups = groupByDay(transactions)
    console.log("HERE")
    console.log(transactionGroups)

    return (
      <View style={styles.container}>
        <View style={styles.wallet}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Current Balance</Text>
          </View>
          <View style={styles.amountBlock}>
            <Text style={styles.amountValue}>{formatBalance(balance)}</Text>
            <View style={{paddingLeft: 8}}>
              <SenIcon />
              <Text style={styles.amountCurrency}>sen</Text>
            </View>
          </View>
            {
              Object.keys(transactionGroups).map((transactionDay, index)=> {
                let transaction = transactionGroups[transactionDay]
                return <TransactionRow key={index} day={transactionDay} transactions={transaction} />
              })
            }
        </View>
        {showControls && (
          <View style={styles.controls}>
            <TransactionButton text="Send" handler={this.toggleSendModal} />
            <TransactionButton text="Receive" handler={this.toggleReceiveModal} />
          </View>
        )}
        <SendSenModal closeModal={this.toggleSendModal} showModal={showSendModal} address={address} amount={amount} navigation={this.props.navigation} />
        <ReceiveSenModal closeModal={this.toggleReceiveModal} showModal={showReceiveModal} />
      </View>
    )
  }
}

const TransactionRow = ({day, transactions}) => {
  return(
    <View>
      <View style={styles.date}>
        <Text style={styles.dateText}>{day}</Text>
      </View>
      { transactions.map((transaction, index) => {
        return (
          <View key={index} style={{flexDirection: 'row'}}>
            <View style={{flexDirection: 'row'}}>
              { transaction.incoming ? (<CashInIcon />) : (<CashOutIcon />)}
              <View style={{ paddingLeft: 10, width: '90%' }}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ paddingBottom: 5, paddingRight: 10, fontSize: 17, color: `${transaction.incoming ? '#07AF9A' : '#000000'}` }}>
                    {`${transaction.incoming ? '+': '-'} ${transaction.amount}`}
                  </Text>
                  <TransactionStatusIcon name={transaction.pending ? 'clock' : 'checkbox' } />
                </View>
                <View style={{borderStyle: 'solid', borderColor: '#EBEBEB', borderBottomWidth: 1}}>
                  <Text style={{fontSize: 11, color: 'rgba(0, 0, 0, 0.4)', paddingBottom: 10}}>
                    {`${transaction.address.length ? transaction.id : 'Miner Payout'}`}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )
      }) }
    </View>
  )
}

let styles = ScaledSheet.create({
  container: {
    flex: 1,
    paddingTop: '55@vs',
    alignItems: 'center',
    width: '100%',
  },
  wallet: {
    width: "90%",
  },
  header: {
    alignItems: 'center'
  },
  headerText: {
    fontSize: '34@vs'
  },
  amountBlock: {
    paddingTop: '30@vs',
    paddingBottom: '30@vs',
    borderStyle: 'solid',
    borderColor: '#EBEBEB',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%'
  },
  amountValue: {
    fontSize: '40@vs',
    lineHeight: '48@vs',
    fontWeight: '500'
  },
  date: {
    paddingTop: 10,
    paddingBottom: 10
  },
  dateText: {
    fontSize: 22
  },
  amountCurrency: {
    fontSize: '17@vs',
    paddingBottom: '10@vs',
    textTransform: 'uppercase',
    fontWeight: '500',
    color: "#666666"
  },
  controls: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    bottom: 0,
    paddingTop: '18@vs',
    paddingRight: '16@vs',
    paddingBottom: '14@vs',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    elevation:4,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: "#000000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    borderColor: "rgba(0, 0, 0, 0.1)",
    borderTopRightRadius: '25@vs',
    borderTopLeftRadius: '25@vs'
  }
})
