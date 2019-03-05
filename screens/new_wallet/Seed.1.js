import React, { Component } from 'react'
import { View, StyleSheet, Text, Dimensions, TouchableHighlight } from 'react-native'
import SideSwipe from 'react-native-sideswipe'
import { PaginationLeftIcon, PaginationRightIcon } from "../../components/Icons"
import { HeaderText, DescriptionText } from "../../components/TextBlocks"

const Data = "icing lion tarnished wise kettle agenda rift bygones dwarf tiger rift phase ashtray palace superior river italics sabotage seasons badge kiosk technical impel perfect juicy adult northern truth acumen".split(' ')

export class Seed extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'New Wallet',
      headerLeft: null,
      headerStyle: { borderBottomWidth: 0 }
    }
  }

  constructor (props) {
    super(props)
    this.state = {
      currentIndex: 0,
    }
  }

  componentDidMount () {
    const { navigation } = this.props
    const password = navigation.getParam('password', '')
  }

  render () {
    // center items on screen
    const { width } = Dimensions.get('window');
    const contentOffset = (width - 283) / 2
    const { currentIndex } = this.state

    return (
      <View style={styles.container}>
        <HeaderText text="Write and remember your Seed" />
        <DescriptionText text='This is the only way to recover your wallet. Do not show your seed to anyone.' />
        <View style={styles.swipe}>
          <SideSwipe
            index={currentIndex}
            itemWidth={283}
            style={{ width }}
            data={Data}
            contentOffset={contentOffset}
            onIndexChange={index =>
              this.setState(() => ({ currentIndex: index }))
            }
            renderItem={({ itemIndex, currentIndex, item, animatedValue }) => {
              return <Content item={item}/>
            }}
          />
        </View>
        <View style={styles.pagination}>
          <TouchableHighlight style={styles.placeholder}>
            <PaginationLeftIcon />
          </TouchableHighlight>
          <Text style={styles.paginationText}>{currentIndex + 1} out of {Data.length}</Text>
          <TouchableHighlight style={styles.placeholder}>
            <PaginationRightIcon />
          </TouchableHighlight>
        </View>
      </View>
    );
  };
}

export const Content = ({item}) => {
  return (
    <TouchableHighlight style={styles.swipeElement}>
      <Text style={styles.swipeText}>{item}</Text>
    </TouchableHighlight>
  )
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  swipe: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  placeholder: {
    width: 52,
    height: 52,
    backgroundColor: "#F7F8FA",
    borderRadius: 20
  },
  swipeElement: {
    maxWidth: 283,
    width: "90%",
    padding: 20,
    backgroundColor: "#DA0032",
    borderRadius: 20
  },
  swipeText: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 40,
    lineHeight: 48,
  },
  pagination: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: "85%"
  },
  paginationText: {
    fontSize: 11,
    color: '#8A8A8F'
  }
})
