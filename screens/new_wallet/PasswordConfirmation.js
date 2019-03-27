import React, { Component } from 'react'
import { View, TextInput, Text, NativeModules, TouchableHighlight } from "react-native"
import { ScaledSheet } from 'react-native-size-matters'

import { InputIcon, GoBackIcon } from "../../components/Icons"
import { HeaderText, DescriptionText } from "../../components/TextBlocks"
import { BlueButton } from "../../components/Buttons"

const colors = {
  active: "#0045e3",
  error: "#F0374A",
  normal: "#8A8A8F"
}

export class PasswordConfirmation extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Setup',
      headerLeft: (
        <TouchableHighlight
          underlayColor="#FFFFFF"
          onPress={() => { navigation.goBack() }}>
          <GoBackIcon />
        </TouchableHighlight>
      ),
      headerStyle: { borderBottomWidth: 0 },
      headerTitleStyle: { color: '#D3D6DC' },
    }
  }

  constructor(props) {
    super(props)
    const { navigation } = this.props
    const password = navigation.getParam('password', '')
    this.submit = this.submit.bind(this)
    this.state = {
      passwordSubmitted: false,
      passwordError: false,
      passwordFocused: false,
      confirmError: false,
      confirmSubmitted: false,
      confirmFocused: false,
      confirmPassword: '',
      valid: false,
      password
    }
  }

  componentDidMount () {
    this.validatePassword()
  }

  confirmPassword () {
    const { password, confirmPassword, passwordError } = this.state
    this.setState({
      confirmError: (password !== confirmPassword),
      confirmSubmitted: true,
      valid: (password === confirmPassword && !passwordError),
    })
  }

  validatePassword () {
    const { password } = this.state
    const regex = /[a-z0-9]{8,}/i
    const passwordTest = regex.test(password)
    if (passwordTest) {
      this.confirmPasswordInput.focus()
    }
    this.setState({
      passwordError: !passwordTest,
      passwordSubmitted: true,
    })
  }

  confirmPasswordChanged(confirmPassword) {
    const { confirmError } = this.state
    let state = {
      confirmPassword: confirmPassword,
      valid: false,
    }

    if (confirmError) {
      state.confirmError = false
      state.confirmSubmitted = false
    }
    if (confirmPassword.length === 0){
      state.confirmSubmitted = false
    }
    this.setState(state)
  }

  passwordChanged(password) {
    const { passwordError } = this.state
    let state = {
      valid: false,
      password: password,
      confirmPassword: '',
      confirmSubmitted: false,
      confirmError: false,
    }
    if (passwordError) {
      state.passwordError = false
      state.passwordSubmitted = false
    }
    if (password.length === 0){
      state.passwordSubmitted = false
    }
    this.setState(state)
  }

  submit () {
    const { navigation } = this.props
    const { password } = this.state
    const workflow = navigation.getParam('workflow', 'NewWallet')
    if (workflow === 'NewWallet') {
      NativeModules.MobileWallet.createWalletWithPassword(password, (err, success) => {
        if (success){
          NativeModules.MobileWallet.primarySeed((err, seed) => {
            if (seed) {
              navigation.navigate('WalletCreated', { seed })
            } else {
              navigation.navigate('Error', { message: err.message })
            }
          })
        } else {
          navigation.navigate('Error', { message: err.message })
        }
      })
    } else {
      navigation.navigate('ImportSeed', { password })
    }
  }

  render() {
    const { password, passwordSubmitted, confirmPassword, confirmSubmitted, confirmError,
      passwordError, confirmFocused, passwordFocused, valid } = this.state

    const { navigation } = this.props
    const workflow = navigation.getParam('workflow', 'NewWallet')
    const text = workflow === 'Seed' ? 'Before you import your seed, you must set a new password for your wallet.' : 'This password will be requested each time you enter the wallet.'
    return (
      <View style={styles.container}>
        <HeaderText text='Confirm Password' />
        <DescriptionText text={text} />
        <View style={styles.inputs}>
          <View style={styles.inputGroup}>
            <View style={styles.input}>
              <Text style={[styles.label, {color: passwordError ? colors.error : (passwordFocused ? colors.active : colors.normal) }]}>Create Password</Text>
              <TextInput
                ref={(ref) => { this.passwordInput = ref }}
                secureTextEntry={true}
                style={styles.field}
                onChangeText={(password) => this.passwordChanged(password)}
                value={password}
                returnKeyType='next'
                onFocus={() => this.setState({ passwordFocused: true })}
                onBlur={() => {
                  this.setState({ passwordFocused: false })
                  this.validatePassword()
                }}
                onSubmitEditing={() => { this.validatePassword() }}
              />
              {passwordSubmitted && (<InputIcon name={passwordError ? "error" : "success"} />)}
            </View>
            <Text style={[styles.hint, {color: colors.normal}]}>Letters and numbers, minimum 8 symbols</Text>
          </View>
          <View style={styles.inputGroup}>
            <View style={styles.input}>
              <Text style={[styles.label, {color: confirmError ? colors.error : (confirmFocused ? colors.active : colors.normal) }]}>Confirm Password</Text>
              <TextInput
                ref={(ref) => { this.confirmPasswordInput = ref }}
                secureTextEntry={true}
                returnKeyType='done'
                style={styles.field}
                onChangeText={(confirmPassword) => this.confirmPasswordChanged(confirmPassword)}
                onFocus={() => this.setState({ confirmFocused: true })}
                onBlur={() => {
                  this.setState({ confirmFocused: false })
                  this.confirmPassword()
                }}
                value={confirmPassword}
                onSubmitEditing={() => this.confirmPassword() }
              />
              {confirmSubmitted && (<InputIcon name={confirmError ? "error" : "success"} />)}
            </View>
            {confirmError && <Text style={styles.hint}>Passwords do not match</Text>}
          </View>
        </View>
        { valid && <BlueButton text='Save Password' handler={this.submit} /> }
      </View>
    )
  }
}

let styles = ScaledSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    alignItems: 'center',
  },
  inputs: {
    width: "90%",
    paddingTop: '46@vs'
  },
  inputGroup: {
    paddingBottom: '15@vs'
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
    color: "#0045e3"
  },
  hint: {
    paddingTop: '10@vs',
    paddingLeft: '15@s',
    fontSize: '13@s',
    letterSpacing: -0.08,
    color: colors.error
  }
})