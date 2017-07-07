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
import WebViewScreen from '../containers/WebViewScreen';

/* Authentification */
import SignInScreen from '../containers/Auth/SignInScreen';
import SignUpEmailScreen from '../containers/Auth/SignUpEmailScreen';
import SignUpFirstnameScreen from '../containers/Auth/SignUpFirstnameScreen';
import SignUpLastnameScreen from '../containers/Auth/SignUpLastnameScreen';
import SignUpPasswordScreen from '../containers/Auth/SignUpPasswordScreen';
import SignUpCodeScreen from '../containers/Auth/SignUpCodeScreen';
import LikeScreen from '../containers/Auth/LikeScreen';
import SignUpValidationScreen from '../containers/Auth/SignUpValidationScreen';


/* Association */
import AssociationScreen from '../containers/Association/AssociationListScreen';

/* CreditCard */
import ProfileCreditCardScreen from '../containers/CreditCard/ProfileCreditCardScreen';
import ProfilePayementScreen from '../containers/CreditCard/ProfilePayementScreen';


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
    screen: SignInScreen,
  },
  SignUpPassword: {
    screen: SignUpPasswordScreen,
  },
  SignUpLastname: {
    screen: SignUpLastnameScreen,
  },
  SignUpFirstname: {
    screen: SignUpFirstnameScreen,
  },
  SignUpCode: {
    screen: SignUpCodeScreen,
  },
  SignUpEmail: {
    screen: SignUpEmailScreen,
  },
  SignUpValidation: {
    screen: SignUpValidationScreen
  },
  Assocation: {
    screen: AssociationScreen,
  },
  CreditCard: {
    screen: ProfileCreditCardScreen,
  },
  Payment: {
    screen: ProfilePayementScreen,
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
