import React, { Component } from 'react'
import { View, Text, Dimensions, TouchableHighlight, TextInput } from 'react-native'
import Carousel from 'react-native-snap-carousel'
import randomcolor from 'randomcolor'
import { ScaledSheet } from 'react-native-size-matters'

import { HeaderText, DescriptionText, Pagination } from "../../components/TextBlocks"

const Data = "icing lion tarnished wise kettle agenda rift bygones dwarf tiger rift phase ashtray palace superior river italics sabotage seasons badge kiosk technical impel perfect juicy adult northern truth acumen".split(' ')

export class RememberSeed extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'New Wallet',
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
      index: 0,
      colors: [],
      seed: '',
      horizontalMargin: (width - (width*0.80))
    }
  }

  componentDidMount () {
    const { navigation } = this.props
    const password = navigation.getParam('password', '')
    console.log(randomcolor({count: Data.length}))
    this.setState({colors: randomcolor({count: Data.length})})
  }

  renderItem ({item, index}) {
    return <Content item={item} number={index+1} color={this.state.colors[index]} />
  }

  updateIndex () {
    this.setState({index: this._carousel.currentIndex})
  }

  prevStep () {
    this._carousel.snapToPrev()
  }

  nextStep () {
    if (this._carousel.currentIndex === (Data.length - 1)) {
      this.props.navigation.navigate('CheckSeed', { seed: Data })
    } else {
      this._carousel.snapToNext()
    }
  }

  render () {
    const { horizontalMargin, width, index } = this.state
    return (
      <View style={styles.container}>
        <HeaderText text="Copy header" />
        <DescriptionText text='Copy description.' />
        <View style={styles.swipe}>
          <Carousel
            ref={(c) => { this._carousel = c }}
            data={Data}
            slideStyle={{justifyContent: 'center'}}
            activeAnimationType='decay'
            enableMomentum={true}
            inactiveSlideShift={0}
            sliderWidth={width}
            itemWidth={ width -  horizontalMargin }
            renderItem={this.renderItem}
            onSnapToItem={this.updateIndex}
          />
        </View>
        <Pagination next={this.nextStep} prev={this.prevStep} text={`${index + 1} out of ${Data.length}`} />
      </View>
    )
  }
}

export const Content = ({item, color, number}) => {
  return (
    <View style={styles.input}>
      <Text style={styles.label}>Create Password</Text>
      <TextInput
        secureTextEntry={true}
        style={styles.field}
        autoFocus={true}
        onChangeText={(item) => this.setState({item})}
        value={item}
        onSubmitEditing={() => { this.props.navigation.navigate('PasswordConfirmation', { password, workflow }) }}
      />
    </View>
  )
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
  }
})
