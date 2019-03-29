
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

export class WelcomeScreen extends Component {

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
      if (success || err.message === "Wallet object already exists") {
        this.props.navigation.navigate('Transactions')
      } else {
        console.log(err.message)
        this.setState({ passwordError: true, passwordFocused: true })
      }
    })
  }

  render() {

    const { passwordFocused, walletExists, password, passwordError } = this.state

    return (
      <ImageBackground source={require('../assets/images/content-bg.png')} style={styles.backgroundImage} >
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Image source={require('../assets/images/logo.png')} style={styles.logo} resizeMode="contain" />
            <Text style={styles.logoText}>SENTIENT</Text>
          </View>
          { walletExists ? (
            passwordFocused ? (
            <KeyboardAvoidingView style={styles.buttons} behavior="padding">
              <Image resizeMode="contain" source={require('../assets/images/button-background.png')} style={{height: 56}} />
              <View style={styles.input}>
                <Text style={[styles.label, {color: passwordError ? colors.error : (passwordFocused ? colors.active : colors.normal) }]}>Enter your password</Text>
                <TextInput
                  ref={(ref) => { this.passwordInput = ref }}
                  secureTextEntry={true}
                  returnKeyType='done'
                  style={styles.field}
                  autoFocus={passwordFocused}
                  onChangeText={(password) => this.passwordChanged(password)}
                  onFocus={() => this.setState({ passwordFocused: true })}
                  value={password}
                  onSubmitEditing={() => this.signIn() }
                />
              </View>
              {passwordError && <Text style={styles.hint}>Incorrect password</Text>}
            </KeyboardAvoidingView>
            ) : (
              <View style={styles.buttons}>
                <WelcomeButton text='Enter Password' handler={()=> { this.setState({ passwordFocused: true })} } />
              </View>
            )
          ) : (
            <View style={styles.buttons}>
              <WelcomeButton text='Create a New Wallet' handler={()=> { this.props.navigation.navigate('Password')}} />
              <WelcomeButton text='Import Existing Seed' handler={()=> { this.props.navigation.navigate('Password', { workflow: "Seed" })}} />
            </View>
          ) }
        </View>
      </ImageBackground>
    )
  }
}

let styles = ScaledSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%'
  },
  container: {
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    flex: 8,
    justifyContent: 'center',
    marginTop: '100@vs'
  },
  logo: {
    marginBottom: '20@vs',
    width: '185@vs'
  },
  logoText: {
    textAlign: 'center',
    fontSize: '35@s',
    color: '#FFFFFF',
    letterSpacing: -0.21,
    marginBottom: '100@vs'
  },
  buttons: {
    flex: 5,
    width: "80%",
  },
  input: {
    flex: 1,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  field: {
    width: "100%",
    paddingLeft: '15@s',
    paddingRight: '15@s',
    paddingTop: '18@s',
  },
  hint: {
    paddingTop: '10@vs',
    paddingLeft: '15@s',
    fontSize: '13@s',
    letterSpacing: -0.08,
    color: '#F0374A'
  },
  label: {
    top: 10,
    left: 15,
    fontSize: '11@s',
    fontWeight: '700',
    color: "#0045e3"
  },
})
