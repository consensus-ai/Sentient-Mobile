import React from 'react'
import { TouchableHighlight, Text, View } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'


export const WelcomeButton = ({text, navigate}) => {
  let styles =  ScaledSheet.create({
    button:{
      position: "relative",
      padding: '16@s',
      backgroundColor:"rgba(255, 255, 255, 0.7)",
      borderRadius: '16@s',
      marginTop: '15@s'
    },
    buttonText:{
      color:'#000000',
      fontWeight: "600",
      fontSize: '15@s',
      letterSpacing: -0.24,
      textAlign:'center',
    }
  })
  return (
    <TouchableHighlight
      style={styles.button}
      onPress={navigate}
      underlayColor="rgba(255, 255, 255, 0.5)">
        <Text style={styles.buttonText}>{text}</Text>
    </TouchableHighlight>
  )
}

export const BlueButton = ({text, handler}) => {
  let styles =  ScaledSheet.create({
    button:{
      padding: '18@vs',
      backgroundColor: "#0045E3",
      borderRadius: '16@s',
    },
    buttonText:{
      color:'#FFFFFF',
      fontWeight: "700",
      fontSize: '15@s',
      textAlign:'center',
    }
  })
  return (
    <View style={{paddingTop: 15}}>
      <TouchableHighlight
        style={styles.button}
        onPress={handler}
        underlayColor='#0045E2'>
          <Text style={styles.buttonText}>{text}</Text>
      </TouchableHighlight>
    </View>
  )
}
