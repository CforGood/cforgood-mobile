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

/* Authentification */
import SignInEmailScreen from '../containers/Auth/SignInEmailScreen';
import SignInPasswordScreen from '../containers/Auth/SignInPasswordScreen';
import SignInValidationScreen from '../containers/Auth/SignInValidationScreen';

import SignUpEmailScreen from '../containers/Auth/SignUpEmailScreen';
import SignUpFirstnameScreen from '../containers/Auth/SignUpFirstnameScreen';
import SignUpLastnameScreen from '../containers/Auth/SignUpLastnameScreen';
import SignUpPasswordScreen from '../containers/Auth/SignUpPasswordScreen';
import SignUpCodeScreen from '../containers/Auth/SignUpCodeScreen';
import SignUpValidationScreen from '../containers/Auth/SignUpValidationScreen';


/* Association */
import ChooseAssociationScreen from '../containers/Association/ChooseAssociationScreen';


/* CreditCard */
import ProfileCreditCardScreen from '../containers/CreditCard/ProfileCreditCardScreen';
import ProfilePayementScreen from '../containers/CreditCard/ProfilePayementScreen';

/* Invitations */
import LoveScreen from '../containers/Invitations/LoveScreen';
import ContactsScreen from '../containers/Invitations/ContactsScreen';


const Routes = {
  Splash: {
    screen: SplashScreen,
  },
  Onboarding: {
    screen: OnboardingScreen,
  },
  Login: {
    screen: SignInEmailScreen,
  },
  SignInPassword: {
    screen: SignInPasswordScreen,
  },
  SignInValidation: {
    screen: SignInValidationScreen,
  },
  SignUpPassword: {
    screen: SignUpPasswordScreen,
  },
  SignUpLastname: {
    screen: SignUpLastnameScreen,
  },
  Home: {
    screen: SignUpFirstnameScreen,
  },
  SignUpCode: {
    screen: SignUpCodeScreen,
  },
  SignUpEmail: {
    screen: SignUpEmailScreen,
  },
  InvitationLove: {
    screen: LoveScreen
  },
  InvitationContacts: {
    screen: ContactsScreen,
  },
  ChooseAssociation: {
    screen: ChooseAssociationScreen,
  },
  CreditCard: {
    screen: ProfileCreditCardScreen,
  },
  Payment: {
    screen: ProfilePayementScreen,
  },
  SignUpValidation: {
    screen: SignUpValidationScreen
  },  
};

export default StackNavigator(
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
    //initialRouteName: '', //xxxxx
    mode: 'card',
    cardStyle: {
      backgroundColor: 'transparent',
    }
  }
);
