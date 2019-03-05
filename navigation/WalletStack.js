import { createStackNavigator } from 'react-navigation'

import { Wallet } from '../screens/Wallet'
import { PasswordConfirmation } from '../screens/new_wallet/PasswordConfirmation'
import { Password } from '../screens/new_wallet/Password'
import { ImportSeed } from '../screens/new_wallet/ImportSeed'
import { RememberSeed } from '../screens/new_wallet/RememberSeed'
import { CheckSeed } from '../screens/new_wallet/CheckSeed'
import { ValidateSeed } from '../screens/new_wallet/ValidateSeed'

export default createStackNavigator({
  Wallet: Wallet,
  Password: Password,
  PasswordConfirmation: PasswordConfirmation,
  RememberSeed: RememberSeed,
  CheckSeed: CheckSeed,
  ValidateSeed: ValidateSeed,
  ImportSeed: ImportSeed
},  {
  initialRouteName: 'Wallet',
  navigationOptions: {
    tabBarLabel: 'Wallet',
  }
})