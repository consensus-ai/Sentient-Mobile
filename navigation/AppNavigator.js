import React from 'react'
import {createBottomTabNavigator, createStackNavigator, createAppContainer} from 'react-navigation'

import { Polls } from '../screens/Polls'
import { Today } from '../screens/Today'
import { Profile } from '../screens/Profile'
import { TabBarIcon } from '../components/Icons'

import WalletStack from './WalletStack'

const ProfileStack = createStackNavigator({
  Profile: Profile,
}, {
  navigationOptions: {
    tabBarLabel: 'Profile'
  }
})

const PollsStack = createStackNavigator({
  Polls: Polls,
}, {
  navigationOptions: {
    tabBarLabel: 'Polls',
  }
})

const TodayStack = createStackNavigator({
  Today: Today,
}, {
  navigationOptions: {
    tabBarLabel: 'Today',
  }
})

export default createAppContainer(createBottomTabNavigator({
    //TodayStack,
    WalletStack,
    ProfileStack,
    //PollsStack,
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
      inactiveTintColor: '#000000',
    },
}))
