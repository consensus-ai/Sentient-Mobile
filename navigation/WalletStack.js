import { createStackNavigator } from 'react-navigation'

import { WalletScreen } from '../screens/WalletScreen'
import { Transactions } from '../screens/wallet/Transactions'
import { PasswordConfirmation } from '../screens/new_wallet/PasswordConfirmation'
import { Password } from '../screens/new_wallet/Password'
import { ImportSeed } from '../screens/new_wallet/ImportSeed'
import { RecoveryPhrase } from '../screens/new_wallet/RecoveryPhrase'
import { WalletCreated } from '../screens/new_wallet/WalletCreated'
import { ScanQRCode } from '../screens/wallet/ScanQRCode'
import { Error } from '../screens/new_wallet/Error'

export default createStackNavigator({
  WalletScreen: WalletScreen,
  Password: Password,
  PasswordConfirmation: PasswordConfirmation,
  RecoveryPhrase: RecoveryPhrase,
  WalletCreated: WalletCreated,
  ImportSeed: ImportSeed,
  Transactions: Transactions,
  ScanQRCode: ScanQRCode,
  Error: Error
},  {
  initialRouteName: 'WalletScreen',
  navigationOptions: {
    tabBarLabel: 'Wallet',
  }
})