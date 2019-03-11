import React, { Component } from 'react'
import { createIconSetFromIcoMoon } from 'react-native-vector-icons'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters'


import icoMoonConfig from '../assets/fonts/selection.json'
const Linericon = createIconSetFromIcoMoon(icoMoonConfig, 'icomoon', 'icomoon.ttf')

export class TabBarIcon extends Component {
  render() {
    const { name, focused } = this.props
    let iconName = name.replace(/Stack/g,"").toLowerCase()
    let iconColor = focused ? "#0045E3" : "#000000"
    return <Linericon name={iconName} size={25} color={iconColor} />
  }
}

export class InputIcon extends Component {
  render() {
    const { name } = this.props
    let iconColor = name === "error" ? "#F0374A" : "#07AF9A"
    return <Linericon name={name} size={verticalScale(22)} color={iconColor} style={{right: 13, top: 15, position: 'absolute'}} />
  }
}

export class PaginationLeftIcon extends Component {
  render() {
    return <Linericon name='left' size={verticalScale(14)} color="#0045E3"  style={{fontWeight: '300', left: verticalScale(15), top: verticalScale(17), position: 'absolute'}} />
  }
}

export class PaginationRightIcon extends Component {
  render() {
    return <Linericon name='right' size={verticalScale(14)} color="#0045E3" style={{fontWeight: '300', right: verticalScale(15), top: verticalScale(17), position: 'absolute'}} />
  }
}

export class GoBackIcon extends Component {
  render() {
    return <Linericon name='go-back' size={verticalScale(16)} color="#0045E3" style={{ left: 20 }} />
  }
}

export class GoNextIcon extends Component {
  render() {
    return <Linericon name='go-back' size={verticalScale(16)} color="#0045E3" style={{right: 20, transform: [{ rotate: '180deg'}]}}/>
  }
}

export class CloseIcon extends Component {
  render() {
    return <Linericon name='close' size={12} color="#ffffff" style={{left: 6, top: 6}}/>
  }
}

export class WalletIcon extends Component {
  render() {
    return <Linericon name='lock' size={24} color="#0045E3"/>
  }
}

export class ClockIcon extends Component {
  render() {
    return <Linericon name='clock' size={17} color="#b4b4b4"/>
  }
}

export class CashInIcon extends Component {
  render() {
    return <Linericon name='cash-in' size={24} color="#0045E3" />
  }
}

export class CashOutIcon extends Component {
  render() {
    return <Linericon name='cash-out' size={24} color="#0045E3" />
  }
}
