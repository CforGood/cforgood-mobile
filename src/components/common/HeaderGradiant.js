/**
 * @flow
 */

import React, { PureComponent, PropTypes } from 'react';
import { View } from 'react-native';


import { colors, metrics } from '../../themes';
import Background from './Background';

export default class HeaderGradiant extends PureComponent {

  static propTypes = {
    type: PropTypes.string,
    style: PropTypes.object,
  };

  static defaultProps = {
    type: 'gradiant',
    style: {
      height: metrics.navBarHeight,
      justifyContent: 'center',
    }
  };

  render() {
    const { style, type } = this.props;
    return (
      type === 'gradiant' ?
        <Background style={style}>
          {this.props.children}
        </Background>
        :
        <View style={style}>
          {this.props.children}
        </View>
    );
  }
}
