// @flow
import React, { 
  Component,
} from 'react';
import { 
  AsyncStorage,
  AppState,
  Platform
} from 'react-native';
import { 
  Provider,
  connect
} from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';
import {
  persistStore,
} from 'redux-persist';

import configureStore from './redux/create';
import MyApp from './MyApp';

const store = configureStore();

connect(state => ({
  nav: state.nav,
}))
class AppWithNavigationState extends Component {
  render() {
    return (
      <MyApp 
        navigation={addNavigationHelpers({
          dispatch: this.props.dispatch,
          state: this.props.nav,
        })} 
      />
    );
  }
}

export default class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    )
  }
};


