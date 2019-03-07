import React, { Component } from 'react'
import { View, Text, Dimensions, TouchableHighlight, TextInput } from 'react-native'
import Carousel from 'react-native-snap-carousel'
import { ScaledSheet } from 'react-native-size-matters'

import { HeaderText, DescriptionText, Pagination } from "../../components/TextBlocks"

const Data = Array(29).fill('')//"icing lion tarnished wise kettle agenda rift bygones dwarf tiger rift phase ashtray palace superior river italics sabotage seasons badge kiosk technical impel perfect juicy adult northern truth acumen".split(' ')

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
    let { width } = Dimensions.get('window')
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
          onChangeText={(value) => this.onChangeHandler(value, index) }
          value={seed[index]}
          onSubmitEditing={() => { this.nextStep() }}
        />
      </View>
    )
  }

  onChangeHandler(text, index) {
    this.setState((prevState) => {
      let seed = prevState.seed
      seed[index] = text
      return seed
    })
  }

  updateIndex () {
    this.setState({currentIndex: this._carousel.currentIndex})
  }

  prevStep () {
    this.focusField(this._carousel.currentIndex-1)
    this._carousel.snapToPrev()
  }

  nextStep () {
    if (this._carousel.currentIndex === (Data.length - 1)) {
      this.props.navigation.navigate('CheckSeed', { seed: Data })
    } else {
      this.focusField(this._carousel.currentIndex + 1)
      this._carousel.snapToNext()
    }
  }

  render () {
    const { horizontalMargin, width, currentIndex } = this.state
    return (
      <View style={styles.container}>
        <HeaderText text="Copy header" />
        <DescriptionText text='Copy description.' />
        <View style={styles.swipe}>
          <Carousel
            ref={(c) => { this._carousel = c }}
            data={Data}
            slideStyle={{justifyContent: 'center'}}
            activeAnimationType='timing'
            inactiveSlideShift={0}
            sliderWidth={width}
            itemWidth={ width -  horizontalMargin }
            renderItem={this.renderItem}
            onSnapToItem={this.updateIndex}
          />
        </View>
        <Pagination next={this.nextStep} prev={this.prevStep} text={`${currentIndex + 1} out of ${Data.length}`} />
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
