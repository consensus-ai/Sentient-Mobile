import React, { Component } from 'react'
import {View, TextInput, Text} from "react-native"
import { HeaderText, DescriptionText } from "../../components/TextBlocks"
import { ScaledSheet } from 'react-native-size-matters'

export class Password extends Component {
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
    const workflow = navigation.getParam('workflow', 'NewWallet')
    this.state = {
      password: '',
      workflow
    }
  }

  render() {
    const { password, workflow } = this.state
    return (
      <View style={styles.container}>
        <HeaderText text='Create security password' />
        <DescriptionText text='This password will be requested each time you enter the wallet.' />
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


// import { View, Text, Button, NativeModules, TextInput} from 'react-native'

// export class NewWallet extends Component {
  

//   constructor(props) {
//     super(props);
//     this.state = {text: ''};
//   }

//   componentDidMount() {
    // NativeModules.MobileWallet.openWalletWithPassword('test', (err, data) => {
    //   NativeModules.MobileWallet.numAddresses((err, data) => {
    //     this.setState({countAddresses: data})
    //     NativeModules.MobileWallet.addresses((err, data) => {
    //       this.setState({address: data})
    //     })
    //     // for (i = 0; i < data; i++) {
    //     //   NativeModules.MobileWallet.addressAtIndex(i, (err, data) => {
    //     //     this.setState({address: [...this.state.address, data]})
    //     //   })
    //     // }
    //   })
    // })
//   }

//   render() {
//     return (
//       <View>
//         <TextInput
//           secureTextEntry={true}
//           style={{height: 60}}
//           placeholder="Create Password"
//           onChangeText={(text) => this.setState({text})}
//         />
//       </View>
//     );
//   }
// }
