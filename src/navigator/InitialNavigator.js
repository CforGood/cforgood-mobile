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
import WebViewScreen from '../containers/WebViewScreen';

const Routes = {
  Splash: {
    
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
  WebView: {
    name: 'WebView',
    screen: WebViewScreen,
  }
};
 
export default AppNavigator = StackNavigator(
  {
    ...Routes,
  },
  {
    headerMode: 'screen',
    navigationOptions: {
      cardStack:{
        gesturesEnabled: false,
      },
      header: null,
    },
    mode: Platform.OS ==='ios' ? 'modal' : 'card',
    cardStyle: {
      backgroundColor: 'transparent',
    }
  }
);
