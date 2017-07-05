import React, {
  PropTypes,
  PureComponent,
} from 'react';

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
    styleButton: PropTypes.any,
  };

  static defaultProps = {
    onPress: () => { },
    text: 'Appliquer',
    styleButton: {}
  };

  render() {
    
    const {
      onPress,
      text,
      styleButton
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
          }}
          styleText={{
            marginHorizontal: metrics.doubleBaseMargin,
          }}
        />
      </LinearGradient>
    );
  }
}
