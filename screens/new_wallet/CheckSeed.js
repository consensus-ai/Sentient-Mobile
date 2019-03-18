import React, { Component } from 'react'
import { View, Text, TouchableHighlight } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'

import { GoNextIcon } from "../../components/Icons"
import { HeaderText, DescriptionText } from "../../components/TextBlocks"
import { Overlay } from '../../components/Overlay'


export class CheckSeed extends Component {
  static navigationOptions = ({ navigation }) => {
    const seed = navigation.getParam('seed', '').split(' ')
    return {
      headerTitle: 'New Wallet',
      headerLeft: null,
      headerRight: (
        <TouchableHighlight
          underlayColor="#FFFFFF"
          onPress={() => { navigation.navigate('UserWarning', { seed }) }}>
          <GoNextIcon />
        </TouchableHighlight>
      ),
      headerStyle: { borderBottomWidth: 0 }
    }
  }

  constructor (props) {
    super(props)
    const { navigation } = this.props
    const seed = navigation.getParam('seed', '').split(' ')
    this.closeOverlay = this.closeOverlay.bind(this)
    this.nextStep = this.nextStep.bind(this)
    this.prevStep = this.prevStep.bind(this)
    this.state = {
      showOverlay: false,
      overlayText: '',
      seed,
    }
  }

  closeOverlay () {
    this.setState({ showOverlay: false })
  }

  showOverlay (el) {
    this.setState({
      showOverlay: true,
      overlayText: el
    })
  }

  prevStep () {
    this.props.navigation.goBack()
  }

  nextStep () {
    const { seed } = this.state
    console.log(seed)
    this.props.navigation.navigate('ValidateSeed', { seed })
  }

  render() {
    const { showOverlay, overlayText, seed } = this.state
    return (
      <View style={styles.container}>
        <Overlay text={overlayText} closeOverlay={ this.closeOverlay } showOverlay={showOverlay} />
        <HeaderText text="Important!" />
        <DescriptionText text="DO NOT LOSE THIS PHRASE. You will not be able to recover it. Write it down EXACTLY in order and keep in secure location." />
        <View style={styles.chipsView}>
          {seed.map((el, index) => {
            let name = `${index+1}. ${el}`
            return (
              <TouchableHighlight key={index}
                onPress={() => this.showOverlay(name)}
                underlayColor="#F7F8FA"
                style={styles.chips}
                >
                  <Text style={styles.chipsText}>{name}</Text>
              </TouchableHighlight>
            )
          })}
        </View>
      </View>
    )
  }
}

let styles = ScaledSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  chipsView: {
    flex: 4,
    width: "95%",
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  },
  chipsText: {
    color: "#000000",
    lineHeight: '20@s',
    fontSize: '14@vs',
    letterSpacing: -0.2,
  },
  chips: {
    margin: '5@s',
    paddingTop: '7@s',
    paddingBottom: '7@s',
    paddingLeft: '8@s',
    paddingRight: '8@s',
    borderRadius: '12@s',
    backgroundColor: "#F7F8FA",
  }
})