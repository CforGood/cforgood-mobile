import React, {
  PropTypes,
  Component,
} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
  Text,
} from 'react-native';

import {
  colors,
  metrics,
  styles,
  fonts,
} from '../../themes';

const style = StyleSheet.create({
  container: {
    justifyContent: 'center',
    margin: metrics.smallMargin / 2
  },
  text: {
    color: colors.blue,
    marginTop: metrics.baseMargin
  }
})

export default class IconImage extends Component {

  static propTypes = {
    width: PropTypes.number,
    image: PropTypes.any,
    text: PropTypes.string,
    tintColor: PropTypes.string,
    backgroundColor: PropTypes.string,
    onPress: PropTypes.func,
    iconStyle: PropTypes.any,
    border: PropTypes.number,
    borderColor: PropTypes.string
  };

  static defaultProps = {
    image: null,
    width: 20,
    text: "",
    tintColor: null,
    backgroundColor: colors.transparent,
    iconStyle: {},
    border: 0,
    borderColor: colors.white
  };

  render() {

    const {
      image,
      onPress,
      width,
      text,
      tintColor,
      backgroundColor,
      iconStyle,
      border,
      borderColor
    } = this.props;

    return (
      <View style={styles.center}>
        <TouchableOpacity
          style={[
            style.container,
            styles.center,
            {
              backgroundColor: backgroundColor,
              width: width,
              height: width,
              borderRadius: width / 2,
              borderWidth: backgroundColor !== "transparent" ? 3 : 0,
              borderColor: borderColor !== "transparent" ? borderColor : "transparent",
            },
            iconStyle
          ]}
          onPress={onPress}
          activeOpacity={1}
        >
          <Image
            resizeMode={'contain'}
            style={[{
              width: width - border * 3,
              height: width - border * 3,
            },
            tintColor ? { tintColor } : {}
            ]}
            source={image}
          />
        </TouchableOpacity>
        {
          text !== "" &&
          <Text style={[
            fonts.style.t14,
            style.text
          ]}>
            {text}
          </Text>
        }
      </View>
    );
  }
}