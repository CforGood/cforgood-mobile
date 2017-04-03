import React, { PureComponent } from 'react';
import {
  WebView,
  Image,
  View,
} from 'react-native';

import {
  styles,
  colors,
  fonts,
  metrics,
} from '../themes';

import {
  site
} from '../config.json';

import Back from '../components/common/Icon';
import Welcome from '../components/login/Welcome';

const URL_SIGNUP = site + '/signup';

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

      let lastUrl  = nextState.url.split('/').slice(-1)[0];

      //console.log('nextState.url', lastUrl)
      if(lastUrl === 'dashboard'){
        this.setState({signup: true})

        setTimeout(() => { this.props.navigation.goBack(); }, 2000);
      }
    }
  }

  render() {        
    return (
      <Image 
        style={[
          styles.screen.container,
          {
            width: null,
            height: null,
            marginTop: metrics.doubleBaseMargin
          }
        ]}
        source={require('../resources/images/background-Signup.jpg')}
      > 
        <Back
          onPress={() => this.props.navigation.goBack()}
          source={require('../resources/icons/left-arrow-white.png')}
          style={[
            {
              top: metrics.doubleBaseMargin,
              left: metrics.doubleBaseMargin,
              position: 'absolute',
              backgroundColor: 'transparent',
            },
            styles.smallImage
          ]}
        />
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
        
      </Image>
    );
  }
}

export default SignUpScreen;


