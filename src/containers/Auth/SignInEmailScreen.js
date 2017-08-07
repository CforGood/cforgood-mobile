import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet,
  Keyboard,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import Background from '../../components/common/Background';
import Loading from '../../components/common/Loading';
import ErrorView from '../../components/common/ErrorView';
import Container from '../../components/login/Container';
import { loadUserData } from '../../redux/actions/user';

import { validateEmail, } from '../../utils/helpers';

import {
  styles,
  colors,
  metrics,
  fonts,
} from '../../themes';

class SingInScreen extends Component {
  state = {
    email: '',
    error: '',
    step: 1,
    loaded: true,
  };

  verify = () => {
    const { email, step } = this.state;
    if (!validateEmail(email)) {
      this.setState({ error: 'L\'adresse email n\'est pas valide' });
    } else {
      Keyboard.dismiss();
      this.props.navigation.navigate('SignInPassword', { email });
    }
  }

  render() {
    const { email } = this.state;
    return (
      <Background
        style={{
          flex: 1,
        }}
      >
        <Container
          title={'Quel est votre e-mail ?'}
          onChangeText={(email) => this.setState({ email })}
          value={email.toLowerCase()}
          placeholder={'Mon e-mail'}
          firstText={"ou"}
          facebook={true}
          typeAuth={'Signin'}
          secondText={"Pas de compte ? Je m’inscris"}
          onPress={() => {
            this.props.navigation.goBack();
          }}
          nextStep={() => this.verify()}
          styleContainer={{ paddingTop: metrics.doubleBaseMargin }}
          setLoadedFacebook={(loaded) => this.setState({ loaded })}
          setErrorFacebook={(error) => {
            this.setState({ error, loaded: true })
          }}
          validateFacebook={async (type) => {
            if (type === 'signin') {
              this.setState({ loaded: true });
              await this.props.loadUserData();
              this.props.navigation.navigate('SignInValidation');
            }

          }}
        />
        <ErrorView
          message={this.state.error}
          removeError={() => this.setState({ error: '' })}
        />
        <Loading
          loading={!this.state.loaded}
          title={'connexion via Facebook'}
        />
      </Background>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  loadUserData: bindActionCreators(loadUserData, dispatch),
});

export default connect(
  false,
  mapDispatchToProps
)(SingInScreen);
