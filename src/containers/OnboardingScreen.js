import React, { PureComponent } from 'react';
import { 
  Text,
  View,
  StyleSheet,
  Animated,
  Easing,
  Platform,
  TouchableOpacity,
} from 'react-native';

import Orientation from 'react-native-orientation';
import { withNavigation } from 'react-navigation';


import Swiper from '../components/onboarding/Swiper';
import Point from '../components/onboarding/Point';
import HomeScreen from './HomeScreen';

import {
  colors,
  fonts,
  styles,
  metrics,
} from '../themes';

const points = Array.apply(null, {length: 8});

const marginLeft = (metrics.deviceHeight - metrics.deviceWidth)/2;

class OnboardingScreen extends PureComponent {

  state = {
    animatedValue:  new Animated.Value(0),
    animatedBackground:  new Animated.Value(0),
    scale:  new Animated.Value(Platform.OS === 'ios' ? 0 : 0.01),
    lastPage: false,
  };

  renderHome() {
    this.props.navigation.navigate('Home');

  }

  componentDidMount () {

    
    this.startAnimate();
    Orientation.lockToPortrait();
  }

  animated = () => {
    
    Animated.timing(
      this.state.animatedValue,
      {
        toValue: 1,
        duration: 300,
        easing: Easing.linear
      }
    ).start();
  }

  _zoomIn = () => {
    
    Animated.timing(
      this.state.animatedBackground,
      {
        toValue: 1,
        duration: 200,
      }
    ).start();
  }
  
  spring = () => {

    this.state.scale.setValue(0.01);
    Animated.spring(
      this.state.scale,
      {
        toValue: 1,
        tension: 10,
        duration: 200,
        easing: Easing.linear
      }
    ).start();
  }

  setLastPage = (flag) => {
    this.setState({ lastPage: flag });
  }

  startAnimate() {
    setTimeout(() => { this.spring() }, 300);

    setTimeout(() => { this._zoomIn() }, 790);
    setTimeout(() => { this.animated() }, 600);
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


    const style = [
      {
        borderRadius,
        transform: [
          { 
            scale: this.state.scale
          },       
        ],
        left: - marginLeft,
      },
      styles.screen.mainContainer,
      stylesOnboarding.mainContainer,
    ];
    return (
      <Animated.View
        style={style}
      > 
        <Animated.View
          style={[
            stylesOnboarding.container,
            {
              transform: [
                { 
                  scale: this.state.scale
                },       
              ],
              borderRadius,
            }
          ]}
        >
          <Swiper 
            style={style}
            setLastPage={this.setLastPage}
          />
          {
            points.map(
              (marker, key) => <Point key={key} index={key} />
            )
          }
          <TouchableOpacity 
            style={[
              stylesOnboarding.button,
              {left: metrics.baseMargin},
              Platform.OS === 'ios' ? {} : {paddingBottom: metrics.doubleBaseMargin},
            ]}
            onPress={() => this.renderHome()}
          >
            <Text style={[
              fonts.style.activateText,
              { fontSize: fonts.size.regular }
            ]}>
              Passer
            </Text>
          </TouchableOpacity>
          {
            this.state.lastPage && 
            <TouchableOpacity 
              style={[
                stylesOnboarding.button,
                { right: metrics.baseMargin },
                Platform.OS === 'ios' ? {} : {paddingBottom: metrics.doubleBaseMargin},
              ]}
              onPress={() => this.renderHome()}
            >
              <Text style={[
                  fonts.style.activateText,
                  fonts.style.bold
                ]}
              >
                Commencer
              </Text>
            </TouchableOpacity>
          }
        </Animated.View>
      </Animated.View>
    );
  }
};

export default withNavigation(OnboardingScreen);

const stylesOnboarding = StyleSheet.create({ 
  mainContainer: {
    height: metrics.deviceHeight,
    width: metrics.deviceHeight,
    position: 'absolute',
    overflow: 'hidden',
  },
  container: {
    height: metrics.deviceHeight,
    width: metrics.deviceWidth,
    position: 'absolute',
    marginLeft
  },
  button: {
    position: 'absolute',
    bottom: metrics.baseMargin,
  },
});
