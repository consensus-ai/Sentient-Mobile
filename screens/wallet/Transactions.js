import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableHighlight } from 'react-native'

import { WalletIcon, ClockIcon, CashOutIcon, CashInIcon } from '../../components/Icons'


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
        <View style={{ paddingTop: 30, paddingBottom: 50, borderStyle: 'solid', borderColor: '#EBEBEB', borderBottomWidth: 1, flexDirection: 'row'}}>
          <Text style={{ fontSize: 48, lineHeight: 48, fontWeight: '500'}}>328 000, 002</Text>
          <Text style={{fontSize: 17, paddingTop: 30, textTransform: 'uppercase',  fontWeight: '500', color: "#666666"}}>
                sen</Text>
        </View>
        <View style={{marginTop: 20}}>
          <Text style={{fontSize: 22}}>Today</Text>
        </View>
        <View style={{display: 'flex', alignItems: 'center'}}>
          <View style={{marginRight: 15, fontSize: 32, textAlign: 'center'}}>
            <View style={{flex: 1, minWidth: 0, padding: 16, borderStyle: 'solid', borderColor: '#EBEBEB', borderBottomWidth: 1}}>
              <CashInIcon />
              <Text style={{margin: 0, marginBottom: 5, fontSize: 17,
                        fontWeight: '700', color: '#07AF9A'}}>
                +1600
                <ClockIcon />
              </Text>
              <Text style={{margin: 0, flex: 1, flexWrap: 'wrap'}}>
                e6dccb74854fad6bef3492ddb4f7816a6baf328ee7918216635ccc9b6407a8a4
              </Text>
            </View>
          </View>
        </View>
        <View style={{display: 'flex',  justifyContent: 'space-between',
                flexDirection: 'row',
              alignItems: 'center',
              position: 'absolute',
              width: '100%',
              bottom: 0,
              paddingTop: 18,
              paddingRight: 16,
              paddingBottom: 14,
              backgroundColor: 'rgba(255, 255, 0, 0.8)',
              borderTopRightRadius: 25,
              borderTopLeftRadius: 25}}>
          <TouchableHighlight style={{
            paddingLeft: 30,
            paddingRight: 30,
            paddingTop: 14,
            paddingBottom: 14,
            marginLeft: 20,
            width: '40%',
            backgroundColor: '#0045E3',
            borderRadius: 16}}>
                  <Text style={{textAlign: 'center', color: '#ffffff', fontSize: 15, fontWeight: '700'}}>
                  Send</Text>
          </TouchableHighlight>
          <TouchableHighlight style={{
                  paddingLeft: 30,
                  paddingRight: 30,
                  paddingTop: 14,
                  paddingBottom: 14,
                  marginLeft: 20,
                  width: '40%',
                  backgroundColor: '#0045E3',
                  borderRadius: 16}}>
                  <Text style={{textAlign: 'center', color: '#ffffff', fontSize: 15, fontWeight: '700'}}>
                  Receive</Text>
          </TouchableHighlight>
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
    width: '100%',
  },
})
