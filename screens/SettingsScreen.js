import React, { Component } from 'react'
import { View, Text, ImageBackground, Image } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'

import { HeaderText } from "../components/TextBlocks"
import { BlueButton } from "../components/Buttons"

export class SettingsScreen extends Component {
  static navigationOptions = {
    header: null
  }

  constructor (props) {
    super(props)
  }

  render() {
    const { navigate } = this.props

    return (
      <ImageBackground blurRadius={9} source={require('../assets/images/content-bg.png')} style={styles.backgroundImage} >
        <View style={styles.container}>
          <HeaderText text='Settings' />
          <View>
            <Image source={require('../assets/images/consensus-logo.png')}/>
            <Text style={{color: '#0045E3', fontSize: 35}}>CONSENSUS</Text>
          </View>
          <View>
            <Text>Sentient Mobile v.0.1</Text>
          </View>
          <View>
            <BlueButton text='Change Password' handler={this.submit} />
            <BlueButton text='View Recovery Phrase' handler={this.submit} />
          </View>

        </View>
      </ImageBackground>
    )
  }
}

let styles = ScaledSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
  },
  container: {
    backgroundColor:'rgba(255,255,255,0.5)',
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

})
