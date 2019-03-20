import React, { Component } from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import QRCodeScanner from 'react-native-qrcode-scanner'


export class ScanQRCode extends Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props)
    this.onSuccess = this.onSuccess.bind(this)
  }

  onSuccess(e) {
    alert(e.data)
  }

  render () {
    return (
      <QRCodeScanner
        onRead={this.onSuccess}
        topContent={
          <Text style={styles.centerText}>
            Go to <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on your computer and scan the QR code.
          </Text>
        }
        bottomContent={
          <Text style={styles.buttonText}>OK. Got it!</Text>
        }
      />
    )
  }
}

let styles = ScaledSheet.create({
  button: {
    right: 10,
    top: "22%",
    position: 'absolute',
    width: 24,
    height: 24
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
})