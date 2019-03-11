import React, { Component } from 'react'
import { View, Text, Dimensions, NativeModules, TextInput } from 'react-native'
import Carousel from 'react-native-snap-carousel'
import { ScaledSheet } from 'react-native-size-matters'

import { HeaderText, DescriptionText, Pagination } from "../../components/TextBlocks"

const Seed = Array(29).fill('')

const colors = {
  active: "#0045e3",
  error: "#F0374A",
  normal: "#8A8A8F"
}

export class ImportSeed extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Import Seed',
      headerLeft: null,
      headerStyle: { borderBottomWidth: 0 }
    }
  }

  constructor (props) {
    super(props)
    const { width } = Dimensions.get('window')
    this.updateIndex = this.updateIndex.bind(this)
    this.renderItem = this.renderItem.bind(this)
    this.nextStep = this.nextStep.bind(this)
    this.prevStep = this.prevStep.bind(this)
    this.state = {
      currentIndex: 0,
      width: width,
      horizontalMargin: (width - (width*0.80)),
      seed: {}
    }
    this.focusField = this.focusField.bind(this)
    this.inputs = {}
  }

  focusField(key) {
    this.inputs[key].focus()
  }

  renderItem ({item, index}) {
    const { seed } = this.state
    return (
      <View style={styles.input}>
        <Text style={styles.label}>{`Word #${index+1}`}</Text>
        <TextInput
          ref={ input => {
            this.inputs[index] = input
          }}
          style={styles.field}
          returnKeyType={index === (Seed.length - 1) ? 'done' : 'next'}
          onChangeText={(value) => this.onChangeHandler(value, index) }
          value={seed[index]}
          onSubmitEditing={() => { this.nextStep() }}
        />
      </View>
    )
  }

  onChangeHandler(text, index) {
    this.setState((prevState) => {
      let { seed } = prevState
      seed[index] = text
      return seed
    })
  }

  updateIndex () {
    this.setState({currentIndex: this._carousel.currentIndex})
  }

  prevStep () {
    const index = this._carousel.currentIndex
    if (index === 0) {
      const { navigation } = this.props
      navigation.navigate('WalletScreen')
    } else {
      this.focusField(index-1)
      this._carousel.snapToPrev()
    }
  }

  createWallet () {
    const { navigation } = this.props
    let { seed } = this.state
    const password = navigation.getParam('password', '')
    seed = Object.values(seed).join(' ')
    NativeModules.MobileWallet.createWalletWithSeed(seed, password, (err, success) => {
      if (success) {
        navigation.navigate('Transactions')
      } else {
        const data = {
          header: 'Incorrect Seed Phrase',
          message: 'One or more of the words entered for your existing seed are incorrect. Please go back to the previous step re-enter each word. Remember to check for spelling errors and that the words are entered in the correct order.',
        }
        navigation.navigate('Error', data)
      }
    })
  }

  nextStep () {
    if (this._carousel.currentIndex === (Seed.length - 1)) {
      this.createWallet()
    } else {
      this.focusField(this._carousel.currentIndex + 1)
      this._carousel.snapToNext()
    }
  }

  render () {
    const { horizontalMargin, width, currentIndex } = this.state
    return (
      <View style={styles.container}>
        <HeaderText text="Enter Your Phrase" />
        <DescriptionText text='Please enter your existing seed phrase words below. Please be sure to check spelling and that the words are entered in the exact order they were presented.' />
        <View style={styles.swipe}>
          <Carousel
            ref={(c) => { this._carousel = c }}
            data={Seed}
            slideStyle={{justifyContent: 'center'}}
            activeAnimationType='timing'
            inactiveSlideShift={0}
            sliderWidth={width}
            itemWidth={ width -  horizontalMargin }
            renderItem={this.renderItem}
            onSnapToItem={this.updateIndex}
          />
        </View>
        <Pagination next={this.nextStep} prev={this.prevStep} text={`${currentIndex + 1} out of ${Seed.length}`} />
      </View>
    )
  }
}

let styles = ScaledSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  swipe: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center'
  },
  swipeElement: {
    padding: '14@s',
    borderRadius: '20@s',
  },
  swipeText: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: '40@vs',
    lineHeight: '48@vs',
  },
  input: {
    position: 'relative',
    borderRadius: '16@s',
    backgroundColor: "#F7F8FA",
    height: '56@s'
  },
  field: {
    width: "100%",
    paddingLeft: '15@s',
    paddingRight: '15@s',
    paddingTop: '18@s',
  },
  label: {
    top: 10,
    left: 15,
    fontSize: '11@s',
    fontWeight: '700',
    color: colors.normal
  },
})
