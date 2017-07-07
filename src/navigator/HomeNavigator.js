import React from 'react';
import {
  Platform,
} from 'react-native';

import {
  StackNavigator,
  NavigationActions,
} from 'react-navigation';

import App from './App';

import TabNavigator from './TabNavigator';
import PerkListScreen from '../containers/PerkListScreen';
import AssociationDetailScreen from '../containers/AssociationDetailScreen';
import AssociationFormScreen from '../containers/AssociationFormScreen';
import BusinessDetailScreen from '../containers/BusinessDetailScreen';
import MapPerkScreen from '../containers/MapPerkScreen';
import ProfileScreen from '../containers/ProfileScreen';
import PerkDetailScreen from '../containers/PerkDetailScreen';
import WebViewScreen from '../containers/WebViewScreen';

import PromoScreen from '../containers/PromoScreen';
import MembreshipCardScreen from '../containers/MembreshipCardScreen';
import ReservedSpaceScreen from '../containers/ReservedSpaceScreen';




const Routes = {
  App: {
    name: 'App',
    screen: App,
  },
  BusinessDetail: {
    name: 'Business',
    screen: BusinessDetailScreen,
    path: 'business/:businessId/:addressId',
  },
  AssociationDetail: {
    name: 'Association',
    screen: AssociationDetailScreen,
    path: 'association/:associationId',
  },
  PerkDetail: {
    name: 'Perk',
    screen: PerkDetailScreen,
    path: 'perk/:businessId/:addressId/:perkId',
  },
  PerkList: {
    name: 'PerkList',
    screen: PerkListScreen,
    path: 'perks/:businessId/:addressId',
  },
  Profile: {
    name: 'Profile',
    screen: ProfileScreen,
    path: 'profile',
  },
  MapPerk: {
    name: 'MapPerk',
    screen: MapPerkScreen,
  },
  WebView: {
    name: 'WebView',
    screen: WebViewScreen,
  },
  AssociationForm: {
    name: 'Association',
    screen: AssociationFormScreen,
    path: 'new_association',
  },
  Maps: {
    name: 'Maps',
    screen: TabNavigator,
    path: 'app/:type',
  },
  Member: {
    name: 'Member',
    screen: MembreshipCardScreen,
  },
  Reserved: {
    name: 'Reserved',
    screen: ReservedSpaceScreen,
  },
  Promo: {
    name: 'Promo',
    screen: PromoScreen,
  },


};

const AppNavigator = StackNavigator(
  {
    ...Routes,
  },
  {
    headerMode: 'screen',
    navigationOptions: {
      header: null,
      cardStack: {
        gesturesEnabled: false,
      },
    },
    mode: Platform.OS === 'ios' ? 'modal' : 'card',
    cardStyle: {
      backgroundColor: 'transparent',
    },
  }
);

const prefix = Platform.OS == 'android' ? 'CforGood://cforgood/' : 'cforgood://';

export default () => <AppNavigator uriPrefix={prefix} />;
