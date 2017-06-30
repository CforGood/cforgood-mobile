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
import PerkListScreen from '../containers/PerkListScreen';
import AssociationDetailScreen from '../containers/AssociationDetailScreen';
import AssociationFormScreen from '../containers/AssociationFormScreen';
import BusinessDetailScreen from '../containers/BusinessDetailScreen';
import MapPerkScreen from '../containers/MapPerkScreen';
import ProfileScreen from '../containers/ProfileScreen';
import ProfileCreditCardScreen from '../containers/ProfileCreditCardScreen';
import PerkDetailScreen from '../containers/PerkDetailScreen';
import WebViewScreen from '../containers/WebViewScreen';
import MembreshipCardScreen from '../containers/MembreshipCardScreen';
import PromoScreen from '../containers/PromoScreen';
import ReservedSpaceScreen from '../containers/ReservedSpaceScreen';

/* Authentification */
import SingInScreen from '../containers/Auth/SingInScreen';
import SingUpScreen from '../containers/Auth/SingUpScreen';
import LikeScreen from '../containers/Auth/LikeScreen';
import ValidationScreen from '../containers/Auth/ValidationScreen';

/* Invitations*/
import LoadingContactScreen from '../containers/Invitations/LoadingContactScreen';
import ListInvitationScreen from '../containers/Invitations/ListInvitationScreen';

/* Modal */
import ModalPopup from '../containers/Modal/ModalPopup';

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
  ProfileCreditCard: {
    name: 'ProfileCreditCard',
    screen: ProfileCreditCardScreen,
    path: 'profileCredit',
  },
  SingIn: {
    name: 'SingIn',
    screen: SingInScreen,
    path: 'SingIn',
  },
  Validation: {
    name: 'Validation',
    screen: ValidationScreen,
    path: 'Validation',
  },
  SingUp: {
    name: 'SingUp',
    screen: SingUpScreen,
    path: 'SingUp',
  },
  LoadingContact: {
    name: 'LoadingContact',
    screen: LoadingContactScreen,
    path: 'LoadingContact',
  },
  Like: {
    name: 'Like',
    screen: LikeScreen,
    path: 'Like',
  },
  ListInvitation: {
    name: 'ListInvitation',
    screen: ListInvitationScreen,
    path: 'ListInvitation',
  },
  Modal: {
    name: 'Modal',
    screen: ModalPopup,
    path: 'Modal',
  }
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
    initialRouteName: 'Modal', //Map
    cardStyle: {
      backgroundColor: 'transparent',
    },
  }
);
