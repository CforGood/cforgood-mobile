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

/** Association **/
import AssociationDetailScreen from '../containers/Association/AssociationDetailScreen';
import AssociationFormScreen from '../containers/Association/AssociationFormScreen';

import BusinessDetailScreen from '../containers/Business/BusinessDetailScreen';

/** Per **/
import PerkListScreen from '../containers/Perk/PerkListScreen';
import PerkDetailScreen from '../containers/Perk/PerkDetailScreen';
import MapPerkScreen from '../containers/Perk/MapPerkScreen';
import PromoScreen from '../containers/Perk/PromoScreen';
import MembreshipCardScreen from '../containers/Perk/MembreshipCardScreen';
import ReservedSpaceScreen from '../containers/Perk/ReservedSpaceScreen';


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
