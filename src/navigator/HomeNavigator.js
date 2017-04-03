import { 
  Platform,
  Animated,
  Easing,
} from 'react-native';

import {
  StackNavigator,
  NavigationActions,
} from 'react-navigation';
 
import InitialNavigator from './InitialNavigator';
import App from './App';

import PerkListScreen from '../containers/PerkListScreen';
import AssociationDetailScreen from '../containers/AssociationDetailScreen';
import AssociationFormScreen from '../containers/AssociationFormScreen';
import BusinessDetailScreen from '../containers/BusinessDetailScreen';
import MapPerkScreen from '../containers/MapPerkScreen';
import ProfileScreen from '../containers/ProfileScreen';
import WebViewScreen from '../containers/WebViewScreen';


const Routes = {

  App: {
    name: 'App',
    screen: App,
  },
  BusinessDetail: {
      name: 'Business',
      screen: BusinessDetailScreen,
      path: 'business/:businessId',
    },
    AssociationDetail: {
      name: 'Association',
      screen: AssociationDetailScreen,
      path: 'association/:associationId',
    },
    PerkList: {
      name: 'PerkList',
      screen: PerkListScreen,
    },
    Profile: {
      name: 'Profile',
      screen: ProfileScreen,
    },
    MapPerk: {
      name: 'MapPerk',
      screen: MapPerkScreen,
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
    headerMode: 'none',
    navigationOptions: {
      cardStack:{
        gesturesEnabled: false,
      },
      header: () => ({
        visible: false,
      }),
    },
    mode: Platform.OS === 'ios'  ? 'modal' : 'card',
    direction: 'vertical',
    cardStyle: {
      backgroundColor: 'transparent',
    },
    containerOptions: {
      // on Android, the URI prefix typically contains a host in addition to scheme
      URIPrefix: Platform.OS == 'android' ? 'cforgood://cforgood/' : 'cforgood://',
    },
  }
);
