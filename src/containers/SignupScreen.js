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
  TouchableOpacity,
  Keyboard,
  ScrollView,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Permissions from 'react-native-permissions';
import KeyboardSpacer from 'react-native-keyboard-spacer';

import { loadUserData, onUpdateUserLocation } from '../redux/actions/user';
import { siginSuccess, signup } from '../redux/actions/auth';

import {
  styles,
  colors,
  fonts,
  metrics,
} from '../themes';


import Close from '../components/common/Icon';
import Facebook from '../components/login/Facebook';
import Email from '../components/login/Email';
import SignUp from '../components/signup/Signup';
import Welcome from '../components/signup/Welcome';

class LoginScreen extends PureComponent {
  state = {
    step: 1,
    verify: false,
    user: {
      email: '',
      code_partner: '',
      password: ''
    },
    showError: false
  };

  setStep = (step) => {
    this.setState({ step });
  }

  componentWillMount() {
    this._requestPermission();
  }

  async componentWillReceiveProps(nextProps){

    if(nextProps.LoggedIn === true && this.props.LoggedIn === false){
      Keyboard.dismiss();
      
      this.setState({ 
        step: 3,
      });
      await this.props.loadUserData();
    }
    else if(nextProps.error !== null) {
      this.setState({showError: true});
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

  setInfo = (user) => {
    if(user.zipcode && user.city){
      this.props.signup(user, 'facebook');
    }
    else{
      this.setState({ 
        step: 2,
        user
      });
    }
  }

  signup = (user) => {
    this.setState({ user });
    this.props.signup(user);
  }

  renderError() {
    if(this.state.showError){
      return (
        <View 
          style={[
            {
              minHeight: 60,
              backgroundColor: '#ec5759',
              alignItems: 'center',
              flexDirection: 'row',
              paddingVertical: metrics.baseMargin
            },
            Platform.OS === 'ios' ? {paddingTop: 20} : {}
          ]}
        >
          <View style={{flex: 1}}/>
          <View 
            style={{
              flex: 5,
              justifyContent: 'center'
            }}
          >
            <Text 
              style={[
                fonts.style.t17,
                fonts.style.textWhite,
              ]}
            >
            {
              this.props.error
            }
            </Text>
          </View>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Close
              source={require('../resources/icons/close-white.png')}
              onPress={() => this.setState({showError: false})}
              style={{
                height: 15,
                width: 15,
                marginTop: metrics.marginApp + (Platform.OS === 'ios' ? 22: 0),
              }}
              styleImage={{
                height: 15,
                width: 15
              }}
            />
          </View>
        </View>
      );
    }
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
              <Facebook 
                signupScreen={true}
                validate={(user) => this.setInfo(user)}
              />
              <Email
                onPress={() => this.setStep(2)}
              />
            </View>
            <View style={{flex: 1}}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Login', { step: 1 })}  
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center'
                }}
              >
                <Text 
                  style={[
                    fonts.style.t17,
                    fonts.style.textWhite,
                  ]}
                > 
                  Déjà membre ?  
                </Text>
                <Text 
                  style={[
                    fonts.style.t17,
                    fonts.style.textWhite,
                    fonts.style.bold,
                    {marginLeft: 10}
                  ]}
                > 
                  Connexion
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        );
        break;
      case 2:
        return (
          <ScrollView 
            style={styles.screen.container}
          >
            <SignUp 
              validate={() => this.setStep(3)}
              user={this.state.user}
              signup={this.signup}
            />
          </ScrollView>
        );
        break;
      default:
        return (
          <View style={{flex: 1}}>
            <Welcome onValidate={() => this.props.siginSuccess()}/>
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
        {
          this.renderError()
        }
        <View style={{ flex: 1, justifyContent: 'center' }} >
          {
            this.state.step !== 3 &&
            <Close
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
        <View
         style={{
            flex: 6,
            paddingHorizontal: metrics.marginApp,
            paddingVertical: metrics.baseMargin
          }}
        >
         {this.renderContent()} 
        </View>
        {
          Platform.OS ==='ios' &&
          <KeyboardSpacer onToggle={
              () => null
            } 
          />
        }
        
      </Image>

    );
  }
}


const mapStateToProps = state => ({
  LoggedIn: state.auth.LoggedIn,
  failure: state.auth.failure,
  error: state.auth.error,
});


const mapDispatchToProps = (dispatch) => ({
  onUpdateUserLocation: bindActionCreators(onUpdateUserLocation, dispatch),
  loadUserData: bindActionCreators(loadUserData, dispatch),
  siginSuccess: bindActionCreators(siginSuccess, dispatch),
  signup: bindActionCreators(signup, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

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
