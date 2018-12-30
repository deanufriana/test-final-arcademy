import { createStackNavigator, createAppContainer } from 'react-navigation'
import { HomeScreen, AddProducts, LoginRegister } from './app/screen'


const App = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        header: null
      }
    },
    AddProducts: {
      screen: AddProducts
    },
    LoginRegister: {
      screen: LoginRegister
    }
  },
  {
    initialRouteName: 'Home'
  }
)

export default createAppContainer(App)