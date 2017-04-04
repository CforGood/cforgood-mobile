// @flow
import React, { 
  Component,
} from 'react';
import { View } from 'react-native';

import FirebaseCrash from 'react-native-firebase-crash-report';
import { connect } from 'react-redux';

import HomeNavigator from './navigator/HomeNavigator';
import LoginNavigator from './navigator/InitialNavigator';
import Intercom from './Intercom';
import Branch from './branch';
import PushController from  "./PushController";

import { 
  accessTokenMapBox,
} from './config.json';

class MyApp extends Component {
  
  compnentWillMount() {
    FirebaseCrash.log('LOAD APP');
  }

  render () {
    return (
      <View style={{flex: 1}}>
        {
          this.props.isLoggedIn ?
          <HomeNavigator />
          :
          <LoginNavigator />
        }
        <Branch />
        <Intercom />
        <PushController onChangeToken={() => {}} />
      </View>
    )
  }
};

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn
});

export default connect(mapStateToProps)(MyApp);
