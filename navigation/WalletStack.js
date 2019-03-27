import { createStackNavigator } from 'react-navigation'

import { Transactions } from '../screens/wallet/Transactions'
import { RecoveryPhrase } from '../screens/settings/RecoveryPhrase'
import { WalletCreated } from '../screens/wallet/WalletCreated'
import { ScanQRCode } from '../screens/wallet/ScanQRCode'

export default createStackNavigator({
  Transactions: Transactions,
  ScanQRCode: ScanQRCode,
  RecoveryPhrase: RecoveryPhrase,
  WalletCreated: WalletCreated,
},  {
  initialRouteName: 'Transactions',
  navigationOptions: {
    tabBarLabel: 'Wallet',
  }
})