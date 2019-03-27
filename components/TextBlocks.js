import React, { Component } from 'react'
import { Text } from 'react-native'
import { verticalScale, moderateScale } from 'react-native-size-matters'


export class HeaderText extends Component {
  render () {
    const { text } = this.props
    return <Text style={{marginTop: moderateScale(10, 10), fontWeight: '600', fontSize: verticalScale(25), width: "75%", color: '#000000', textAlign: "center", letterSpacing: verticalScale(1.6), lineHeight: verticalScale(28)}}>{text}</Text>
  }
}

export class DescriptionText extends Component {
  render () {
    const { text } = this.props
    return <Text style={{width: '80%', marginTop: moderateScale(5, 10), fontWeight: '300', textAlign: "center", fontSize: verticalScale(14), lineHeight: verticalScale(20) }}>{text}</Text>
  }
}
