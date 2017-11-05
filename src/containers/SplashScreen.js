import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  Image,
  AsyncStorage,
  NetInfo,
  Alert,
} from 'react-native';
import Orientation from 'react-native-orientation';
import { NavigationActions } from 'react-navigation';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  styles,
  metrics,
  fonts
} from '../themes';

import { loadUserData } from '../redux/actions/user';
import { siginSuccess } from '../redux/actions/auth';

import Marker from '../components/splash/Marker';
import CircleAnimate from '../components/splash/CircleAnimate';

class SplashScreen extends Component {

  state = {
    scale: new Animated.Value(0.5),
    opacity: new Animated.Value(1),
    isConnected: true,
    verify: false,
  };

  async componentDidMount() {
    //AsyncStorage.removeItem('@CfoorGoodStore:auth');
    NetInfo.isConnected.addEventListener(
      'change',
      this._handleConnectivityChange
    );

    NetInfo.isConnected.fetch().done(
      (isConnected) => { this.setState({ isConnected }); }
    );

    this.animate(0);

    auth = await AsyncStorage.getItem('@CfoorGoodStore:auth');

    if (auth !== null) {
      if (this.state.isConnected) {
        this.loadData();
      }
    }
    else {

      setTimeout(() => { this.animateOpacity(); }, 2000);

      const value = await AsyncStorage.getItem('@CfoorGoodStore:firstOpen');
      if (value === null) {
        await AsyncStorage.setItem('@CfoorGoodStore:firstOpen', '1');
      }

      setTimeout(() => {
        this.goTo(value !== null ? 'Home' : 'Onboarding');
      }, 2000);
    }

  }

  componentWillMount() {
    Orientation.lockToPortrait();
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      'change',
      this._handleConnectivityChange
    );

  }

  _handleConnectivityChange = (isConnected) => {
    this.setState({
      isConnected,
    });
  };

  goTo(action) {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: action })
      ]
    });

    this.props.navigation.dispatch(resetAction);
  }

  async loadData() {
    await this.props.loadUserData();

    auth = await AsyncStorage.getItem('@CfoorGoodStore:auth');

    if (auth !== null) {

      this.loadApp();
    }
    else {
      setTimeout(() => { this.animateOpacity(); }, 1000);

      setTimeout(() => {
        this.goTo('Home');
      }, 2300);
    }
  }

  loadApp() {
    setTimeout(() => { this.animateOpacity(); }, 800);
    setTimeout(() => { this.props.siginSuccess(); }, 1000);
  }

  animate(i) {
    this.state.scale.setValue(0.2);

    if (i < 50) {
      Animated.spring(
        this.state.scale,
        {
          toValue: 0.5,
          friction: 0.1,
          tension: 1,
          duration: 1000,
        }
      ).start(this.animate(i + 1));
    }
  }

  animateOpacity() {
    Animated.timing(
      this.state.opacity,
      {
        toValue: 0,
        duration: 200,
        easing: Easing.linear
      }
    ).start();

    Animated.spring(
      this.state.scale,
      {
        toValue: 6,
        friction: 0.5,
        tension: 1,
        duration: 200,
      }
    ).start();

  }


  render() {
    return (
      <View style={[
        styles.screen.mainContainer,
        styles.center
      ]}
      >
        <Animated.Image
          resizeMode='contain'
          style={[
            styles.logo,
            {
              height: metrics.images.logo,
              width: metrics.images.logo,
              transform: [
                {
                  scale: this.state.scale,

                }
              ],
              opacity: this.state.opacity
            }
          ]}
          source={require('../resources/images/logo_2.png')}
        />
        {
          !this.state.isConnected &&
          <Text style={fonts.style.t26}>
            Vous êtes hors connexion
          </Text>
        }

      </View>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn
});


const mapDispatchToProps = (dispatch) => ({
  loadUserData: bindActionCreators(loadUserData, dispatch),
  siginSuccess: bindActionCreators(siginSuccess, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
