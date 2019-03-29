import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, NativeModules } from 'react-native'
import Modal from "react-native-modal"
import { ScaledSheet } from 'react-native-size-matters'

import { CloseIcon } from './Icons'
import { SendSenSuccess } from './SendSenSuccess'
import { ClearButton, CameraButton } from './Buttons'
import { hastingsToSen } from '../utils/converter'


export class SendSenModal extends Component {

  constructor (props) {
    super(props)
    const { amount, address } = this.props
    this.state = {
      amount,
      address,
      showSendForm: true,
      addressFocused: false,
      amountFocused: false,
      fee: '0',
    }
    this.clearAddress = this.clearAddress.bind(this)
    this.clearAmount = this.clearAmount.bind(this)
    this.showSendForm = this.showSendForm.bind(this)
    this.scanQRCode = this.scanQRCode.bind(this)
  }

  componentDidMount () {
    NativeModules.MobileWallet.getFee((err, fee) => {
      if (err) {
        console.log(err)
        alert(err)
      } else {
        this.setState({ fee })
      }
    })
  }

  addressStyle () {
    const { address, addressFocused } = this.state
    return (addressFocused || address.length !== 0) ? styles.activeLabel : {}
  }

  amountStyle () {
    const { amount, amountFocused } = this.state
    return (amountFocused || amount.length !== 0) ? styles.activeLabel : {}
  }

  sendButtonStyle () {
    const { address, amount } = this.state
    return (address.length > 0 && amount.length > 0) ? styles.sendButton : {}
  }

  sendSen () {
    const { address, amount } = this.state
    if (!this.canSend()) {
      return
    }
    NativeModules.MobileWallet.sendSen(address, amount, (err, result) => {
      if (err) {
        console.log(err)
        alert(err.message)
      } else {
        console.log(result)
      }
    })
  }

  showSendForm () {
    this.setState({address: '', amount: '', showSendForm: true})
  }

  clearAddress () {
    this.setState({address: ''})
  }

  clearAmount () {
    this.setState({amount: ''})
  }

  canSend() {
    const { address, amount } = this.state
    return address.length === 76 && amount > 0
  }

  closeHandler () {
    const { closeModal } = this.props
    closeModal()
    this.setState({ showQRCode: false })
  }

  scanQRCode () {
    const { closeModal } = this.props
    closeModal()
    const { navigation } = this.props
    navigation.navigate('ScanQRCode')
  }

  render () {
    const { address, amount, showSendForm, fee } = this.state
    const { showModal } = this.props

    return(
      <Modal
        isVisible={showModal}
        avoidKeyboard={true}
        style={styles.modal}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Send SEN</Text>
            <TouchableOpacity style={styles.closeButton} onPress={ () => this.closeHandler() }>
              <CloseIcon />
            </TouchableOpacity>
          </View>
          { showSendForm ? (
            <View style={styles.form}>
              <View style={styles.toAddress}>
                <View style={[styles.input, styles.toAddressInput]}>
                  <Text style={[styles.label, this.addressStyle()]}>To Address</Text>
                  <TextInput
                    multiline={true}
                    numberOfLines={4}
                    autoCorrect={false}
                    autoCapitalize='none'
                    style={styles.field}
                    onFocus={() => { this.setState({addressFocused: true}) }}
                    onBlur={() => { this.setState({addressFocused: false}) }}
                    value={address}
                    onChangeText={(address) => this.setState({address})}
                  />
                </View>
                { address.length !== 0 && (<ClearButton style={{top: '30%'}} handler={this.clearAddress} />) }
                { address.length === 0 && (<CameraButton style={{top: '22%'}} handler={this.scanQRCode} />) }
                <Text style={styles.hint}>Make sure the address is correct.</Text>
              </View>
              <View style={styles.amount}>
                <View style={styles.input}>
                  <Text style={[styles.label, this.amountStyle()]}>Amount of SEN</Text>
                  <TextInput
                    autoCorrect={false}
                    style={styles.field}
                    keyboardType='numeric'
                    onFocus={() => { this.setState({amountFocused: true}) }}
                    onBlur={() => { this.setState({amountFocused: false}) }}
                    value={amount}
                    onChangeText={(amount) => this.setState({amount})}
                  />
                </View>
                { amount.length !== 0 && (<ClearButton style={{top: '22%'}} handler={this.clearAmount} />) }
                <Text style={styles.hint}>{`Estimated fee: ${fee}`}</Text>
              </View>
              <View style={{width: '100%'}}>
                <TouchableOpacity style={[styles.sendButton, (this.canSend() ? { backgroundColor: "#0045E3" } : {})]} onPress={() => this.sendSen()} >
                  <Text style={[styles.sendButtonText, (this.canSend() ? { color: "#FFFFFF" } : {})]}>Send</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <SendSenSuccess showSendForm={ this.showSendForm } />
          )}
        </View>
      </Modal>
    )
  }
}

const styles = ScaledSheet.create({
  container: {
    backgroundColor: "white",
    padding: '16@vs',
    alignItems: "center",
    borderTopRightRadius: '30@vs',
    borderTopLeftRadius: '30@vs',
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  closeButton: {
    width: 24,
    height: 24,
    borderRadius: 8,
    backgroundColor: "#000000",
    opacity: 0.3
  },
  header: {
    width: "98%",
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingTop: '15@vs',
    paddingBottom: '15@vs'
  },
  headerText: {
    fontSize: '18@vs',
  },
  toAddress: {
    width: '100%',
    position: "relative"
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  form: {
    paddingTop: '18@vs',
    width: "100%",
  },
  inputGroup: {
    paddingBottom: '20@vs'
  },
  input: {
    borderRadius: '16@s',
    backgroundColor: "#F7F8FA",
    height: '56@s'
  },
  toAddressInput: {
    height: '90@s',
  },
  field: {
    width: "90%",
    paddingLeft: '15@s',
    paddingTop: '18@s',
  },
  activeLabel: {
    top: 10,
    color: "#0045e3",
    fontSize: '11@s',
  },
  label: {
    top: '36%',
    left: 15,
    fontSize: '13@s',
    color: "rgba(0, 0, 0, 0.40)",
    fontWeight: '500',
    fontSize: '13@s',
  },
  hint: {
    paddingTop: '10@vs',
    paddingBottom: '10@vs',
    paddingLeft: '15@vs',
    paddingRight: '15@vs',
    fontSize: '12@vs',
    color: "#8A8A8F"
  },
  sendButton: {
    borderRadius: '16@vs',
    backgroundColor: "#F5F5F5",
    marginTop: '16@vs',
    marginBottom: '16@vs',
    justifyContent: 'center',
    height: '56@s'
  },
  sendButtonText: {
    fontSize: '14@vs',
    textAlign: 'center',
    color: "rgba(0, 0, 0, 0.26)",
  }
})
