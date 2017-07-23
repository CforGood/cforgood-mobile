import PropTypes from 'prop-types'; import React, {  PureComponent, } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import {
  styles,
  colors,
  fonts,
} from '../../themes';

export default class AddButton extends PureComponent {

  static propTypes = {
    onPress: PropTypes.func.isRequired,
  };

  static defaultProps = {
    onPress: () => { },
  };

  render() {
    const { mode } = this.props;
    return (
      <TouchableOpacity
        style={[
          styles.screen.container,
        ]}
      >
        <Text
          style={{
            fontSize: fonts.size.large,
            color: mode === 'light' ? colors.white : colors.darkGray,
          }}
        >
          +
        </Text>
      </TouchableOpacity>
    );
  }
}

