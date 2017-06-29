import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

import Background from '../../components/common/Background';

import Validation from '../../components/Modal/Validation';
import styleLocal from './style';

import {
  styles,
  colors,
  metrics,
  fonts,
} from '../../themes';

export default class ValidationScreen extends Component {

  render() {
    return (
      <Background style={{
        flex: 1,
        paddingHorizontal: metrics.baseMargin,
        paddingVertical: metrics.baseMargin,
        paddingTop: metrics.doubleBaseMargin
      }}>
        <Validation 
          firstText={'Heureux de vous'}
          secondText={'retrouver'}
          name={'Allah'}
        />
      </Background>
    );
  }
}


