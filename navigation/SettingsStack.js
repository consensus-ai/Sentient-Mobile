import { createStackNavigator } from 'react-navigation'

import { RecoveryPhrase } from '../screens/settings/RecoveryPhrase'
import { SettingsScreen } from '../screens/SettingsScreen'

export default createStackNavigator({
  SettingsScreen: SettingsScreen,
  RecoveryPhrase: RecoveryPhrase
},  {
  initialRouteName: "SettingsScreen",
  navigationOptions: {
    tabBarLabel: 'Settings',
  }
})
