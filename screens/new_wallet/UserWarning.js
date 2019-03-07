import React, { Component } from 'react'
import { View, Text, TouchableHighlight } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'

import { GoBackIcon, GoNextIcon } from "../../components/Icons"
import { HeaderText, DescriptionText } from "../../components/TextBlocks"


export class UserWarning extends Component {
  static navigationOptions = ({ navigation }) => {
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
          onPress={() => { navigation.navigate('ValidateSeed') }}>
          <GoNextIcon />
        </TouchableHighlight>
      ),
      headerStyle: { borderBottomWidth: 0 }
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <HeaderText text="Header here" />
        <DescriptionText text="Description here." />
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