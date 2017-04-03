// @flow
import React, { 
  Component,
} from 'react';
import { AsyncStorage, AppState } from 'react-native';
import { 
  Provider,
  connect
} from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';
import CodePush from "react-native-code-push";

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

CodePush({ 
  checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
})
class App extends Component {
  state = { restartAllowed: true }

  componentDidMount() {
    this.handleAppStateChange()
  }

  codePushStatusDidChange = (syncStatus) => {
    console.log('syncStatus', syncStatus)
    switch(syncStatus) {
      case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
        this.setState({ syncMessage: "Checking for update." });
        break;
      case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
        this.setState({ syncMessage: "Downloading package." });
        break;
      case CodePush.SyncStatus.AWAITING_USER_ACTION:
        this.setState({ syncMessage: "Awaiting user action." });
        break;
      case CodePush.SyncStatus.INSTALLING_UPDATE:
        this.setState({ syncMessage: "Installing update." });
        break;
      case CodePush.SyncStatus.UP_TO_DATE:
        this.setState({ syncMessage: "App up to date.", progress: false });
        break;
      case CodePush.SyncStatus.UPDATE_IGNORED:
        this.setState({ syncMessage: "Update cancelled by user.", progress: false });
        break;
      case CodePush.SyncStatus.UPDATE_INSTALLED:
        this.setState({ syncMessage: "Update installed.", progress: false });
        break;
      case CodePush.SyncStatus.UNKNOWN_ERROR:
        this.setState({ syncMessage: "An unknown error occurred.", progress: false });
        break;
    }
  }

  componentWillUnMount() {
    this.handleAppStateChange()
  }


  handleAppStateChange(appState) {
    //console.log('CodePush.InstallMode.IMMEDIATE', CodePush.InstallMode.IMMEDIATE)
    CodePush.sync(
      {
        installMode: CodePush.InstallMode.IMMEDIATE,
        updateDialog: false
      },
      this.codePushStatusDidChange(),
    );
  }


  render () {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    )
  }
};

export default App;
