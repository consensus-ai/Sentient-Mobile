import React, { Component } from 'react'
import { View, TextInput, Text, TouchableHighlight } from "react-native"
import { ScaledSheet } from 'react-native-size-matters'

import { InputIcon, GoBackIcon } from "../../components/Icons"
import { HeaderText, DescriptionText } from "../../components/TextBlocks"


const colors = {
  active: "#0045e3",
  error: "#F0374A",
  normal: "#8A8A8F"
}

const getRandNumber = (min, max) => {
  return Math.floor(Math.random()*(max-min+1)+min)
}

export class ValidateSeed extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'New Wallet',
      headerLeft: (
        <TouchableHighlight
          underlayColor="#FFFFFF"
          onPress={() => {navigation.goBack()}}>
            <GoBackIcon />
        </TouchableHighlight>
      ),
      headerStyle: { borderBottomWidth: 0 }
    }
  }

  constructor(props) {
    super(props)
    const { navigation } = this.props
    const seed = navigation.getParam('seed', [])
    this.state = {
      seed,
      valuesToValidates: {},
      focusedInput: {0: true, 1: false, 2: false},
      submittedInput: {0: false, 1: false, 2: false},
      expectedIndexes: this.getRandArray(seed)
    }
    this.focusNextField = this.focusNextField.bind(this)
    this.inputs = {}
  }

  getRandArray (seed) {
    return [getRandNumber(0,9), getRandNumber(10,19), getRandNumber(20, (seed.length-1))]
  }

  focusNextField(key) {
    this.inputs[key].focus()
  }

  activeLabel(key) {
    this.setState((prevState) => {
      let focusedInput = prevState.focusedInput
      focusedInput[key] = true
      return {focusedInput: focusedInput}
    })
  }

  normalLabel (key) {
    this.setState((prevState) => {
      let {submittedInput, focusedInput} = prevState
      focusedInput[key] = false
      submittedInput[key] = true
      return ({focusedInput, submittedInput})
    })
  }

  valid () {
    const { valuesToValidates, seed, expectedIndexes } = this.state
    let validArray = expectedIndexes.map((el, index) => valuesToValidates[index] === seed[el])
    return validArray.every((k) => k )
  }

  onChangeHandler(text, index) {
    this.setState((prevState) => {
      let state = prevState.valuesToValidates
      state[index] = text
      return { valuesToValidates: state }
    })
  }

  componentDidMount () {
    this.focusNextField(0)
  }

  render() {
    const { valuesToValidates, submittedInput, focusedInput, expectedIndexes, seed } = this.state
    return (
      <View style={styles.container}>
        <HeaderText text='Validation Check' />
        <DescriptionText text='Please enter these words from your seed' />
        <View style={styles.inputs}>
          {expectedIndexes.map((el, index) => {
            const isValid = valuesToValidates[index] === seed[el]
            return(
              <View key={el} style={styles.inputGroup}>
                <View style={styles.input}>
                  <Text style={[styles.label, {color: focusedInput[index] ? colors.active : (submittedInput[index] && !isValid ? colors.error : colors.normal)}]}>{`Word #${el+1}`}</Text>
                  <TextInput
                    ref={ input => {
                      this.inputs[index] = input
                    }}
                    style={styles.field}
                    autoCapitalize='none'
                    autoCorrect={false}
                    returnKeyType={ index === 2 ? "done" : "next" }
                    onChangeText={(text) => this.onChangeHandler(text, index)}
                    blurOnSubmit={ index !== 2 ? false : true }
                    value={valuesToValidates[index]}
                    onFocus={() => {
                      this.focusNextField(index)
                      this.activeLabel(index)
                    }}
                    onBlur={() => {
                      this.normalLabel(index)
                    }}
                    onSubmitEditing={() => {
                      if (index !== 2) {
                        this.focusNextField(index + 1)
                      }
                      this.normalLabel(index)
                    }}
                  />
                  {submittedInput[index] && (<InputIcon name={isValid ? "success" : "error"} />)}
                  {submittedInput[index] && !isValid && <Text style={styles.hint}>Incorrect word</Text>}
                </View>
              </View>)
          })}
        </View>
        { this.valid() && ( <View style={{paddingTop: 15}}>
            <TouchableHighlight
              style={styles.submit}
              onPress={() => { this.props.navigation.navigate('Transactions') }}
              underlayColor='#0045E2'>
                <Text style={styles.submitText}>Create Wallet</Text>
            </TouchableHighlight>
          </View>)}
      </View>
    );
  }
}

let styles = ScaledSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    alignItems: 'center',
  },
  inputs: {
    width: "90%",
    paddingTop: '22@vs'
  },
  inputGroup: {
    paddingBottom: '40@vs'
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
    fontSize: '11@vs',
    fontWeight: '700',
  },
  hint: {
    paddingTop: '15@vs',
    paddingLeft: '15@s',
    fontSize: '11@vs',
    letterSpacing: -0.08,
    color: colors.error
  },
  submit:{
    padding: '18@vs',
    backgroundColor: "#0045E3",
    borderRadius: '16@s',
  },
  submitText:{
    color:'#FFFFFF',
    fontWeight: "700",
    fontSize: '15@s',
    textAlign:'center',
  }
})