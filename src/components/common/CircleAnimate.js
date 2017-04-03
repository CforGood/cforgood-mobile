import React, {
  Component,
  PureComponent,
} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';
import Video from 'react-native-video';

import { Actions } from 'react-native-router-flux';

import {
  styles,
  colors,
  fonts,
  metrics,
} from '../themes';


const marginLeft = (metrics.deviceHeight - metrics.deviceWidth)/2;

class CircleAnimate extends PureComponent {

  state = {
    animatedBackground:  new Animated.Value(0),
    scale:  new Animated.Value(0.01),
  };

  componentWillMount () {
    setTimeout(() => { this.spring() }, 100);
    setTimeout(() => { this._zoomIn() }, 950);
  }


  _zoomIn = () => {
    
    Animated.timing(
      this.state.animatedBackground,
      {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear
      }
    ).start();
  }
  
  spring = () => {

      this.state.scale.setValue(0.01);
      Animated.spring(
        this.state.scale,
        {
          toValue: 1,
          tension: 1,
          duration: 1000
        }
      ).start();
  }



  getBackground(borderRadius) {
    return (
      
      <Animated.Image 
        style={{
          zIndex: 1,
          flex: 1,
          width: null,
          height: null,
          borderRadius,
        }}
        source={require('../resources/images/background.jpg')}
      />
    );
  }


  render() {

    
    const scale = this.state.scale.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 1, 0]
    });


    const borderRadius = this.state.animatedBackground.interpolate({
      inputRange: [0, 1],
      outputRange: [metrics.deviceHeight/2, 0]
    });

    return (
      <Animated.View
        style={[
          {
            borderRadius,
            transform: [
              { 
                scale: this.state.scale
              },       
            ],
          },
          styles.screen.container,
          stylesHome.mainContainer,
        ]}
        //
      >
        { this.getBackground(borderRadius) }
      </Animated.View>
    );
  }
};

export default CircleAnimate;
 
const stylesHome = StyleSheet.create({ 
  mainContainer: {
    zIndex: 10,
    height: metrics.deviceHeight,
    width: metrics.deviceHeight,
    left: - marginLeft,
    position: 'absolute',
    overflow: 'hidden',
  },

});