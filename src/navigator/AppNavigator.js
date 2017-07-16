import {
  Platform,
  Animated,
  Easing,
} from 'react-native';

import {
  StackNavigator,
  NavigationActions,
} from 'react-navigation';

import TabNavigator from './TabNavigator';
import FilterScreen from '../containers/FiltersScreen';
import SearchScreen from '../containers/SearchScreen';

import AssociationDetailScreen from '../containers/Association/AssociationDetailScreen';
import AssociationFormScreen from '../containers/Association/AssociationFormScreen';

import BusinessDetailScreen from '../containers/Business/BusinessDetailScreen';

import PerkListScreen from '../containers/Perk/PerkListScreen';
import MapPerkScreen from '../containers/Perk/MapPerkScreen';
import MembreshipCardScreen from '../containers/Perk/MembreshipCardScreen';
import PromoScreen from '../containers/Perk/PromoScreen';
import PerkDetailScreen from '../containers/Perk/PerkDetailScreen';
import ReservedSpaceScreen from '../containers/Perk/ReservedSpaceScreen';

import ProfileScreen from '../containers/ProfileScreen';
import WebViewScreen from '../containers/WebViewScreen';

const Routes = {

  Maps: {
    name: 'Maps',
    screen: TabNavigator,
    path: 'app/:type',
  },
  Filter: {
    name: 'Filter',
    screen: FilterScreen,
  },
  Search: {
    name: 'Filter',
    screen: SearchScreen,
  },
  AssociationForm: {
    name: 'Association',
    screen: AssociationFormScreen,
    path: 'new_association',
  },
  BusinessDetail: {
    name: 'Business',
    screen: BusinessDetailScreen,
    path: 'business/:businessId/:addressId',
  },
  PerkDetail: {
    name: 'Perk',
    screen: PerkDetailScreen,
    path: 'perk/:businessId/:addressId/:perkId',
  },
  AssociationDetail: {
    name: 'Association',
    screen: AssociationDetailScreen,
    path: 'association/:associationId',
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

export default AppNavigator = StackNavigator(
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
    initialRouteName: 'Maps', //Map
    cardStyle: {
      backgroundColor: 'transparent',
    },
  }
);
