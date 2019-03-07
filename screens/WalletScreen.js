import React, { Component, Fragment } from 'react'
import { View, Text, ImageBackground, Image, NativeModules } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import SplashScreen from 'react-native-splash-screen'


import { WelcomeButton } from '../components/Buttons'

export class WalletScreen extends Component {

  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props)
    this._bootstrap()
    this.state = {
      walletExists: false
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

  render() {

    const { walletExists } = this.state

    return (
      <Fragment>
        {walletExists && (
          <View style={[styles.container, {justifyContent: 'center'}]}>
            <Text>Hello</Text>
          </View>
        )}
        {!walletExists && (
          <ImageBackground source={require('../assets/images/content-bg.png')} style={styles.backgroundImage} >
            <View style={styles.container}>
              <Image source={require('../assets/images/icon.png')} style={styles.logo}/>
              <View style={styles.buttons}>
                <WelcomeButton text='Create a New Wallet' navigate={()=> { this.props.navigation.navigate('Password')}} />
                <WelcomeButton text='Import Existing Seed' navigate={()=> { this.props.navigation.navigate('Password', {workflow: "Seed"})}} />
              </View>
            </View>
          </ImageBackground>
        )}
      </Fragment>
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
  }
})
