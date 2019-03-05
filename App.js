import React, { Component } from 'react';
import { StyleSheet, NativeModules, View } from 'react-native';
import AppContainer from './navigation/AppNavigator';


export default class App extends Component {
  constructor(){
    super();
    this.state = {
      address: []
    };
  }
  // componentDidMount() {
  //   NativeModules.MobileWallet.walletExists((err, data) => {
  //     this.setState({ walletExists: data })
  //   })
  // }

  // onPressCreateNewAddress () {
  //   NativeModules.MobileWallet.makeNewAddress((err, data) => {
  //     this.setState({
  //       address: [...this.state.address, data],
  //       countAddresses: this.state.countAddresses + 1
  //     })
  //   })
  // }

  render() {
    return (
      <AppContainer />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
