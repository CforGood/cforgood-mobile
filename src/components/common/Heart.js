import PropTypes from 'prop-types'; import React, {  PureComponent, } from 'react';
import {
  StyleSheet,
  Image,
} from 'react-native';

import {
  styles,
  colors,
  fonts,
  metrics,
} from '../../themes';

class Heart extends PureComponent {

  static propTypes = {
    liked: PropTypes.bool
  };

  render() {
    return (
      this.props.liked ?
        <Image
          source={require('../../resources/icons/like.png')}
          style={{
            height: 25,
            width: 26,
            resizeMode: 'contain',
            tintColor: colors.white,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 10,
          }}
        >
          <Image
            source={require('../../resources/icons/like.png')}
            style={{
              height: 24,
              width: 25,
              resizeMode: 'contain',
              tintColor: colors.red,
            }}
          />
        </Image>
        :
        <Image
          source={require('../../resources/icons/likeBorder.png')}
          style={{
            height: 25,
            width: 26,
            resizeMode: 'contain',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 10,
          }}
        />

    );
  }
}

export default Heart;
