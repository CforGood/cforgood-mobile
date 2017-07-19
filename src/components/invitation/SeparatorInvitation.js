import React, { PropTypes, PureComponent } from 'react';

import {
  View,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import {
  colors,
  metrics,
} from '../../themes';

class SeparatorInvitation extends PureComponent {

  static propTypes = {
    number: PropTypes.number,
    numberInvitaion: PropTypes.number,
  };

  static defaultProps = {
    number: 0,
    numberInvitaion: 5,
  };

  render() {
    const { number, numberInvitaion } = this.props;
    return (

      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        colors={['rgba(0,0,0,0.2)', 'rgba(0,0,0,0.01)']}
        style={{
          height: 5,
          flexDirection: 'row',
        }}
      >
        <View 
          style={{
            backgroundColor: colors.yellow,
            flex: number
          }} 
        />
        <View 
          style={{
            backgroundColor: number === 0 ? 'transparent' : 'rgba(248,231,28, 0.3)',
            flex: numberInvitaion - number
          }}
        />

      </LinearGradient >
    );
  }
}

export default SeparatorInvitation;
