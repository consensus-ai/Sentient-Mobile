import React, { Component } from 'react'
import { View, TouchableHighlight } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'

import { GoBackIcon, GoNextIcon } from "../../components/Icons"
import { HeaderText, DescriptionText } from "../../components/TextBlocks"


export class UserWarning extends Component {
  static navigationOptions = ({ navigation }) => {
    const seed = navigation.getParam('seed', [])
    return {
      headerTitle: 'New Wallet',
      headerLeft: (
        <TouchableHighlight
          underlayColor="#FFFFFF"
          onPress={() => { navigation.goBack() }}>
          <GoBackIcon />
        </TouchableHighlight>
      ),
      headerRight: (
        <TouchableHighlight
          underlayColor="#FFFFFF"
          onPress={() => { navigation.navigate('ValidateSeed', { seed }) }}>
          <GoNextIcon />
        </TouchableHighlight>
      ),
      headerStyle: { borderBottomWidth: 0 }
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <HeaderText text="Important!" />
        <DescriptionText text="Your seed is the only way to restore your wallet. If you delete this application or install the wallet software on another machine, you will be able to recover your wallet using this phrase. DO NOT LOSE THIS PHRASE. You will not be able to recover it by any other means." />
        <DescriptionText text="Please click back to review your phrase again, and make sure you’ve written it down correctly. DO NOT SHARE your phrase with anyone." />
      </View>
    )
  }
}

let styles = ScaledSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  }
})