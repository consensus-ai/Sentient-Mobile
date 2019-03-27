import React from 'react'
import {createBottomTabNavigator, createStackNavigator, createSwitchNavigator, createAppContainer} from 'react-navigation'

import { TabBarIcon } from '../components/Icons'

import WalletStack from './WalletStack'
import { WelcomeScreen } from '../screens/WelcomeScreen'
import SettingsStack from './SettingsStack'
import NewWalletStack from './NewWalletStack'

const LoggedInStack = createBottomTabNavigator({
  WalletStack,
  SettingsStack,
}, {
  initialRouteName: "WalletStack",
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state
      return <TabBarIcon name={routeName} focused={focused} />
    },
  }),
  tabBarOptions: {
    activeTintColor: '#0045E3',
    inactiveTintColor: '#C7C9CD',
  },
})

const WelcomeStack = createStackNavigator({ WelcomeScreen: WelcomeScreen })

export default createAppContainer(createSwitchNavigator({
    WelcomeStack,
    LoggedInStack,
    NewWalletStack,
  }, {
    initialRouteName: "WelcomeStack"
  }
))
