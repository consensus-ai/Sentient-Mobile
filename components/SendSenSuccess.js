import React from 'react'
import { View, Text, TouchableHighlight, Image } from 'react-native'

export const SendSenSuccess = ({showSendForm}) => {
  return(
    <View style={{alignItems: 'center'}}>
      <View style={{padding: 20}}>
        <Image source={require('../assets/images/send-success.png')}/>
        <Text style={{textAlign: 'center'}}>successfully!</Text>
      </View>
      <View style={{width: '100%'}}>
        <TouchableHighlight style={{paddingTop: 40, paddingBottom: 40}} onPress={() => { showSendForm() }}>
          <Text style={{color: '#0045E3', fontSize: 17, lineHeight: 22, letterSpacing: -0.41}}>Want to send again?</Text>
        </TouchableHighlight>
      </View>
    </View>
  )
}