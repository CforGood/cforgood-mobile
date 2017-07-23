import PropTypes from 'prop-types'; import React, {  PureComponent, } from 'react';
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
    onPress: PropTypes.func,
    nextStep: PropTypes.func,
  };

  static defaultProps = {
    firstText: '',
    secondText: '',
    name: '',
    onPress: () => { },
    autoRedirect: true,
    nextStep: null,
  };


  render() {

    const {
      firstText,
      secondText,
      name,
      onPress,
      nextStep,
    } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }} />
        <View style={{ flex: 2, ...styles.center }}>
          <Icon
            styleImage={{
              width: 100,
              height: 100,
            }}
            source={require('../../resources/icons/checked.png')}
            onPress={() => { }}
          />
          <Text style={[
            fonts.style.t22,
            {
              marginVertical: metrics.doubleBaseMargin,
              color: 'white',
            }
          ]}>
            {firstText}
          </Text>
          <View style={[
            styles.center,
            { flexDirection: 'row' }
          ]}>
            <Text style={[
              fonts.style.t22,
              {
                marginVertical: metrics.doubleBaseMargin,
                color: 'white',
              }
            ]}
            >
              {secondText}
              <Text style={fonts.style.bold}>
                {name}
              </Text>
            </Text>
          </View>
          <View>
            {
              nextStep &&
              <Icon
                style={{
                  marginVertical: 50
                }}
                styleImage={{
                  width: 60,
                  height: 60,
                  tintColor: 'white'
                }}
                source={require('../../resources/icons/arrow-right.png')}
                onPress={nextStep}
                borderColor={colors.transparent}
              />
            }
          </View>
        </View>
      </View >
    );
  }
}
