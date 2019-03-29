import React, { Component } from 'react'
import { View, TouchableHighlight, Text } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'

import { GoNextIcon } from "../../components/Icons"
import { HeaderText, DescriptionText } from "../../components/TextBlocks"
import { BlueButton } from "../../components/Buttons"


export class WalletCreated extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Setup',
      headerLeft: null,
      headerRight: (
        <TouchableHighlight
          underlayColor="#FFFFFF"
          onPress={() => { navigation.navigate('Transactions') }}>
          <GoNextIcon />
        </TouchableHighlight>
      ),
      headerStyle: { borderBottomWidth: 0 },
      headerTitleStyle: { color: '#D3D6DC' },
    }
  }

  constructor (props) {
    super(props)
    this.submit = this.submit.bind(this)
    this.nextStep = this.nextStep.bind(this)
  }

  submit () {
    const { navigation } = this.props
    const seed = navigation.getParam('seed', '')
    navigation.navigate('RecoveryPhrase', { seed })
  }

  nextStep () {
    const { navigation } = this.props
    navigation.navigate('Transactions')
  }

  render() {
    return (
      <View style={styles.container}>
        <HeaderText text="Wallet Created" />
        <DescriptionText text="Your wallet and recovery phrase have now been generated." />
        <DescriptionText text="Click below to view your phrase. You can find your phrase in your Profile settings." style={{marginTop: 10}}/>
        <View style={styles.controls}>
          <BlueButton text='View Recovery Phrase' handler={this.submit} />
          <Text style={styles.skipText} onPress={this.nextStep}>
            Skip This Step
          </Text>
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
  controls: {
    paddingTop: '30@vs'
  },
  skipText: {
    color: 'rgba(0, 0, 0, 0.4)',
    fontSize: '15@vs',
    paddingTop: '15@vs',
    textAlign: 'center'
  }
})