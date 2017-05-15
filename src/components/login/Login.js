import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Platform,
  Animated,
  Easing,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import FontMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Kohana } from 'react-native-textinput-effects';

import ButtonConnect from '../common/Button';
import Separator from '../common/Separator';

import { signin } from '../../redux/actions/auth';


import {
  styles,
  colors,
  fonts,
  metrics,
} from '../../themes';

class Login extends Component {
  
  state = {
    email: '',
    password: '',
    wrongPassword: false,
    animatedValue:  new Animated.Value(0),
  };

  signin() {

    if(this.state.email  && this.state.password ){  
      this.props.signin(this.state.email, this.state.password);
    }
  }

  componentWillReceiveProps(nextProps){

    if(nextProps.LoggedIn === true && this.props.LoggedIn === false){
      Keyboard.dismiss();
      this.props.validate();
    } else if(nextProps.failure === true && this.props.failure === false) {
      this.focusNextField(this.email);
      this.setState({ wrongPassword: true, password: '' });
    }

  }

  setPassword = (password) => {
    this.setState({password, wrongPassword: false});
  }

  focusNextField = (field) => {
    field.focus();
  }
  


  componentDidMount() {
    this.focusNextField(this.email);
    this.animated();
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

  render() {

    const marginTop = this.state.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [
        (metrics.deviceHeight)/5, 
        0
      ]
    });

    return (
      <Animated.View 
        style={[
          styles.screen.container,
          {
            marginTop
          }
        ]}
      > 
        <View style={styleLogin.formContainer }>
          <Kohana
            style={{ backgroundColor: colors.white  }}
            label={ 'Email' }
            iconClass={ FontMaterialIcons }
            iconName={'email'}
            iconColor={ colors.lightBlue }
            labelStyle={ fonts.style.textInput }
            inputStyle={{ color: colors.darkGray  }}
            onChangeText={(email) => this.setState({email})} 
            selectTextOnFocus={ true }
            onSubmitEditing={() => this.focusNextField(this.password)}
            ref={ref => { this.email = ref }}
            value={ this.state.email.toLowerCase() }
          />
          <Separator color={colors.separatorText} margin={metrics.smallMargin} />
          <Kohana
            ref={ref => { this.password = ref }}
            style={{ backgroundColor: colors.white }}
            label={ 
              !this.state.wrongPassword ? 
              'Mot de passe' 
              :
              'Mot de passe incorrect !'
            }
            iconClass={ FontMaterialIcons }
            iconName={'lock'}
            iconColor={ colors.lightBlue }
            labelStyle={ 
              !this.state.wrongPassword 
              ? 
              fonts.style.textInput
              :
              fonts.style.errorTextInput
            }
            inputStyle={{ color: colors.darkGray  }}
            onChangeText={ this.setPassword }
            secureTextEntry={ true }
            value={ this.state.password }
          />
        </View> 
        <View style={ styles.spaceBetween }> 
          <View 
            style={{
              marginTop: metrics.doubleBaseMargin*2
            }}
          >  
            <ButtonConnect  
              text={'Se connecter'}
              onPress={() => this.signin()}
              styleButton={{
                backgroundColor: 
                (
                  this.state.email && this.state.password ?
                  colors.lightBlue
                  :
                  colors.lightGray
                )
              }}
              styleText={{fontWeight: 'normal'}}
            />   
          </View>
          <TouchableOpacity
            onPress={this.props.forgetPassword}
            style={styles.center}
          >  
            <Text style={[
              fonts.style.textWhite,
              styleLogin.text,
            ]}
            > 
              Mot de passe oublié ?
            </Text>  
          </TouchableOpacity> 
        </View>
      </Animated.View>
    )
  }
}

const styleLogin = StyleSheet.create({ 
  text: { 
    marginTop: metrics.baseMargin,
    textAlign: 'center',
  },
  input: {
    height: metrics.buttonHeight,
    borderRadius: metrics.radius,
    borderColor:colors.white, 
    backgroundColor:colors.white ,  
    borderWidth: metrics.borderWidth,
  },
  formContainer: { 
    height: ( 
      metrics.inputHeight 
      + 
      (Platform.OS === 'ios' ? 0 : metrics.smallMargin)
    ) * 2 + 1,
    backgroundColor: colors.white, 
    borderRadius: metrics.radius ,     
    borderWidth:metrics.borderWidth,
    borderColor: colors.white,
    paddingHorizontal: metrics.smallMargin
  }
});

const mapStateToProps = state => ({
  LoggedIn: state.auth.LoggedIn,
  failure: state.auth.failure,
});


const mapDispatchToProps = (dispatch) => ({
  signin: bindActionCreators(signin, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
