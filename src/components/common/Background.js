/**
 * @flow
 */

import React, { PureComponent, PropTypes } from 'react';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { colors } from '../../themes';

export default class Background extends PureComponent {

  static propTypes = {
    colors: PropTypes.array,
    style: PropTypes.object,
  };

  static defaultProps = {
    colors: colors.gradientColor,
    style: {}
  };

  render() {
    const { colors, style } = this.props;
    return (
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={colors}
        style={style}
      >
        {this.props.children}
      </LinearGradient>
    );
  }
}
