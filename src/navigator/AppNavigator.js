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
import WebViewScreen from '../containers/WebViewScreen';


const Routes = {

  Maps: {
    name: 'Maps',
    screen: TabNavigator,
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
  },
  BusinessDetail: {
    name: 'Business',
    screen: BusinessDetailScreen,
  },
  AssociationDetail: {
    name: 'Association',
    screen: AssociationDetailScreen,
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
  }
);
