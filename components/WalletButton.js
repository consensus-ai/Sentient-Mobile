import React from 'react'
import { TouchableHighlight, Text } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'


export const WalletButton = ({text, navigate}) => (
  <TouchableHighlight
    style={styles.button}
    onPress={navigate}
    underlayColor='"rgba(0, 0, 0, 0.4)"'>
      <Text style={styles.buttonText}>{text}</Text>
  </TouchableHighlight>

)

const styles =  ScaledSheet.create({
  button:{
    position: "relative",
    padding: '16@s',
    backgroundColor:"rgba(0, 0, 0, 0.2)",
    borderRadius: '16@s',
    marginTop: '15@s'
  },
  buttonText:{
    color:'#FFFFFF',
    fontWeight: "600",
    fontSize: '15@s',
    letterSpacing: -0.24,
    textAlign:'center',
  }
})