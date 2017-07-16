// @flow
import React, {
  Component,
} from 'react';
import {
  AsyncStorage,
  AppState,
} from 'react-native';
import {
  Provider,
  connect
} from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';
import RNCodePush from "react-native-code-push";
import {
  persistStore,
} from 'redux-persist';

import configureStore from './redux/create';
import MyApp from './MyApp';

const store = configureStore();

connect(state => ({
  nav: state.nav,
}))
class AppWithNavigationState extends React.Component {

  componentDidMount() {
    persistStore(store, { whitelist: ['review', 'filters', 'location'], storage: AsyncStorage });
  }

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

class App extends Component {

  componentDidMount() {
    this.handleAppStateChange();
  }

  componentWillMount() {
    // Ensure that any CodePush updates which are
    // synchronized in the background can't trigger
    // a restart while this component is mounted.
    RNCodePush.disallowRestart();
  }

  componentWillUnmount() {
    // Reallow restarts, and optionally trigger
    // a restart if one was currently pending.
    RNCodePush.allowRestart();
  }

  handleAppStateChange(appState) {
    //console.log('CodePush.InstallMode.IMMEDIATE', CodePush.InstallMode.IMMEDIATE)
    RNCodePush.sync(
      {
        installMode: RNCodePush.InstallMode.IMMEDIATE,
        updateDialog: false
      },
      this.codePushStatusDidChange(),
    );
  }

  codePushStatusDidChange = (syncStatus) => {
    console.log('syncStatus', syncStatus)
    switch (syncStatus) {
      case RNCodePush.SyncStatus.CHECKING_FOR_UPDATE:
        this.setState({ syncMessage: "Checking for update." });
        break;
      case RNCodePush.SyncStatus.DOWNLOADING_PACKAGE:
        this.setState({ syncMessage: "Downloading package." });
        break;
      case RNCodePush.SyncStatus.AWAITING_USER_ACTION:
        this.setState({ syncMessage: "Awaiting user action." });
        break;
      case RNCodePush.SyncStatus.INSTALLING_UPDATE:
        this.setState({ syncMessage: "Installing update." });
        break;
      case RNCodePush.SyncStatus.UP_TO_DATE:
        this.setState({ syncMessage: "App up to date.", progress: false });
        break;
      case RNCodePush.SyncStatus.UPDATE_IGNORED:
        this.setState({ syncMessage: "Update cancelled by user.", progress: false });
        break;
      case RNCodePush.SyncStatus.UPDATE_INSTALLED:
        this.setState({ syncMessage: "Update installed.", progress: false });
        break;
      case RNCodePush.SyncStatus.UNKNOWN_ERROR:
        this.setState({ syncMessage: "An unknown error occurred.", progress: false });
        break;
    }
  }

  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    )
  }
};

export default RNCodePush({
  checkFrequency: RNCodePush.CheckFrequency.ON_APP_RESUME,
})(App);
