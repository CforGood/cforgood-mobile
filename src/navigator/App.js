// @flow
import React, { 
  Component,
} from 'react';
import {
  View
} from 'react-native';

import AppNavigator from './AppNavigator';

import PopupProfile from '../components/profile/PopupProfile';
import ReviewsScreen from '../containers/Perk/ReviewsScreen';
import PushController from  "../PushController";

class App extends Component {
  
  render () {
    return (
      <View style={{flex: 1}}>
        <PushController onChangeToken={() => {}} />
        <AppNavigator />
        <PopupProfile />
        <ReviewsScreen />
      </View>
    )
  }
};

export default App;
