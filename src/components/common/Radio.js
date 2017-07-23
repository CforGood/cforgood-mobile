import PropTypes from 'prop-types'; import React, {  PureComponent, } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import {
  metrics,
  colors,
} from '../../themes';

export default class Radio extends PureComponent {

  static propTypes = {
    onPress: PropTypes.func.isRequired,
    checked: PropTypes.any,
  };

  static defaultProps = {
    onPress: () => { },
    checked: false,
  };

  render() {
    const { onPress, checked } = this.props;
    return (
      <TouchableOpacity
        activeOpacity={0.63}
        onPress={onPress}
      >
        <View style={[
          stylesRadio.radio,
          this.props.checked === true ? stylesRadio.checked : stylesRadio.deChecked
        ]}
        />
      </TouchableOpacity>
    );
  }
}

const stylesRadio = StyleSheet.create({
  radio: {
    width: metrics.buttonHeight / 2.5,
    height: metrics.buttonHeight / 2.5,
    borderRadius: metrics.buttonHeight / 5,
    marginHorizontal: metrics.baseMargin,
  },
  checked: {
    backgroundColor: colors.lightBlue,
  },
  deChecked: {
    backgroundColor: colors.white,
    borderColor: colors.gray,
    borderWidth: 1,
  }
});                               