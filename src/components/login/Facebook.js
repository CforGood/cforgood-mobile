import React, { PureComponent } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  AsyncStorage,
} from 'react-native';
import {
  LoginManager,
  GraphRequest,
  GraphRequestManager,
  AccessToken,
} from 'react-native-fbsdk';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { signin, signup } from '../../redux/actions/auth';

import Button from '../common/Button';
import {
  styles,
  colors,
  fonts,
  metrics,
} from '../../themes';

class ButtonFacebook extends PureComponent {

  componentWillReceiveProps(nextProps) {

    if (nextProps.LoggedIn === true && this.props.LoggedIn === false) {
      this.props.validate();
    }

  }

  connectWithAcessToken = async (verifyToken = false) => {

    const accessToken =  await AsyncStorage.getItem('accessToken');
    if (accessToken) {
      const infoRequest = new GraphRequest(
        '/me',
        {
          accessToken: accessToken,
          parameters: {
            fields: {
              string: 'email,last_name,first_name,location'
            }
          }
        },
        (error, result) => {

          this.storeResponseFacebookData(
            error,
            result,
            accessToken
          );

          if (verifyToken && error) {
            this.facebookManager();
          }

        },
      );
      // Start the graph request.
      new GraphRequestManager().addRequest(infoRequest).start();
    }
    else if (verifyToken) {
      this.facebookManager();
    }

  }

  facebookManager() {

    LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(
      (result) => {
        console.log(result.grantedPermissions.toString());
        if (result.isCancelled) {
          alert('Login cancelled');
        } else {
          AccessToken.getCurrentAccessToken().then(
            async (data) => {
              await AsyncStorage.setItem('accessToken', data.accessToken);
              this.connectWithAcessToken();
            }
          );

        }
      },
      (error) => {
        console.log('Login fail with error: ' + error);
      }
    );
  }

  //Create response callback.
  storeResponseFacebookData(error, result, accessToken) {
    if (error) {
      alert('Error fetching data: ' + error.toString());
    } else {
      const { typeAuth } = this.props;
      if (typeAuth === 'SignUp') {
        this.props.signup({
          email: result.email,
          last_name: result.last_name,
          first_name: result.first_name,
          city: result.location ? result.location.name : null,
          zipcode: result.location ? result.location.zip : null,
        }, 'facebook');
      }
      else {
        this.props.signin(result.email, accessToken, 'facebook');
      }


    }
  }

  render() {
    const { typeAuth } = this.props;
    return (
      <Button
        styleButton={style.button}
        styleText={style.textButton}
        text={
          typeAuth === 'SignUp' ?
            "S'inscrire avec Facebook"
            :
            "Se connecter avec Facebook"
        }
        onPress={() => this.connectWithAcessToken(true)}
      />
    );
  }

}

const mapStateToProps = state => ({
  LoggedIn: state.auth.LoggedIn,
  failure: state.auth.failure,
});


const mapDispatchToProps = (dispatch) => ({
  signin: bindActionCreators(signin, dispatch),
  signup: bindActionCreators(signup, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ButtonFacebook);



const style = StyleSheet.create({
  textButton: {
    color: colors.white,
    fontSize: 15,
    marginHorizontal: metrics.baseMargin,
  },
  button: {
    backgroundColor: colors.transparent,
    borderColor: colors.white,
    borderWidth: 2,
    borderRadius: metrics.buttonHeight / 2,
    height: metrics.buttonHeight,
    justifyContent: 'center',
    paddingHorizontal: metrics.baseMargin,
  },
});                               