import React, {
  PropTypes,
  PureComponent,
} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import {
  styles,
  colors,
  fonts,
  metrics,
} from '../../themes';

export default class Button extends PureComponent {

  static propTypes = {
    styleButton: PropTypes.any,
    styleText: PropTypes.any,
    text: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
  };

  static defaultProps = {
    onPress: () => {},
    styleButton: {},
    styleText: {},
  };

  render() {
    const { onPress } = this.props;
    return (
      <TouchableOpacity
        activeOpacity={0.63}
        onPress={onPress}
        style={[
          stylesButton.buttonContainer,
          this.props.styleButton,
        ]}
      >
        <Text
          style={[
            fonts.style.textButton,
            this.props.styleText,
          ]}
        >
          {this.props.text}
        </Text>
      </TouchableOpacity>
    );
  }
}

const stylesButton = StyleSheet.create({ 
  buttonContainer:{    
    backgroundColor: colors.buttonColor, 
    borderRadius: metrics.radius,
    height: metrics.buttonHeight,
    justifyContent: 'center',
    paddingHorizontal: metrics.baseMargin
  },
});                               