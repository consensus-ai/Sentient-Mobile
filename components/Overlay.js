import React, { Component } from 'react'
import { View, Modal, Text, StyleSheet, ImageBackground, TouchableHighlight } from 'react-native'
import randomcolor from 'randomcolor'

import { CloseIcon } from '../components/Icons'

export class Overlay extends Component {
  render () {
    const { text, closeOverlay, showOverlay } = this.props
    return(
      <Modal
          animationType="fade"
          transparent={false}
          visible={showOverlay}
        >
        <ImageBackground source={require('../assets/images/overlay-bg.png')} blurRadius={2} style={styles.backgroundImage}>
          <TouchableHighlight style={styles.closeButton} onPress={() => closeOverlay()} >
            <CloseIcon />
          </TouchableHighlight>
          <View style={[styles.overlayView, {backgroundColor: randomcolor()}]}><Text style={styles.overlayText}>{text}</Text></View>
        </ImageBackground>
      </Modal>
    )
  }
}

let styles = StyleSheet.create({
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 22,
    width: 24,
    height: 24,
    borderRadius: 8,
    backgroundColor: "#000000",
    opacity: 0.3
  },
  backgroundImage: {
    flex: 1,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
  },
  overlayView: {
    width: "100%",
    maxWidth: 283,
    padding: 20,
    borderRadius: 20,
  },
  overlayText: {
    fontSize: 40,
    textAlign: "center",
    lineHeight: 48,
    color: "#FFFFFF"
  }
})
