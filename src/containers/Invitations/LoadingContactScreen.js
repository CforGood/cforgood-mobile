import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import Background from '../../components/common/Background';

import {
  styles,
  colors,
  metrics,
  fonts,
} from '../../themes';

export default class LoadingContactScreen extends Component {

  render() {
    return (
      <Background
        style={{
          flex: 1,
          alignItems: 'center',
        }}>
        <View style={{ flex: 2 }} />
        <View style={{ flex: 1 }} >
          <Text style={style.title}>
            Chargement des contacts
        </Text> 
        </View>
      </Background>
    );
  }
}

const style = StyleSheet.create({
  title: {
    color: colors.white,
    fontSize: 18,
  },
});   
