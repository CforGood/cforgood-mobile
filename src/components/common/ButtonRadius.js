import PropTypes from 'prop-types';
import React, { PureComponent, } from 'react';

import {
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import ButtonGradiant from './ButtonGradiant';
import {
  colors,
  fonts,
  metrics,
} from '../../themes';

export default class ButtonGradiantRadius extends PureComponent {

  static propTypes = {
    onPress: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    styleButton: PropTypes.object,
    styleText: PropTypes.object,
  };

  static defaultProps = {
    onPress: () => { },
    text: 'Appliquer',
    styleButton: {},
    styleText: {},
  };

  render() {

    const {
      onPress,
      text,
      styleButton,
      styleText,
    } = this.props;

    return (
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        colors={['transparent', 'rgba(0,0,0,0.2)']}
        style={[
          {
            height: 44,
            borderRadius: 22,
            minWidth: 126,
          },
          styleButton
        ]}
      >
        <ButtonGradiant
          onPress={onPress}
          text={text}
          styleButton={{
            height: 42,
            borderRadius: 22,
          }}
          style={{
            flex: 1,
            marginHorizontal: 1,
            marginTop: 1,
            marginBottom: 1.5,
            backgroundColor: 'white',
            borderRadius: 22,
          }}
          styleText={{
            ...styleText,
            marginHorizontal: metrics.doubleBaseMargin,
          }}
          type={'simple'}
        />
      </LinearGradient>
    );
  }
}
