import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
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


  static propTypes = {
    typeAuth: PropTypes.string.isRequired,
    setError: PropTypes.func.isRequired,
    validate: PropTypes.func.isRequired,
    setLoaded: PropTypes.func.isRequired,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.failure === true && this.props.failure == false) {
      this.props.setLoaded(true);
      this.props.setError(nextProps.error[0]);
    } else if (
      nextProps.LoggedIn === true && this.props.LoggedIn === false
    ) {
      this.props.validate();
    }
  }

  connectWithAcessToken = async (verifyToken = false) => {

    const accessToken = await AsyncStorage.getItem('accessToken');
    if (accessToken) {
      this.props.setLoaded(false);
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
          // if (verifyToken && error) {
          //   this.facebookManager();
          // } else {
          //alert(JSON.stringify(result));
          this.storeResponseFacebookData(
            error,
            result,
            accessToken
          );

          // }
        },
      );
      // Start the graph request.
      new GraphRequestManager().addRequest(infoRequest).start();
    } else if (verifyToken) {
      this.facebookManager();
    }

  }

  facebookManager() {
    LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(
      (result) => {
        if (result.isCancelled) {
          this.props.setError('Login cancelled');
        } else {
          AccessToken.getCurrentAccessToken().then(
            async (data) => {
              await AsyncStorage.setItem('accessToken', data.accessToken);
              this.connectWithAcessToken(false);
            }
          ).catch(error => {
            this.props.setError(error.errorMessage);
          });
        }
      },
      (error) => {
        this.props.setError(error.errorMessage);
      }
    );
  }

  //Create response callback.
  storeResponseFacebookData(error, result, accessToken) {
    this.props.setLoaded(true);
    if (error) {
      this.props.setError(error.errorMessage);
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
      } else {
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
  loaded: state.auth.failure,
  error: state.auth.error,
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