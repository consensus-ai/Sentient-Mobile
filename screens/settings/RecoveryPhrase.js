import React, { Component } from 'react'
import { View, Text, TouchableHighlight } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'

import { GoBackIcon } from "../../components/Icons"
import { HeaderText, DescriptionText } from "../../components/TextBlocks"


export class RecoveryPhrase extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: '',
      headerLeft: (
        <TouchableHighlight
          underlayColor="#FFFFFF"
          onPress={() => { navigation.goBack() }}>
          <GoBackIcon />
        </TouchableHighlight>
      ),
      headerStyle: { borderBottomWidth: 0 }
    }
  }

  constructor (props) {
    super(props)
    const { navigation } = this.props
    const seed = navigation.getParam('seed', '').split(' ')
    this.state = {
      seed,
    }
  }

  render() {
    const { seed } = this.state
    return (
      <View style={styles.container}>
        <HeaderText text="Recovery Phrase" />
        <DescriptionText text="DO NOT LOSE THIS PHRASE. You will need this phrase to recover your wallet or restore it on another device." />
        <View style={styles.chipsView}>
          {seed.map((el, index) => {
            return (
              <View key={index} style={styles.chips}>
                <View>
                  <Text style={styles.chipNumber}>{`${index+1}.`}</Text>
                  <Text style={styles.chipsText}>{el}</Text>
                </View>
              </View>
            )
          })}
          <View style={styles.chipsView}>
            <Text style={styles.chipsText}>Tap and hold to copy</Text>
          </View>
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
    alignContent: 'center',
    alignItems: 'center'
  },
  chipsText: {
    color: "#000000",
    lineHeight: '20@s',
    fontSize: '14@vs',
    letterSpacing: -0.2,
    textAlign: 'center',
  },
  chipNumber: {
    position: 'absolute',
    top: -2,
    left: -2,
    fontSize: '6@vs'
  },
  chips: {
    position: 'relative',
    width: '31,9%',
    margin: '3@vs',
    paddingTop: '8@vs',
    paddingBottom: '8@vs',
    paddingLeft: '8@vs',
    paddingRight: '8@vs',
    borderRadius: '12@vs',
    backgroundColor: "#E6EFFF",
  }
})
