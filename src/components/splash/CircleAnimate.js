import React, {  } from 'react'; import PropTypes from 'prop-types';
import {
  StyleSheet,
  ActivityIndicator,
  View,
  TextInput,
  Animated,
  Easing,
} from 'react-native';

import {
  colors,
  metrics,
  styles,
} from '../../themes';

const colorsMarkers = [
  '#27B744',
  '#d9c160',
  '#83d960',
  '#60d9ab',
  '#60c9d9',
  '#c060d9',
  '#E1036A',
  '#FAFAFA',
  '#60d9ab',
  '#60c9d9',
  '#c060d9',
  '#E1036A',
  '#FAFAFA',
];

export default class Markers extends React.Component {

  static propTypes = {
    animateMarkers: PropTypes.bool,
  };

  static defaultProps = {
    animateMarkers: false,
  };
  
  state = {
    offset: new Animated.ValueXY({
      x: metrics.deviceWidth - 100 ,
      y: metrics.baseMargin,
    }),
    animatedValue:  new Animated.Value(0),
  };


  componentWillMount () {
    
    this.animateOpacity(2200);
    setTimeout(() => { this.animate({
      x: metrics.deviceWidth - 120,
      y: metrics.doubleBaseMargin * 2,
    }) }, 3000);

  }

  animate = (offset) => {
    
    Animated.timing(this.state.offset, {
      duration: 2000,
      toValue: offset,
    }).start( );
    
    setTimeout(() => { this.animate({
      x: metrics.deviceWidth,
      y: 0
    }) }, 1000);


    
  }

  animateOpacity (duration) {
    this.state.animatedValue.setValue(0);
    Animated.timing(
      this.state.animatedValue,
      {
        toValue: 1,
        duration: duration,
        easing: Easing.linear
      }
    ).start(() => this.animateOpacity(duration - (duration/6)))
  }

  render() {
    
    const opacity = this.state.animatedValue.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0, 1, 0]
      })

    return (
      <Animated.View
        style={[
          {
            
            opacity,
            height: metrics.icons.medium,
            width: metrics.icons.medium,
            borderRadius: metrics.icons.medium/2,
            position: 'absolute',
            zIndex: 20,
            left: 0,
            top: metrics.deviceHeight/10,
            right: metrics.deviceWidth/3,
            backgroundColor: 'red',
            transform: [
              {
                translateX: this.state.offset.x
              },
              {
                translateY: this.state.offset.y,
              },        
            ]
          }

        ]}
      />
        
    );
  }

};
