import PropTypes from 'prop-types'; import React, {  PureComponent, } from 'react';

import {
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  View
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import {
  colors,
  fonts,
  metrics,
} from '../../themes';


export default class Filter extends PureComponent {

  static propTypes = {
    onPress: PropTypes.func.isRequired,
  };

  static defaultProps = {
    onPress: () => { },
  };

  render() {
    const { onPress } = this.props;
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onPress}
        style={[
          stylesButton.buttonContainer,
          this.props.styleButton
        ]}
      >
        <Image
          resizeMode='contain'
          source={require('../../resources/images/FlashButton.png')}
          style={stylesButton.filterButton}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
              marginTop: -2
            }}
          >
            <Text style={[
              fonts.style.textButton,
              {
                fontSize: 18,
                fontWeight: 'bold',
                marginRight: metrics.baseMargin,
                marginTop: -2
              }
            ]}
            >
              Filtres
            </Text>
            <Image
              resizeMode={'contain'}
              style={{
                width: 22,
                height: 23
              }}
              source={require('../../resources/icons/settings.png')}
            />
          </View>
        </Image>
      </TouchableOpacity>
    );
  }
}

const stylesButton = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: metrics.smallMargin,
    left: (metrics.deviceWidth - 125) / 2,
  },
  filterButton: {
    flex: 1,
    paddingHorizontal: metrics.baseMargin,
    height: 48
  }
});                               