import { createStackNavigator } from 'react-navigation'

import { WalletScreen } from '../screens/WalletScreen'
import { Transactions } from '../screens/wallet/Transactions'
import { PasswordConfirmation } from '../screens/new_wallet/PasswordConfirmation'
import { Password } from '../screens/new_wallet/Password'
import { ImportSeed } from '../screens/new_wallet/ImportSeed'
import { CheckSeed } from '../screens/new_wallet/CheckSeed'
import { UserWarning } from '../screens/new_wallet/UserWarning'
import { ValidateSeed } from '../screens/new_wallet/ValidateSeed'
import { Error } from '../screens/new_wallet/Error'

export default createStackNavigator({
  WalletScreen: WalletScreen,
  Password: Password,
  PasswordConfirmation: PasswordConfirmation,
  CheckSeed: CheckSeed,
  UserWarning: UserWarning,
  ValidateSeed: ValidateSeed,
  ImportSeed: ImportSeed,
  Transactions: Transactions,
  Error: Error
},  {
  initialRouteName: 'WalletScreen',
  navigationOptions: {
    tabBarLabel: 'Wallet',
  }
})