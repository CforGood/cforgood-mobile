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
  };

  static defaultProps = {
    image: null,
    width: 50, 
    border: 1,
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
      styleProfile, 
    } = this.props;

    return (
      <TouchableOpacity
        style={[
          style.container,
          styles.center,
          styleProfile
        ]}
        onPress={onPress}
      > 
        <Image
          style={{
            borderColor: borderColor,
            borderWidth: border,
            width: width,
            height: width,
            borderRadius: width / 2,
          }}
          source={image !== null ? {uri:image}: require('../../resources/images/profile.jpg') }
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
