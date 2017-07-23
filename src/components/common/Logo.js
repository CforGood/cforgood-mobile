import PropTypes from 'prop-types'; import React, {  PureComponent, } from 'react';

import {
  View,
  Text,
  Image
} from 'react-native';

import {
  fonts,
  metrics,
  styles,
} from '../../themes';

export default class Logo extends PureComponent {

  render() {
    const { mode } = this.props;
    return (
      <View style={styles.center}>
        <Image
          style={{
            height: metrics.images.logo,
            width: metrics.images.logo,
          }}
          resizeMode='contain'
          source={require('../../resources/images/logo.png')}
        />
        <Text style={[
          fonts.style.textWhite,
          fonts.style.h9,
          {
            width: metrics.deviceWidth,
            textAlign: 'center',
            paddingTop: metrics.baseMargin,
            height: metrics.deviceHeight / 16,
          }

        ]}
        >
          La carte de consommation positive
        </Text>
      </View>
    );
  }
}

