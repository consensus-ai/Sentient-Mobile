import React, { Component } from 'react'
import { View, TextInput, Text, TouchableHighlight } from "react-native"
import { InputIcon } from "../../components/Icons"
import { HeaderText, DescriptionText } from "../../components/TextBlocks"
import { ScaledSheet } from 'react-native-size-matters'

const colors = {
  active: "#0045e3",
  error: "#F0374A",
  normal: "#8A8A8F"
}

export class PasswordConfirmation extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'New Wallet',
      headerLeft: null,
      headerStyle: { borderBottomWidth: 0 }
    }
  }

  constructor(props) {
    super(props)
    const { navigation } = this.props
    const password = navigation.getParam('password', '')
    const workflow = navigation.getParam('workflow', 'NewWallet')
    this.state = {
      passwordSubmitted: false,
      passwordError: false,
      passwordFocused: false,
      duplicateError: false,
      duplicateSubmitted: false,
      duplicateFocused: false,
      duplicatePassword: '',
      valid: false,
      password,
      workflow,
    }
  }

  componentDidMount () {
    this.validatePassword()
  }

  validateDuplicatePassword () {
    const { password, duplicatePassword, passwordError } = this.state
    this.setState({
      duplicateError: (password !== duplicatePassword),
      duplicateSubmitted: true,
      valid: (password === duplicatePassword && !passwordError),
    })
  }

  validatePassword () {
    const { password } = this.state
    const regex = /[a-z0-9]{8,}/i
    const passwordTest = regex.test(password)
    if (passwordTest) {
      this.duplicatePasswordInput.focus()
    }
    this.setState({
      passwordError: !passwordTest,
      passwordSubmitted: true,
    })
  }

  duplicatePasswordChanged(duplicatePassword) {
    const { duplicateError } = this.state
    let state = {
      duplicatePassword: duplicatePassword,
      valid: false,
    }

    if (duplicateError) {
      state.duplicateError = false
      state.duplicateSubmitted = false
    }
    if (duplicatePassword.length === 0){
      state.duplicateSubmitted = false
    }
    this.setState(state)
  }

  passwordChanged(password) {
    const { passwordError } = this.state
    let state = {
      valid: false,
      password: password,
      duplicatePassword: '',
      duplicateSubmitted: false,
      duplicateError: false,
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

  render() {
    const { password, passwordSubmitted, duplicatePassword, duplicateSubmitted, duplicateError, 
      passwordError, duplicateFocused, passwordFocused, valid, workflow } = this.state
    return (
      <View style={styles.container}>
        <HeaderText text='Create security password' />
        <DescriptionText text='This password will be requested each time you enter the wallet.' />
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
              <Text style={[styles.label, {color: duplicateError ? colors.error : (duplicateFocused ? colors.active : colors.normal) }]}>Duplicate password</Text>
              <TextInput
                ref={(ref) => { this.duplicatePasswordInput = ref }}
                secureTextEntry={true}
                returnKeyType='done'
                style={styles.field}
                onChangeText={(duplicatePassword) => this.duplicatePasswordChanged(duplicatePassword)}
                onFocus={() => this.setState({ duplicateFocused: true })}
                onBlur={() => {
                  this.setState({ duplicateFocused: false })
                  this.validateDuplicatePassword()
                }}
                value={duplicatePassword}
                onSubmitEditing={() => this.validateDuplicatePassword() }
              />
              {duplicateSubmitted && (<InputIcon name={duplicateError ? "error" : "success"} />)}
            </View>
            {duplicateError && <Text style={styles.hint}>Passwords do not match</Text>}
          </View>
        </View>
        { valid && ( <View style={{paddingTop: 30}}>
            <TouchableHighlight
              style={styles.submit}
              onPress={() => { this.props.navigation.navigate((workflow === 'NewWallet' ? 'RememberSeed' : 'ImportSeed'), { password }) }}
              underlayColor='#0045E2'>
                <Text style={styles.submitText}>Save Password</Text>
            </TouchableHighlight>
          </View>)}
      </View>
    );
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