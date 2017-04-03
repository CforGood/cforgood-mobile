import {
  NavigationActions,
} from 'react-navigation';
import {
  NAVIGATE,
} from '../constants/nav.js';

import AppNavigator from '../../navigator/AppNavigator';

const initialNavState = {
  index: 0,
  routes: [
    { key: 'App', routeName: 'App' },
    { key: 'Maps', routeName: 'Maps' },
    { key: 'Profile', routeName: 'Profile' },
    { key: 'WebView', routeName: 'WebView' },
    { key: 'Association', routeName: 'Association' },
    
  ],
};

const nav = (state = initialNavState, action) => {
  //if (action.type === 'Login') {
  //  return AppNavigator.router.getStateForAction(NavigationActions.back(), state);
  //}
  if (action.type === 'Logout') {
    return AppNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'Home' }), state);
  }
  else if (action.type === 'Profile') {
    return AppNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'Profile' }), {tab: 'member'});
  }
  else if (action.type === NAVIGATE) {
    return AppNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'Association' }));
  }
  return AppNavigator.router.getStateForAction(action, state);
};

export default nav;