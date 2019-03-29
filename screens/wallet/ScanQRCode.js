import React, { Component } from "react"

import { View, Dimensions, Text, TouchableHighlight } from "react-native"
import QRCodeScanner from "react-native-qrcode-scanner"
import Icon from "react-native-vector-icons/Ionicons"
import { GoBackIcon } from "../../components/Icons"

const { height, width } = Dimensions.get("window")

export class ScanQRCode extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (
        <TouchableHighlight
          underlayColor="#FFFFFF"
          onPress={() => { navigation.goBack() }}>
          <GoBackIcon />
        </TouchableHighlight>
      ),
    }
  }

  constructor(props) {
    super(props)
    this.onSuccess = this.onSuccess.bind(this)
  }

  onSuccess(e) {
    const { address, amount } = JSON.parse(e.data)
    const { navigation } = this.props
    navigation.navigate('Transactions', {
      showModal: true,
      address,
      amount
    })
  }

  render() {
    return (
      <QRCodeScanner
        showMarker
        onRead={this.onSuccess}
        cameraStyle={{ height: height }}
        customMarker={
          <View style={styles.rectangleContainer}>
            <View style={styles.topOverlay} />
            <View style={{ flexDirection: "row" }}>
              <View style={styles.leftAndRightOverlay} />

              <View style={styles.rectangle}>
                <Icon
                  style={{position: 'absolute', top: "-11%"}}
                  name="ios-qr-scanner"
                  size={width * 0.78}
                  color={iconScanColor}
                />
              </View>

              <View style={styles.leftAndRightOverlay} />
            </View>
            <View style={styles.bottomOverlay}>
              <Text style={{ fontSize: 15, color: "white" }}>
                Position QR code in this frame
              </Text>
            </View>
          </View>
        }
      />
    )
  }
}

const overlayColor = "rgba(0,0,0,0.5)"

const rectDimensions = width * 0.65

const scanBarWidth = width * 0.46
const scanBarHeight = width * 0.0025
const scanBarColor = "#22ff00"

const iconScanColor = "#FFFFFF"

const styles = {
  rectangleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent"
  },
  rectangle: {
    position: 'relative',
    height: rectDimensions,
    width: rectDimensions,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    borderWidth: 2
  },

  topOverlay: {
    height: '20%',
    width: width,
    backgroundColor: overlayColor
  },

  bottomOverlay: {
    flex: 1,
    height: width,
    width: width,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: overlayColor,
    paddingBottom: width * 0.25
  },

  leftAndRightOverlay: {
    height: width * 0.65,
    width: width,
    backgroundColor: overlayColor
  },
  scanBar: {
    width: scanBarWidth,
    height: scanBarHeight,
    backgroundColor: scanBarColor
  }
}