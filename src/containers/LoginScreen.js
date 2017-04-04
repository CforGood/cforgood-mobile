import React, { PureComponent } from 'react';
import {
  View,
  Text, 
  StyleSheet,
  Image,
  Animated,
  Easing,
  Platform,
  AsyncStorage,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Permissions from 'react-native-permissions';


import { loadUserData, onUpdateUserLocation } from '../redux/actions/user';
import { siginSuccess } from '../redux/actions/auth';

import {
  styles,
  colors,
  fonts,
  metrics,
} from '../themes';


import Back from '../components/common/Icon';
import Facebook from '../components/login/Facebook';
import Email from '../components/login/Email';
import Login from '../components/login/Login';
import Welcome from '../components/login/Welcome';

class LoginScreen extends PureComponent {
  state = {
    step: 1,
    verify: false
  };

  setStep = (step) => {
    this.setState({ step });
  }

  componentWillMount() {
    this._requestPermission();
  }

  async componentWillUpdate(nextProps, nextState){
    if(nextState.step === 3 && this.state.step !== 3){
      await this.props.loadUserData();
      setTimeout(() => { this.props.siginSuccess(); }, 300);
    }
  }

  _requestPermission = () => {
    Permissions.requestPermission('location', 'always')
      .then(response => {

        if (response !== 'authorized') {
          Permissions.openSettings
        }
      }).catch(e => console.log(e))
  }
  

  loadApp() {
    setTimeout(() => { this.props.siginSuccess(); }, 1000);
  }

  renderContent() {
    
    const { step } = this.state;
    switch (step) {
      case 1:
        return (
          <View style={[
              styles.screen.container,
              styles.spaceBetween
            ]}
          >
            <View style={{flex: 1}}>
              <Facebook validate={() => this.setStep(3)} />
              <Email onPress={() => this.setStep(2)} />
            </View>
            <View style={{flex: 1}} />
          </View>
        );
        break;
      case 2:
        return (
          <View style={styles.screen.container}>
            <Login validate={() => this.setStep(3)}/>
          </View>
        );
        break;
      default:
        return (
          <View style={{flex: 1}}>
            <Welcome />
            <View style={{flex: 1}} />
          </View>
        );
        break;
    }
  }

  render() {
    
    return (
      <Image 
        style={[
          styles.screen.container,
          {
            width: null,
            height: null
          }
        ]}
        source={require('../resources/images/background-Signup.jpg')}
      > 
        <View style={{ flex: 1, justifyContent: 'center' }} >
          {
            this.state.step !== 3 &&
            <Back
              onPress={() => this.props.navigation.goBack()}
              source={require('../resources/icons/left-arrow-white.png')}
              style={[
                {
                  top: metrics.doubleBaseMargin,
                  left: metrics.marginApp,
                  position: 'absolute',
                  backgroundColor: 'transparent',
                  height: 36,
                  width: 36
                },
              ]}
              styleImage={{
                height: 36,
                width: 36
              }}
            />
          }
          
          <View style={stylesLogin.pointContainer}> 
            <View style={[
                stylesLogin.point,
                this.state.step === 1 ? stylesLogin.pointActivate : null 
              ]} 
            />
            <View style={[
                stylesLogin.point,
                this.state.step === 2 ? stylesLogin.pointActivate : null
              ]} 
            />
            <View style={[
                stylesLogin.point,
                this.state.step === 3 ? stylesLogin.pointActivate : null
              ]} 
            />
          </View> 
        </View>
        <View style={{ 
            flex: 5,
            padding: metrics.marginApp
          }}
        >
         {this.renderContent()} 
        </View>
      </Image>

    );
  }
}



const mapDispatchToProps = (dispatch) => ({
  onUpdateUserLocation: bindActionCreators(onUpdateUserLocation, dispatch),
  loadUserData: bindActionCreators(loadUserData, dispatch),
  siginSuccess: bindActionCreators(siginSuccess, dispatch),
});

export default connect(null, mapDispatchToProps)(LoginScreen);

const stylesLogin = StyleSheet.create({
  pointContainer: {
    justifyContent: 'center',
    alignItems: 'center', 
    flexDirection: 'row', 
  },
  point: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: colors.lightGray,
    marginHorizontal: metrics.smallMargin,
  },
  pointActivate: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: colors.lightBlue
  }
})
