import React, { Component } from 'react'
import { View, Text, ImageBackground, TextInput, Image, NativeModules, KeyboardAvoidingView } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import SplashScreen from 'react-native-splash-screen'


import { WelcomeButton } from '../components/Buttons'

const colors = {
  active: "#0045e3",
  error: "#F0374A",
  normal: "#8A8A8F"
}

export class WalletScreen extends Component {

  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props)
    this._bootstrap()
    this.state = {
      walletExists: false,
      passwordFocused: false,
      passwordError: false,
      password: ''
    }
  }

  _bootstrap () {
    NativeModules.MobileWallet.walletExists((err, walletExists) => {
      this.setState({walletExists})
    })
  }

  componentDidMount() {
    SplashScreen.hide()
  }

  passwordChanged (password) {
    this.setState({ password })
  }

  signIn () {
    const { password } = this.state
    NativeModules.MobileWallet.openWalletWithPassword(password, (err, success) => {
      if (success) {
        this.props.navigation.navigate('Transactions')
      } else {
        console.log(err)
        this.setState({ passwordError: true })
      }
    })
  }

  render() {

    const { passwordFocused, walletExists, password, passwordError } = this.state

    return (
      <ImageBackground source={require('../assets/images/content-bg.png')} style={styles.backgroundImage} >
        <View style={styles.container}>
          <Image source={require('../assets/images/icon.png')} style={styles.logo} />
          { walletExists && (
            <KeyboardAvoidingView style={styles.buttons}   behavior="padding">
              <View style={styles.input}>
                <Text style={[styles.label, {color: passwordError ? colors.error : (passwordFocused ? colors.active : colors.normal) }]}>Enter your password</Text>
                <TextInput
                  ref={(ref) => { this.passwordInput = ref }}
                  secureTextEntry={true}
                  returnKeyType='done'
                  style={styles.field}
                  onChangeText={(password) => this.passwordChanged(password)}
                  onFocus={() => this.setState({ passwordFocused: true })}
                  onBlur={() => { this.setState({ passwordFocused: false }) }}
                  value={password}
                  onSubmitEditing={() => this.signIn() }
                />
              </View>
              {passwordError && <Text style={styles.hint}>Incorrect password</Text>}
            </KeyboardAvoidingView>
          )}
          { !walletExists && (
            <View style={styles.buttons}>
              <WelcomeButton text='Create a New Wallet' navigate={()=> { this.props.navigation.navigate('Password')}} />
              <WelcomeButton text='Import Existing Seed' navigate={()=> { this.props.navigation.navigate('Password', { workflow: "Seed" })}} />
            </View>
          )}
        </View>
      </ImageBackground>
    )
  }
}

let styles = ScaledSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
  },
  container: {
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    marginBottom: '100@vs'
  },
  header: {
    marginTop: '180@s',
    width: "88%",
    alignItems: 'center',
  },
  buttons: {
    position: 'absolute',
    bottom: '50@s',
    width: "80%",
  },
  title:{
    fontSize: '22@s',
    color: "#000"
  },
  text: {
    marginTop: '16@s',
    textAlign: "center",
    fontSize: '15@s',
    lineHeight: 20,
    letterSpacing: -0.24,
    color: "#000",
  },
  input: {
    position: 'relative',
    borderRadius: '16@s',
    backgroundColor: "#F7F8FA",
    height: '56@s'
  },
  field: {
    width: "100%",
    paddingLeft: '15@s',
    paddingRight: '15@s',
    paddingTop: '18@s',
  },
  label: {
    top: 10,
    left: 15,
    fontSize: '11@s',
    fontWeight: '700',
    color: "#0045e3"
  },
})
