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

/* Authentification */
import SingInScreen from '../containers/Auth/SingInScreen';
import SingUpEmailScreen from '../containers/Auth/SingUpEmailScreen';
import SingUpFirstnameScreen from '../containers/Auth/SingUpFirstnameScreen';
import SingUpLastnameScreen from '../containers/Auth/SingUpLastnameScreen';
import SingUpPasswordScreen from '../containers/Auth/SingUpPasswordScreen';
import SingUpCodeScreen from '../containers/Auth/SingUpCodeScreen';
import LikeScreen from '../containers/Auth/LikeScreen';
import ValidationScreen from '../containers/Auth/ValidationScreen';

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
  SingUpPassword: {
    screen: SingUpPasswordScreen,
  },
  SingUpLastname: {
    screen: SingUpLastnameScreen,
  },
  SingUpFirstname: {
    screen: SingUpFirstnameScreen,
  },
  SingupCode: {
    screen: SingUpCodeScreen,
  },
  SingUpEmail: {
    screen: SingUpEmailScreen,
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
      cardStack: {
        gesturesEnabled: false,
      },
      header: null,
    },
    mode: 'card',
    cardStyle: {
      backgroundColor: 'transparent',
    }
  }
);
