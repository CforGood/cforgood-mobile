import { 
  Platform,
  Animated,
  Easing,
} from 'react-native';

import {
  StackNavigator,
} from 'react-navigation';

import SplashScreen from '../containers/SplashScreen';
import OnboardingScreen from '../containers/OnboardingScreen';
import HomeScreen from '../containers/HomeScreen';
import LoginScreen from '../containers/LoginScreen';
import SignupScreen from '../containers/SignupScreen';


const Routes = {
  Splash: {
    navigationOptions: {
      header: {
        visible: false,
      },
    },
    name: 'Splash',
    description: 'Splash',
    screen: SplashScreen,
  },
  Onboarding: {
    name: 'Onboarding',
    navigationOptions: {
      title: 'Onboarding',
    },
    description: 'Onboarding',
    screen: OnboardingScreen,
  },
  Home: {
    name: 'Home',
    navigationOptions: {
      title: 'Home',
    },
    description: 'Home',
    screen: HomeScreen,
  },
  Login: {
    name: 'Login',
    navigationOptions: {
      title: 'Login',
    },
    description: 'Login',
    screen: LoginScreen,
  },
  Signup: {
    name: 'Signup',
    navigationOptions: {
      title: 'Signup',
    },
    description: 'Signup',
    screen: SignupScreen,
  },
};
 
export default AppNavigator = StackNavigator(
  {
    ...Routes,
  },
  {
    headerMode: 'none',
    navigationOptions: {
      cardStack:{
        gesturesEnabled: false,
      },
      header: () => ({
        visible: false,
      }),
    },
    mode: Platform.OS ==='ios' ? 'modal' : 'card',
    direction: 'vertical',
    cardStyle: {
      backgroundColor: 'transparent',
    }
  }
);
