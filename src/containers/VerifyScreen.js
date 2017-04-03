import React, { PureComponent } from 'react';
import {
  AsyncStorage,
} from 'react-native';


class VerifyScreen extends PureComponent {

  async componentWillMount() {
    try {
      const value = await AsyncStorage.getItem('@CfoorGoodStore:firstOpen');
      if (value === null){
        this.props.navigation.navigate('Initial')
      }
      else{
        this.props.navigation.navigate('Maps')
      }
      
    } catch (error) {
      // Error retrieving data
    }
  }

  render() {
    return null;
  }
}

export default VerifyScreen;
