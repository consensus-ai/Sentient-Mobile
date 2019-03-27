import React, { Component } from 'react'
import { View, TextInput, Text } from "react-native"
import { HeaderText, DescriptionText } from "../../components/TextBlocks"
import { ScaledSheet } from 'react-native-size-matters'

export class Password extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Setup',
      headerLeft: null,
      headerStyle: {
        borderBottomWidth: 0,
      },
      headerTitleStyle: {
        color: '#D3D6DC'
      },
    }
  }

  constructor(props) {
    super(props)
    const { navigation } = this.props
    const workflow = navigation.getParam('workflow', 'NewWallet')
    this.state = {
      password: '',
      workflow
    }
  }

  render() {
    const { password, workflow } = this.state
    const text = workflow === 'Seed' ? 'Before you import your seed, you must set a new password for your wallet.' : 'This password will be requested each time you enter the wallet.'
    return (
      <View style={styles.container}>
        <HeaderText text='Create Password' />
        <DescriptionText text={text} />
        <View style={styles.inputs}>
          <View style={styles.inputGroup}>
            <View style={styles.input}>
              <Text style={styles.label}>Create Password</Text>
              <TextInput
                secureTextEntry={true}
                style={styles.field}
                autoFocus={true}
                onChangeText={(password) => this.setState({password})}
                value={password}
                onSubmitEditing={() => { this.props.navigation.navigate('PasswordConfirmation', { password, workflow }) }}
              />
            </View>
            <Text style={styles.hint}>Letters and numbers, minimum 8 symbols</Text>
          </View>
        </View>
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
    flex: 1,
    paddingTop: '93@vs'
  },
  inputGroup: {
    paddingBottom: 20
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
    paddingBottom: '10@vs',
    paddingLeft: '15@s',
    paddingRight: '15@s',
    fontSize: '13@s',
    color: "#8A8A8F"
  }
})
