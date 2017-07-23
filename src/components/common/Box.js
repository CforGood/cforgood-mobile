import { PureComponent, } from 'react'; import PropTypes from 'prop-types';

import {
  View,
  Text,
  StyleSheet
} from 'react-native';

import {
  styles,
  fonts,
  colors,
  metrics
} from '../../themes';

import LinearGradient from 'react-native-linear-gradient';

export default class Box extends PureComponent {

  static propTypes = {
    text: PropTypes.string,
  };

  static defaultProps = {
    text: '0 €',
  }

  render() {
    return (
      <LinearGradient
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
        colors={colors.gradientColor}
        style={[
          styleBox.box,
          styles.center,
        ]}
      >
        <View style={[
          styleBox.boxText,
          styles.center,
        ]}
        >
          <Text style={[fonts.style.t26, fonts.style.bold]} >
            {this.props.text}
          </Text>
        </View>
      </LinearGradient>
    );
  }
};

const styleBox = StyleSheet.create({
  box: {
    width: 128,
    height: 50,
    borderRadius: 5,
  },
  boxText: {
    width: 125,
    height: 47,
    borderRadius: 5,
    backgroundColor: colors.white,
  },
});

