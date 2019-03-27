import React, { Component } from 'react'
import { View, Text, TouchableHighlight, TouchableOpacity, NativeModules, TextInput } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'

import { GoBackIcon } from "../../components/Icons"
import { CameraButton } from "../../components/Buttons"
import { HeaderText } from "../../components/TextBlocks"
import { BlueButton } from "../../components/Buttons"


const colors = {
  active: "#0045e3",
  error: "#F0374A",
  normal: "#8A8A8F"
}

export class ImportSeed extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Setup',
      headerLeft: (
        <TouchableHighlight
          underlayColor="#FFFFFF"
          onPress={() => { navigation.goBack() }}>
          <GoBackIcon />
        </TouchableHighlight>
      ),
      headerStyle: { borderBottomWidth: 0 },
      headerTitleStyle: { color: '#D3D6DC' },
    }
  }

  constructor (props) {
    super(props)
    this.state = {
      seedError: false,
      seed: ''
    }
    this.labelStyle = this.labelStyle.bind(this)
    this.scanQRCode = this.scanQRCode.bind(this)
    this.submit = this.submit.bind(this)
  }

  scanQRCode () {
    const { navigation } = this.props
    navigation.navigate('ScanQRSeed')
  }

  labelStyle () {
    const { seedError } = this.state
    return seedError ? {color: colors.error} : {}
  }

  submit () {
    const { navigation } = this.props
    const { seed } = this.state
    const password = navigation.getParam('password', '')
    NativeModules.MobileWallet.createWalletWithSeed(seed, password, (err, success) => {
      if (success) {
        navigation.navigate('Transactions')
      } else {
        this.setState({ seedError: true })
      }
    })
  }

  render () {
    const { seed, seedError } = this.state
    const labelText = seedError ? 'Seed entered is incorrect. Please try again.' : 'Enter your recovery seed phrase'
    return (
      <View style={styles.container}>
        <HeaderText text="Import Seed" />
        <View style={styles.form}>
          <View>
            <View style={styles.input}>
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={[styles.label, this.labelStyle()]}>{labelText}</Text>
                <CameraButton style={{top: '22%'}} handler={this.scanQRCode} />
              </View>
              <TextInput
                multiline={true}
                numberOfLines={4}
                autoCorrect={false}
                autoCapitalize='none'
                autoFocus={true}
                blurOnSubmit={true}
                returnKeyType='done'
                style={styles.field}
                value={seed}
                onChangeText={(seed) => this.setState({seed})}
              />
            </View>
            <Text style={styles.hint}>The seed phrase must be entered exactly.</Text>
            <Text style={styles.hint}>Alternatively you can use your mobile camera to scan the QR code in your Sentient UI About section.</Text>
          </View>
          <View style={{width: '60%', alignSelf: 'center'}}>
            <BlueButton text='Submit Seed' handler={this.submit} />
          </View>
        </View>
      </View>
    )
  }
}

let styles = ScaledSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    alignItems: 'center',
  },
  form: {
    paddingTop: '18@vs',
    width: "90%",
  },
  inputGroup: {
    paddingBottom: '20@vs'
  },
  input: {
    borderRadius: '16@s',
    backgroundColor: "#F7F8FA",
    height: '170@s'
  },
  field: {
    width: "90%",
    paddingLeft: '15@s',
    paddingTop: '18@s',
  },
  label: {
    top: '3%',
    left: 15,
    color: "#0045E3",
    fontWeight: '500',
    fontSize: '11@s',
  },
  hint: {
    paddingTop: '10@vs',
    paddingBottom: '10@vs',
    paddingLeft: '15@vs',
    paddingRight: '15@vs',
    fontSize: '13@s',
    color: "#8A8A8F"
  },
  submitButton: {
    borderRadius: '16@vs',
    backgroundColor: "#F5F5F5",
    marginTop: '16@vs',
    marginBottom: '16@vs',
    justifyContent: 'center',
    height: '56@s',
    backgroundColor: "#0045E3"
  },
  submitButtonText: {
    fontSize: '14@vs',
    textAlign: 'center',
    color: "#FFFFFF",
  }
})
