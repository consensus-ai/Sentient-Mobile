import React, { Component } from 'react'
import { View, Text, NativeModules } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'

import { WalletIcon, TransactionStatusIcon, CashOutIcon, CashInIcon } from '../../components/Icons'
import { TransactionButton } from "../../components/Buttons"
import { SendSenModal } from "../../components/SendSenModal"
import { ReceiveSenModal } from "../../components/ReceiveSenModal"
import { formatBalance } from '../../utils/converter'

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
    this.state = {
      showControls: true,
      showSendModal: false,
      showReceiveModal: false,
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
      console.log(err)
      console.log(transactions)
    })
  }

  toggleSendModal () {
    this.setState({ showSendModal: !this.state.showSendModal })
  }

  toggleReceiveModal () {
    this.setState({ showReceiveModal: !this.state.showReceiveModal })
  }

  render () {
    const { showControls, showSendModal, showReceiveModal, balance } = this.state

    return (
      <View style={styles.container}>
        <View style={styles.wallet}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Wallet</Text>
            <WalletIcon />
          </View>
          <View style={styles.amountBlock}>
            <Text style={styles.amountValue}>{formatBalance(balance)}</Text>
            <Text style={styles.amountCurrency}>sen</Text>
          </View>
          <View>
            <View style={styles.date}>
              <Text style={styles.dateText}>Today</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={{flexDirection: 'row'}}>
                <CashOutIcon />
                <View style={{ paddingLeft: 10, width: '90%' }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ paddingBottom: 5, paddingRight: 10, fontSize: 17, color: '#07AF9A' }}>
                      +1 600
                    </Text>
                    <TransactionStatusIcon name='clock' />
                  </View>
                  <View style={{borderStyle: 'solid', borderColor: '#EBEBEB', borderBottomWidth: 1}}>
                    <Text style={{fontSize: 11, color: 'rgba(0, 0, 0, 0.4)', paddingBottom: 10}}>
                      e6dccb74854fad6bef3492ddb4f7816a6baf328ee7918216635ccc9b6407a8a4
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
        {showControls && (
          <View style={styles.controls}>
            <TransactionButton text="Send" handler={this.toggleSendModal} />
            <TransactionButton text="Receive" handler={this.toggleReceiveModal} />
          </View>
        )}
        <SendSenModal closeModal={this.toggleSendModal} showModal={showSendModal} navigation={this.props.navigation} />
        <ReceiveSenModal closeModal={this.toggleReceiveModal} showModal={showReceiveModal} />
      </View>
    )
  }
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
    justifyContent: 'space-between',
    flexDirection: 'row'
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
    justifyContent: 'center',
    width: '100%'
  },
  amountValue: {
    fontSize: '40@vs',
    lineHeight: '48@vs',
    fontWeight: '500'
  },
  date: {
    paddingTop: 10, paddingBottom: 10
  },
  dateText: {
    fontSize: 22
  },
  amountCurrency: {
    fontSize: '17@vs',
    paddingTop: '22@vs',
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
