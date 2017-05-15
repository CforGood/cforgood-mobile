import React, { PureComponent } from 'react';
import {
  WebView,
  Image,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import  queryString from 'query-string';

import {
  styles,
  colors,
  fonts,
  metrics,
} from '../themes';

import {
  site
} from '../config.json';

import { signup } from '../redux/actions/auth';
import Back from '../components/common/Icon';
import Welcome from '../components/login/Welcome';

const URL_SIGNUP = site + '/signup_app_mobile';

class SignUpScreen extends PureComponent {
  
  state = { 
    url: '',
    status: 'No Page Loaded',
    backButtonEnabled: false,
    forwardButtonEnabled: false,
    loading: true,
    scalesPageToFit: true,
  };

  onNavigationStateChange = (navState) => {
    this.setState({
      backButtonEnabled: navState.canGoBack, 
      forwardButtonEnabled: navState.canGoForward,
      url: navState.url,
      status: navState.title,
      loading: navState.loading,
      scalesPageToFit: true,
      signup: false
    });
  }

  componentWillUpdate(nextProps, nextState){

    if(nextState.url !== ''){

      //console.log('nextState.url', lastUrl)
      const url = nextState.url;
      
      if(url.includes('authentication_token')){
        
        const memberUrl  = url.split('/dashboard')[0];

        const user_id  = memberUrl.split('/users/').slice(-1)[0];

        const lastUrl  = url.split('?').slice(-1)[0];
        const parsed = queryString.parse(lastUrl);
        this.setState({signup: true})
        

        setTimeout(() => { this.props.signup(parsed.email, parsed.authentication_token, user_id); }, 300);

      }
    }
  }

  render() {        
    return (
      <View 
        style={[
          styles.screen.container,
        ]}
      > 
        {
          !this.state.signup ?
          <WebView 
            ref={ref => { this.webView = ref; }}
            source={{uri: URL_SIGNUP}} 
            style={{flex: 1}}
            onNavigationStateChange={this.onNavigationStateChange}
          />
          :
          <View style={{ 
              flex: 5,
              padding: metrics.marginApp
            }}
          >
            <Welcome 
              message={"Votre compte est maintenant créé.\n Bienvenue !"}
            />
            <View style={{flex: 1}} />
          </View>

        }
        <Back
          onPress={() => this.props.navigation.goBack()}
          source={require('../resources/icons/left-arrow-white.png')}
          style={[
            {
              top: metrics.doubleBaseMargin,
              left: metrics.doubleBaseMargin,
              position: 'absolute',
              backgroundColor: 'transparent',
              height: 36, width: 36
            }
          ]}
          styleImage={{height: 36, width: 36, tintColor: colors.darkGray}}
        />
        
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  signup: bindActionCreators(signup, dispatch),
});

export default connect(null, mapDispatchToProps)(SignUpScreen);

