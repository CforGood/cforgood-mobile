import React, {
  PropTypes,
  PureComponent,
} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import Icon from './Icon';
import {
  metrics,
  colors,
} from '../../themes';

export default class RadioSelect extends PureComponent {

  static propTypes = {
    onPress: PropTypes.func.isRequired,
    checked: PropTypes.any,
  };

  static defaultProps = {
    onPress: () => { },
    checked: false,
  };

  render() {

    const {
        onPress,
      checked
    } = this.props;

    return (
      <TouchableOpacity
        activeOpacity={0.63}
        onPress={onPress}
      >
        <View style={[
          style.radio,
          checked === true
            ?
            style.checked
            :
            style.deChecked
        ]}
        >
          {
            checked === true &&
            <Icon
              style={{ width: 25 }}
              source={require('../../resources/icons/tick-inside-a-circle.png')}
            />
          }
        </View>
      </TouchableOpacity>
    );
  }
}

const style = StyleSheet.create({
  radio: {
    width: 25,
    height: 25,
    borderRadius: 25 / 2,
  },
  checked: {
    backgroundColor: colors.transparent,
  },
  deChecked: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderColor: colors.white,
    borderWidth: 1,
  }
});                               