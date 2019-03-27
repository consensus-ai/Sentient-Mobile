
import { createStackNavigator } from 'react-navigation'

import { WelcomeScreen } from '../screens/WelcomeScreen'

export default createStackNavigator({
  WelcomeScreen: WelcomeScreen
},  {
  initialRouteName: 'WelcomeScreen',
  navigationOptions: {
    header: null
  }
})