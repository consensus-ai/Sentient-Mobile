import { createStackNavigator } from 'react-navigation'

import { Password } from '../screens/new_wallet/Password'
import { PasswordConfirmation } from '../screens/new_wallet/PasswordConfirmation'
import { ImportSeed } from '../screens/new_wallet/ImportSeed'
import { ScanQRSeed } from '../screens/new_wallet/ScanQRSeed'
import { Error } from '../screens/new_wallet/Error'

export default createStackNavigator({
  Password: Password,
  PasswordConfirmation: PasswordConfirmation,
  ImportSeed: ImportSeed,
  ScanQRSeed: ScanQRSeed,
  Error: Error
},  {
  initialRouteName: 'Password'
})