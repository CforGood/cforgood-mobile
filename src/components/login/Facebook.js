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

import { signin } from '../../redux/actions/auth';

import Button from '../common/Button';
import {
  styles,
  colors,
  fonts,
  metrics,
} from '../../themes';

class ButtonFacebook extends PureComponent {

  facebookManager() {
    LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(
      (result) => {
        console.log(result.grantedPermissions.toString());
        if (result.isCancelled) {
          alert('Login cancelled');
        } else {
          AccessToken.getCurrentAccessToken().then(
            (data) => {

              //alert(JSON.stringify(data));

              

              AsyncStorage.setItem('accessToken', data.accessToken);

              const infoRequest = new GraphRequest(
                '/me',
                {
                  accessToken: data.accessToken,
                  parameters: {
                    fields: {
                      string: 'email'
                    }
                  }
                },
                (error: ?Object, result: ?Object ) => this.storeResponseFacebookData(
                  error,
                  result,
                  data.accessToken
                ),
              );
              // Start the graph request.
              new GraphRequestManager().addRequest(infoRequest).start();
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
  storeResponseFacebookData(error: ?Object, result: ?Object, accessToken) {
    if (error) {
      alert('Error fetching data: ' + error.toString());
    } else {
      //alert(JSON.stringify(result))
      //AsyncStorage.setItem('me', result);
      //Actions.home();

      //this.props.loginWidthFacebook(accessToken, result.email);
      this.props.signin(result.email, accessToken, 'facebook');
    }
  }

  render() {
    return (
      <View style={styles.screen.container}>
        <Text style={[
            fonts.style.textWhite,
            stylesFacebook.text,
            fonts.style.h9
          ]}
        > 
          Se connecter rapidement avec :
        </Text>  
        <View style={{
            marginTop: metrics.smallMargin
          }}
        >  
          <Button
            styleButton={stylesFacebook.buttonFacebook}
            text={'Facebook'}
            onPress={() => this.facebookManager()}
            styleText={{
              fontWeight: 'normal',
              fontSize: fonts.size.regular
            }}
          />   
        </View> 
      </View>
    );
  }

}

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  failure: state.auth.failure,
});


const mapDispatchToProps = (dispatch) => ({
  signin: bindActionCreators(signin, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ButtonFacebook);


const stylesFacebook = StyleSheet.create({ 
  text: {
    marginBottom: metrics.smallMargin,
    textAlign: 'center', 
  },
  buttonFacebook:{    
    backgroundColor: colors.facebook, 
    padding: metrics.baseMargin, 
    borderRadius: metrics.radius ,
    height: metrics.buttonHeight ,
    justifyContent: 'center'
  },
});
