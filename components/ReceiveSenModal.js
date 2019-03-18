import React, { Component } from 'react'
import { View, Text, TouchableHighlight, ScrollView, Dimensions, NativeModules } from 'react-native'
import Modal from "react-native-modal"
import { ScaledSheet } from 'react-native-size-matters'

import { CloseIcon, AddressIcon, AddAddress } from './Icons'


export class ReceiveSenModal extends Component {

  constructor (props) {
    super(props)
    this.state = {
      addresses: []
    }
  }

  componentDidMount() {
    NativeModules.MobileWallet.addresses((err, addresses) => {
      if (err) {
        console.log(err)
        alert(err.message)
      } else {
        this.setState({ addresses })
      }
    })
  }

  createAddress () {
    NativeModules.MobileWallet.makeNewAddress((err, address)=>{
      if (err) {
        console.log(err)
        alert(err.message)
      } else {
        this.setState({addresses: [...this.state.addresses, address]})
      }
    })
  }

  handleOnScroll = event => {
    this.setState({
      scrollOffset: event.nativeEvent.contentOffset.y,
    })
  }

  handleScrollTo = p => {
    if (this.scrollViewRef) {
      this.scrollViewRef.scrollTo(p);
    }
  };

  render () {
    const { closeModal, showModal } = this.props
    const { height } = Dimensions.get('window')
    const { addresses } = this.state

    return(
      <Modal
        isVisible={showModal}
        avoidKeyboard={true}
        style={styles.modal}
        scrollTo={this.handleScrollTo}
        scrollOffset={this.state.scrollOffset}
        scrollOffsetMax={ height - 150 }
        onSwipeComplete={() => closeModal()}
        scrollEventThrottle={16}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Receive SEN</Text>
            <TouchableHighlight style={styles.closeButton} onPress={() => { closeModal() }} >
              <CloseIcon />
            </TouchableHighlight>
          </View>
          <View style={styles.addresses}>
            <TouchableHighlight style={styles.closeButton} onPress={() => { this.createAddress() }} >
              <AddAddress />
            </TouchableHighlight>
            <ScrollView
                ref={ref => (this.scrollViewRef = ref)}
                onScroll={this.handleOnScroll}
              >
              { addresses.map((el, i) => {
                return (
                  <TouchableHighlight key={el} style={styles.addressRow}>
                    <View style={{flexDirection: 'row'}}>
                      <View style={{padding: 4}}>
                        <AddressIcon />
                      </View>
                      <View style={{ paddingLeft: 10, width: '90%' }}>
                        <View>
                          <Text style={{ paddingBottom: 5, paddingRight: 10, fontSize: 17 }}>
                            {`No Description ${i}`}
                          </Text>
                        </View>
                        <View style={{borderStyle: 'solid', borderColor: '#EBEBEB', borderBottomWidth: 1}}>
                          <Text style={{fontSize: 11, color: 'rgba(0, 0, 0, 0.4)', paddingBottom: 10}}>{el}</Text>
                        </View>
                      </View>
                    </View>
                  </TouchableHighlight>
                )
              })}
            </ScrollView>
          </View>
          <View style={{width: '100%', position: "absolute", bottom: 15}}>
            <TouchableHighlight style={[styles.shareButton, { backgroundColor: "#0045E3" }]} onPress={() => alert('HELLO')} >
              <Text style={[styles.shareButtonText, { color: "#FFFFFF" }]}>Share</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    )
  }
}

const styles = ScaledSheet.create({
  container: {
    backgroundColor: "white",
    padding: '16@vs',
    alignItems: "center",
    borderTopRightRadius: '30@vs',
    borderTopLeftRadius: '30@vs',
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  closeButton: {
    width: 24,
    height: 24,
    borderRadius: 8,
    backgroundColor: "#000000",
    opacity: 0.3
  },
  header: {
    width: "98%",
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingTop: '15@vs',
    paddingBottom: '15@vs'
  },
  headerText: {
    fontSize: '18@vs',
  },
  addressRow: {
    paddingTop: '18@vs',
    flexDirection: 'row',
    justifyContent: 'center',

  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  addresses: {
    height: 300,
    width: "100%",
  },
  shareButton: {
    borderRadius: '16@vs',
    backgroundColor: "#F5F5F5",
    marginTop: '16@vs',
    marginBottom: '16@vs',
    justifyContent: 'center',
    height: '56@s'
  },
  shareButtonText: {
    fontSize: '14@vs',
    textAlign: 'center',
    color: "rgba(0, 0, 0, 0.26)",
  }
})
