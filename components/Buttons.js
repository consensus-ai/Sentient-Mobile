import React from 'react'
import { TouchableHighlight, TouchableOpacity, Text, View, Image } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'

import { ClearIcon, CameraIcon } from './Icons'


export const WelcomeButton = ({text, handler}) => {
  let styles =  ScaledSheet.create({
    button:{
      flex: 1,
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent'
    },
    touchable: {
      marginBottom: '13@vs',
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText:{
      color:'#FFFFFF',
      fontSize: '15@s',
      letterSpacing: -0.24,
      textAlign:'center',
      fontWeight: '500',
    }
  })
  return (
      <TouchableOpacity
        style={styles.touchable}
        onPress={handler}
        activeOpacity={0.90}>
        <Image resizeMode="contain" source={require('../assets/images/button-background.png')} style={{width: '95%'}} />
        <View style={styles.button}>
          <Text style={styles.buttonText}>{text}</Text>
        </View>
      </TouchableOpacity>
  )
}

export const BlueButton = ({text, handler}) => {
  let styles =  ScaledSheet.create({
    button:{
      padding: '10@vs',
      backgroundColor: "#0045E3",
      borderRadius: '16@s',
    },
    buttonText:{
      color:'#FFFFFF',
      fontSize: '15@s',
      textAlign:'center',
      fontWeight: '500',
      letterSpacing: -0.24,
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

export const TransactionButton = ({text, handler}) => {
  let styles = ScaledSheet.create({
    button: {
      paddingLeft: '30@vs',
      paddingRight: '30@vs',
      paddingTop: '14@vs',
      paddingBottom: '14@vs',
      marginLeft: 20,
      width: '40%',
      backgroundColor: '#0045E3',
      borderRadius: '16@s',
    },
    buttonText: {
      color:'#FFFFFF',
      fontWeight: "700",
      fontSize: '15@s',
      textAlign:'center',
    }
  })
  return (
    <TouchableHighlight
      style={styles.button}
      onPress={handler}
      underlayColor='#0045E2'>
        <Text style={styles.buttonText}>{text}</Text>
    </TouchableHighlight>
  )
}

export const ClearButton = ({ handler, style = {} }) => {
  let styles = ScaledSheet.create({
    button: {
      right: 10,
      position: 'absolute',
      borderRadius: 5,
      backgroundColor: "#000000",
      opacity: 0.3,
      width: 14,
      height: 14
    }
  })
  return (
    <TouchableHighlight style={[styles.button, style]} onPress={handler}>
      <ClearIcon />
    </TouchableHighlight>
  )
}

export const CameraButton = ({ handler, style = {} }) => {
  let styles = ScaledSheet.create({
    button: {
      right: 15,
      position: 'absolute',
      width: 24,
      height: 24
    }
  })
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={handler}>
      <CameraIcon />
    </TouchableOpacity>
  )
}