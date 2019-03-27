import React, { Component } from 'react'
import { View, Text, AsyncStorage, TouchableHighlight, ScrollView, Dimensions, Clipboard, TextInput, NativeModules } from 'react-native'
import Modal from "react-native-modal"
import { ScaledSheet, verticalScale } from 'react-native-size-matters'
import QRCode from 'react-native-qrcode'

import { CloseIcon, AddressIcon } from './Icons'


export class ReceiveSenModal extends Component {

  constructor (props) {
    super(props)
    this.state = {
      showQRCode: false,
      address: '',
      amountFocused: false,
      amount: '',
      addressesFromStorage: []
    }
    this.inputs = {}
  }

  async getAddresses() {
    try {
      let addressesFromStorage = await AsyncStorage.getItem('@SentientMobile:addresses')
      addressesFromStorage = addressesFromStorage && JSON.parse(addressesFromStorage) || []
      this.setState({addressesFromStorage})
    } catch (error) {
      console.log("Error retrieving data" + error);
    }
  }

  async componentDidMount() {
    this.getAddresses()
  }

  createAddress () {
    NativeModules.MobileWallet.makeNewAddress((err, address) => {
      if (err) {
        console.log(err)
        alert(err.message)
      } else {
        let addrs = this.state.addressesFromStorage
        let addressPayload = {
          name: `New Address ${addrs.length + 1}`,
          address: address
        }
        addrs.unshift(addressPayload)
        this.saveKey(addrs)
        this.setState({addressesFromStorage: addrs})
      }
    })
  }

  handleOnScroll = (event) => {
    this.setState({
      scrollOffset: event.nativeEvent.contentOffset.y,
    })
  }

  handleScrollTo = (p) => {
    if (this.scrollViewRef) {
      this.scrollViewRef.scrollTo(p)
    }
  }

  generateQR (address) {
    this.setState({
      address,
      showQRCode: true
    })
  }

  amountStyle () {
    const { amount, amountFocused } = this.state
    return (amountFocused || amount.length !== 0) ? styles.activeLabel : {}
  }

  async copyToClickboard () {
    await Clipboard.setString(this.state.address)
    alert('Address is Copied to Clipboard!')
  }

  async saveKey(value) {
    try {
      await AsyncStorage.setItem('@SentientMobile:addresses', JSON.stringify(value))
    } catch (error) {
      console.log("Error saving data" + error)
    }
  }

  onChangeHandler(text, address, index) {
    this.setState((prevState) => {
      let addresses = prevState.addressesFromStorage
      addresses[index].name = text
      this.saveKey(addresses)
      return { addressesFromStorage: addresses }
    })
  }

  closeHandler () {
    const { closeModal } = this.props
    closeModal()
    this.setState({ showQRCode: false })
  }

  render () {
    const { height } = Dimensions.get('window')
    const { showModal } = this.props
    const { showQRCode, address, amount, addressesFromStorage } = this.state

    return(
      <Modal
        isVisible={showModal}
        avoidKeyboard={true}
        style={styles.modal}
        scrollTo={this.handleScrollTo}
        scrollOffset={this.state.scrollOffset}
        scrollOffsetMax={ height - 150 }
        scrollEventThrottle={16}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Receive SEN</Text>
            <TouchableHighlight style={styles.closeButton} onPress={() => this.closeHandler()} >
              <CloseIcon />
            </TouchableHighlight>
          </View>
          <View style={styles.addresses}>
            {!showQRCode ? (
              <ScrollView
                  ref={ref => (this.scrollViewRef = ref)}
                  onScroll={this.handleOnScroll}
                >
                { addressesFromStorage.map(({address, name}, index) => {
                  return (
                    <View key={address} style={[styles.addressRow, (addressesFromStorage.length === (index + 1) ? {paddingBottom: verticalScale(80)} : {})]}>
                      <View style={{flexDirection: 'row'}}>
                        <TouchableHighlight
                          underlayColor='#FFFFFF'
                          onPress={() => { this.generateQR(address) }}
                          >
                          <AddressIcon />
                        </TouchableHighlight>
                        <View style={{ paddingLeft: 10, width: '90%' }}>
                          <View>
                            <TextInput
                              ref={ input => {
                                this.inputs[index] = input
                              }}
                              style={{ paddingBottom: 5, paddingRight: 10, fontSize: 17 }}
                              autoCorrect={false}
                              onChangeText={(text) => this.onChangeHandler(text, address, index)}
                              value={name}
                              onFocus={()=> this.inputs[index].clear() } />
                          </View>
                          <TouchableHighlight style={{borderStyle: 'solid', borderColor: '#EBEBEB', borderBottomWidth: 1}} onPress={() => { this.generateQR(address) }}>
                            <Text style={{fontSize: 11, color: 'rgba(0, 0, 0, 0.4)', paddingBottom: 10}}>{address}</Text>
                          </TouchableHighlight>
                        </View>
                      </View>
                    </View>
                  )
                })}
              </ScrollView>
            ) : (
              <View style={styles.QRCodeBlock}>
                <View style={styles.QRCode}>
                  <QRCode
                    value={JSON.stringify({address: address, amount: amount})}
                    size={verticalScale(130)}
                    bgColor='#000000'
                    fgColor='#FFFFFF'
                  />
                </View>
                <Text style={styles.addressText}>{address}</Text>
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
                </View>
              </View>
            )}
          </View>
            <View style={{width: '100%', position: "absolute", bottom: 15}}>
              <TouchableHighlight style={[styles.button, { backgroundColor: "#0045E3" }]} onPress={() => showQRCode ? this.copyToClickboard() : this.createAddress() } >
                <Text style={[styles.buttonText, { color: "#FFFFFF" }]}>{showQRCode ? 'Copy Address to Clipboard' : 'Create a New Address'}</Text>
              </TouchableHighlight>
            </View>
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
  addressRow: {
    paddingTop: '18@vs',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  addresses: {
    height: '400@vs',
    width: "100%",
  },
  button: {
    borderRadius: '16@vs',
    backgroundColor: "#F5F5F5",
    marginTop: '16@vs',
    marginBottom: '16@vs',
    justifyContent: 'center',
    height: '56@s'
  },
  buttonText: {
    fontSize: '14@vs',
    textAlign: 'center',
    color: "rgba(0, 0, 0, 0.26)",
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
  input: {
    borderRadius: '16@s',
    backgroundColor: "#F7F8FA",
    height: '56@s'
  },
  amount: {
    paddingTop: '10@vs',
  },
  QRCodeBlock: {
    justifyContent: 'center',
    alignContent: 'center'
  },
  QRCode: {
    alignContent: 'center',
    alignSelf: 'center',
    paddingBottom: '10@vs',
    paddingTop: '10@vs',
  },
  addressText: {
    paddingLeft: 15,
    paddingRight: 15,
    fontSize: '11@vs',
    fontFamily: 'AvenirNext-Medium',
    color: "rgba(0, 0, 0, 0.4)",
    letterSpacing: 0.18
  }
})
