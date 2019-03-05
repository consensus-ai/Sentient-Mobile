import React, { Component } from 'react'
import { View, Text, ImageBackground } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'

import { WelcomeButton } from '../components/Buttons'

export class Wallet extends Component {

  static navigationOptions = {
    header: null
  }

  render() {
    return (
      <ImageBackground source={require('../assets/images/content-bg.png')} style={styles.backgroundImage} >
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Welcome to Sentient Wallet</Text>
            <Text style={styles.text}>The Capital City Farmers' Market is one of the jewels in the crown of Montpelier's{"\n"} downtown. Over 50 vendors gather each{"\n"} Saturday to sell locally-grown and handmade products, unique to Vermont and astounding in quality.</Text>
          </View>
          <View style={styles.buttons}>
            <WelcomeButton text='Create a New Wallet' navigate={()=> { this.props.navigation.navigate('Password')}} />
            <WelcomeButton text='Import Existing Seed' navigate={()=> { this.props.navigation.navigate('Password', {workflow: "Seed"})}} />
          </View>
        </View>
      </ImageBackground>
    );
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
    alignItems: 'center',
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
    color: "#FFFFFF"
  },
  text: {
    marginTop: '16@s',
    textAlign: "center",
    fontSize: '15@s',
    lineHeight: 20,
    letterSpacing: -0.24,
    color: "#FFFFFF",
  }
});
