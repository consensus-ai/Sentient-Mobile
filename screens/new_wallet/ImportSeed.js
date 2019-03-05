import React, { Component } from 'react'
import {View, TextInput, Text} from "react-native"
import { ScaledSheet } from 'react-native-size-matters'

import { HeaderText, DescriptionText } from "../../components/TextBlocks"
import { BlueButton } from "../../components/Buttons"


export class ImportSeed extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'New Wallet',
      headerLeft: null,
      headerStyle: { borderBottomWidth: 0 }
    }
  }

  constructor (props) {
    super(props)
    this.submit = this.submit.bind(this)
    this.state = {
      seed: '',
      valid: false
    }
  }

  validateSeed (seed) {
    this.setState({
      seed: seed,
      valid: seed.split(" ").length === 29
    })
  }

  submit () {
    alert('HERE')
  }

  render() {
    const { seed, valid, height } = this.state
    return (
      <View style={styles.container}>
        <HeaderText text='Enter a seed for wallet' />
        <DescriptionText text='This password will be requested each time you enter the wallet.' />
        <View style={[styles.inputs, {height: height}]}>
          <View style={styles.inputGroup}>
            <View style={styles.input}>
              <Text style={styles.label}>Seed</Text>
              <TextInput
                secureTextEntry={true}
                style={styles.field}
                autoFocus={true}
                textAlignVertical='top'
                multiline={true}
                editable={true}
                onChangeText={(seed) => this.validateSeed(seed)}
                value={seed}
                onSubmitEditing={() => { this.submit() }}
              />
            </View>
            <Text style={styles.hint}>Seed should be in format word1 word2 word3</Text>
            { valid && ( <BlueButton text="Confirm" handler={this.submit}/>)}
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
    flex: 1
  },
  inputGroup: {
    paddingTop: '20@vs'
  },
  input: {
    position: 'relative',
    borderRadius: '16@s',
    backgroundColor: "#F7F8FA",
    height: '200@vs'
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
