import React, {
  PureComponent
} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
  Platform,
  Dimensions,
  ScrollView,
} from 'react-native';
import Video from 'react-native-video';
import Orientation from 'react-native-orientation';
import { withNavigation } from 'react-navigation';

import {
  styles,
  colors,
  fonts,
  metrics,
} from '../themes';

import Button from '../components/common/Button';
import Icon from '../components/common/Icon';
import Logo from '../components/common/Logo';
import { URL_VIDEO } from '../constants';

const marginLeft = (metrics.deviceHeight - metrics.deviceWidth) / 2;
const marginFooter = metrics.images.logo
  +
  (metrics.deviceHeight - metrics.images.logo) / 8
  +
  metrics.deviceHeight / 16;

class HomeScreen extends PureComponent {

  state = {
    animatedValue: new Animated.Value(0),
    animatedBackground: new Animated.Value(0),
    scale: new Animated.Value(Platform.OS === 'ios' ? 0 : 0.01),
    played: false,
    canPlay: false,
    loaded: false,
    loginVisible: false,
    topVideo: 0,
    widthVideo: metrics.deviceWidth,
    marginLeft,
    animated: false,

  };


  componentWillMount() {

    Orientation.addOrientationListener(this._orientationDidChange);

  }

  startAnimate() {
    if (this.state.animated === false) {

      this.setState({ animated: true });

      setTimeout(() => { this.spring() }, 100);
      setTimeout(() => { this._zoomIn() }, 390);
      setTimeout(() => { this.animated() }, 300);


    }

  }
  componentWillUnmount() {

    Orientation.lockToPortrait();
  }

  animated = () => {

    Animated.timing(
      this.state.animatedValue,
      {
        toValue: 1,
        duration: 500,
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

  _orientationDidChange = (orientation) => {
    //alert(orientation)
    if (orientation == 'LANDSCAPE') {

      this.setState({
        marginLeft: 0,
        topVideo: - ((metrics.deviceHeight) / 2),
        widthVideo: metrics.deviceHeight
      })
    } else {
      //do something with portrait layout
      this.setState({
        marginLeft,
        topVideo: 0,
        widthVideo: metrics.deviceWidth
      });
    }
  }

  loadStart = () => {
    this.setState({ loaded: !this.state.loaded });
  }

  setPlay = () => {

    if (!this.state.played)
      Orientation.unlockAllOrientations();
    else
      Orientation.lockToPortrait();


    this.setState({ played: !this.state.played, canPlay: true });
  }

  onEnd = () => {
    this.setPlay();
    this.loadStart();
  }


  getVideo() {
    return (
      this.state.canPlay &&
      <View style={[
        styles.screen.overlay,
        stylesHome.videoContainer,
        {
          zIndex: this.state.played ? 5 : 3,
          marginLeft: this.state.marginLeft,
          width: this.state.widthVideo,
        }
      ]}
      >
        <Icon
          source={require('../resources/icons/close-white.png')}
          onPress={() => this.setPlay()}
          style={{
            zIndex: this.state.played ? 6 : 3,
            height: 26,
            width: 26,
            marginLeft: metrics.marginApp,
            marginTop: metrics.marginApp + (Platform.OS === 'ios' ? 22 : 0),
          }}
          styleImage={{
            height: 26,
            width: 26
          }}
        />
        <Video
          resizeMode='contain'
          source={{ uri: URL_VIDEO }}
          style={[
            styles.screen.overlay,
            {
              top: this.state.topVideo,
            }
          ]}
          paused={!this.state.played}
          repeat={true}
          onLoadStart={this.loadStart}     // Callback when video starts to load
          onLoad={this.loadStart}          // Callback when video loads
        //onEnd={this.onEnd}             // Callback when playback finishes 
        />
      </View>
    );
  }

  getBackground(borderRadius) {
    return (
      <Animated.Image
        onLoad={() => this.startAnimate()}
        style={{
          flex: 1,
          width: null,
          height: null,
          borderRadius,
          zIndex: 4,
        }}
        source={require('../resources/images/background.jpg')}
      />
    );
  }

  getLogo() {
    const top = this.state.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [
        (metrics.deviceHeight - metrics.images.logo) / 2,
        (metrics.deviceHeight - metrics.images.logo) / 8
      ]
    });


    return (
      <Animated.View
        style={[
          {
            position: 'absolute',
            left: marginLeft,
            zIndex: 4,
            top,
            height: metrics.images.logo + metrics.deviceHeight / 16,
          }
        ]}
      >
        <Logo />

      </Animated.View>
    )
  }


  getFooter() {
    const { navigation } = this.props;
    const opacity = this.state.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 0.5, 1]
    });

    return (
      <Animated.View
        style={[
          { opacity },
          stylesHome.footer,
        ]}
      >

        <View style={stylesHome.playContainer}>
          <Icon
            onPress={() => this.setPlay()}
            source={require('../resources/icons/play.png')}
            style={{
              height: 53,
              width: 53,
            }}
            styleImage={{
              height: 53,
              width: 53
            }}
          />
        </View>
        <View style={stylesHome.bottomFooter}>
          <Button
            onPress={() => navigation.navigate('Signup')}
            text={"S'inscrire"}
            styleButton={{
              marginBottom: metrics.baseMargin
            }}
            styleText={{ fontWeight: 'normal' }}
          />
          <Text style={[
            fonts.style.textWhite,
            stylesHome.text,
            fonts.style.h11,
            {
              marginBottom: metrics.smallMargin
            }
          ]}
          >
            ou
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Login', { step: 1 })}
          >
            <Text style={[
              fonts.style.textWhite,
              stylesHome.text,
              fonts.style.h9,
            ]}
            >
              Se connecter
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    )
  }


  render() {

    const scale = this.state.scale.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1]
    });

    const borderRadius = this.state.animatedBackground.interpolate({
      inputRange: [0, 1],
      outputRange: [metrics.deviceHeight / 2, 0]
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
            left: - this.state.marginLeft,
          },
          styles.screen.container,
          stylesHome.mainContainer,
        ]}
      >
        {this.getBackground(borderRadius)}
        {this.getVideo()}
        {this.getLogo()}
        {this.getFooter()}
      </Animated.View>
    );
  }
};


const stylesHome = StyleSheet.create({
  mainContainer: {
    height: metrics.deviceHeight,
    width: metrics.deviceHeight,
    position: 'absolute',
    overflow: 'hidden',
  },
  videoContainer: {
    height: metrics.deviceHeight,
    backgroundColor: colors.black,
  },
  text: {
    textAlign: 'center',
  },
  playContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: (metrics.deviceHeight - marginFooter)
    -
    metrics.deviceHeight / 5
    -
    metrics.doubleBaseMargin,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  footer: {
    zIndex: 4,
    position: 'absolute',
    left: marginLeft,
    top: marginFooter,
    width: metrics.deviceWidth,
    height: metrics.deviceHeight - marginFooter,
    justifyContent: 'space-between',
  },
  bottomFooter: {
    marginHorizontal: metrics.doubleBaseMargin,
    height: metrics.deviceHeight / 5,
    marginBottom: metrics.doubleBaseMargin,
    //marginTop: marginBottom,
  }
});

export default withNavigation(HomeScreen);
