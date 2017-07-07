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

import Icon from '../common/Icon';
import {
  styles,
  colors,
  fonts,
  metrics,
} from '../../themes';

export default class Validation extends PureComponent {

  static propTypes = {
    firstText: PropTypes.string,
    secondText: PropTypes.string,
    name: PropTypes.string,
    onPress: PropTypes.func
  };

  static defaultProps = {
    firstText: '',
    secondText: '',
    name: '',
    onPress: () => { },
  };

  render() {

    const {
      firstText,
      secondText,
      name,
      onPress
    } = this.props;

    return (
      <View style={[
        styles.center,
        { flex: 1 }
      ]}>
        <Icon
          styleImage={{
            width: 100,
          }}
          source={require('../../resources/icons/checked.png')}
          onPress={() => { }}
        />
        <Text style={[
          style.textValidation,
          { marginVertical: metrics.doubleBaseMargin }
        ]}>
          {firstText}
        </Text>
        <View style={[
          styles.center,
          { flexDirection: 'row' }
        ]}>
          <Text style={style.textValidation}>
            {secondText}
          </Text>
          <Text style={[
            style.textValidation,
            fonts.style.bold,
            { marginLeft: metrics.smallMargin }
          ]}>
            {name}
          </Text>
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  textValidation: {
    color: colors.white,
    fontSize: 16,
  },

});                               