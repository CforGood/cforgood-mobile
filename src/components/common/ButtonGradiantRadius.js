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
  };

  static defaultProps = {
    onPress: () => { },
    text: 'Appliquer',
  };

  render() {
    const {
      onPress,
      text,
    } = this.props;
    return (
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        colors={['transparent', 'rgba(0,0,0,0.2)']}
        style={[
          {
            height: 46,
            borderRadius: 22,
            width: 126,
          },
        ]}
      >
        <ButtonGradiant
          onPress={onPress}
          text={text}
          styleButton={{
            height: 44,
            borderRadius: 22,
          }}

          style={{
            flex: 1,
            marginHorizontal: 1,
            marginTop: 1,
            marginBottom: 1.5,
          }}
        />
      </LinearGradient>
    );
  }
}
