import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableHighlight } from 'react-native'

import { WalletIcon } from '../../components/Icons'

export class Transactions extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      // headerTitle: 'Wallet',
      // headerLeft: null,
      // headerStyle: { borderBottomWidth: 0 }
      header: null
    }
  }

  constructor (props) {
    super(props)
  }

  render () {

    return (
      <View style={styles.container}>
        <View style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row'}}>
          <Text style={{fontSize: 34}}>Wallet</Text>
          <WalletIcon />
        </View>
        <View style={{paddingTop: 4,
                borderStyle: 'solid',
                borderColor: '#EBEBEB',
                borderBottomWidth: 1,
                }}>
          <Text style={{fontSize: 28, lineHeight: 10, fontWeight: '700'}}>328 000, 002</Text>
          <Text style={{fontSize: 17, textTransform: 'uppercase',  fontWeight: '700', color: "#666666"}}>
                sen</Text>
        </View>
        <View style={{marginTop: 20}}>
          <Text style={{fontSize: 22}}>Today</Text>
        </View>
      </View>
    )
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 55,
    alignSelf: 'center',
    width: '90%',
  },
  
})
