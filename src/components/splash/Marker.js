import React, { PropTypes } from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  View,
  TextInput,
  Animated,
  Easing,
} from 'react-native';

import _ from 'lodash';

import {
  colors,
  metrics,
  styles,
} from '../../themes';

import { colorsTab } from '../../constants';

export default class Markers extends React.Component {

  static propTypes = {
    index: PropTypes.number.isRequired,
  };

  static defaultProps = {
    index: 0,
  };
  
  state = {
    offset: new Animated.ValueXY({
      x: this.getRandomArbitrary(metrics.deviceWidth),
      y: this.getRandomArbitrary(metrics.deviceHeight),
    }),
    scale:  new Animated.Value(1),
    opacity: new Animated.Value(0),
  };


  componentWillMount () {
    
    setTimeout(() => { this.opacity(); }, 60 * this.props.index);

  }


  opacity = () => {
    
    Animated.timing(
      this.state.opacity,
      {
        toValue: 1,
        duration: 500,
        easing: Easing.linear
      }
    ).start( );

    setTimeout(() => { this.animate(); }, 50 * this.props.index);
    
  }

  animate = () => {
    Animated.timing(this.state.offset, {
      duration: 1500,
      toValue: {
        x: metrics.deviceWidth/2,
        y:  metrics.deviceHeight/2,
      }
    }).start( );
  }



  getRandomArbitrary(max) {
    return Math.random() * (max);
  }

  render() {

    const opacity = this.state.opacity.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 1, 1]
    });

    return (
      <Animated.View
        style={{
          opacity: opacity,
          height: 14,
          width: 14,
          borderRadius: 7,
          position: 'absolute',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.white,
          transform: [
            {
              translateX: this.state.offset.x
            },
            {
              translateY: this.state.offset.y,
            },      
          ]
        }}
      >
        <View
          style={{
            height: 12,
            width: 12,
            borderRadius: 6,
            backgroundColor: colorsTab[this.props.index]
          }}
        />
      </Animated.View>
    );
  }

}

const styleSearch = StyleSheet.create({

  circle: {
    color: colors.gray,
  },
});
