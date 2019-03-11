import React, { Component } from 'react'
import { View, Text, TouchableHighlight } from "react-native"
import { ScaledSheet } from 'react-native-size-matters'

import { GoBackIcon } from "../../components/Icons"


export class Error extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Oops, error',
      headerLeft: (
        <TouchableHighlight
          underlayColor="#FFFFFF"
          onPress={() => { navigation.goBack() }}>
          <GoBackIcon />
        </TouchableHighlight>
      ),
      headerStyle: { borderBottomWidth: 0 }
    }
  }

  constructor(props) {
    super(props)
  }

  render() {
    const { navigation } = this.props
    const header = navigation.getParam('header', '')
    const message = navigation.getParam('message', '')
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{header}</Text>
        <Text style={styles.text}>{message}</Text>
      </View>
    )
  }
}

let styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: '20@s',
    textAlign: 'center',
    color: "#F0374A"
  }
})