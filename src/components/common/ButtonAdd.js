import PropTypes from 'prop-types';
import React, { PureComponent, } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image
} from 'react-native';

import {
  styles,
  colors,
  fonts,
  metrics,
} from '../../themes';

export default class ButtonAdd extends PureComponent {

  static propTypes = {
    styleButtonAdd: PropTypes.any,
    styleText: PropTypes.any,
    text: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
  };

  static defaultProps = {
    onPress: () => { },
    styleButtonAdd: {},
    styleText: {},
  };

  render() {
    const { onPress } = this.props;
    return (
      <TouchableOpacity
        activeOpacity={0.63}
        onPress={onPress}
        style={[
          styles.spaceBetween,
          stylesButtonAdd.buttonContainer,
          this.props.styleButton,
        ]}
      >
        <View style={{ flex: 1 }} />
        <View style={styles.center} >
          <Text
            style={[
              fonts.style.textButton,
              this.props.styleText,
            ]}
          >
            {this.props.text}
          </Text>
        </View>
        <View style={[styles.center, { flex: 1 }]} >
          <Image
            source={require('../../resources/icons/big-plus-sign.png')}
            style={[
              stylesButtonAdd.icon,
              {
                tintColor: colors.blueAssociation
              }
            ]}
          />
        </View>
      </TouchableOpacity>
    );
  }
}

const stylesButtonAdd = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.buttonColor,
    borderRadius: metrics.radius,
    height: metrics.buttonHeight,
  },
  icon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    marginTop: 2,
    marginHorizontal: metrics.baseMargin,
  },
});                               