import 
  React, 
  { PureComponent, PropTypes } 
from 'react';

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

export default class CIrcle extends PureComponent {

  static propTypes = {
    bigCircle: PropTypes.any,
    smallCircle: PropTypes.any,
  };
  
  render() {
    return (
      <LinearGradient
        start={{x: 0, y:0}} end={{x: 1, y:0}}
        colors={colors.gradientColor}
        style={[
            styleCercle.bigCircle,
            this.props.bigCircle,
            styles.center,
          ]}
      >
        <View style={[
            styleCercle.smallCircle,
            this.props.smallCircle,
          ]} 
        /> 
      </LinearGradient>   
    );
  }
};

const styleCercle = StyleSheet.create({  
  bigCircle: {
    width: 32,
    height: 32,
    borderRadius: 32 /2,
  },
  smallCircle: {
    width: 25,
    height: 25,
    borderRadius: 25 /2,
    backgroundColor: colors.white,
  },
}); 

