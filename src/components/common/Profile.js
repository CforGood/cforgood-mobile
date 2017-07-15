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

export default class Profile extends Component {

  static propTypes = {
    width: PropTypes.number,
    image: PropTypes.any,
    styleProfile: PropTypes.any,
    onPress: PropTypes.func,
    borderWidth: PropTypes.number,
    borderColor: PropTypes.string,
  };

  static defaultProps = {
    image: null,
    width: 50,
    borderWidth: 1,
    borderColor: colors.gray90,
    styleProfile: {},
  };

  render() {

    const {
      image,
      onPress,
      width,
      border,
      borderColor,
      borderWidth,
      styleProfile,
    } = this.props;

    return (
      <TouchableOpacity
        style={[
          style.container,
          styles.center,
          styleProfile,
          {
            borderColor,
            borderWidth,
            width: width,
            height: width,
            borderRadius: width / 2,
            backgroundColor: 'white',
          }
        ]}
        onPress={onPress}
      >
        <Image
          style={
            image !== null ?
              {
                flex: 1
              }
              :
              {
                width: 30,
                height: 30,
              }
          }
          resizeMode={image !== null ? 'cover' : 'contain'}
          source={image !== null ? { uri: image } : require('../../resources/profile/profile.png')}
        />
      </TouchableOpacity>
    );
  }
}

const style = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginHorizontal: metrics.smallMargin / 2
  },
})
