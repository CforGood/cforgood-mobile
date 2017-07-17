import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import FontMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Kohana } from 'react-native-textinput-effects';

import Background from '../../components/common/Background';
import ErrorView from '../../components/common/ErrorView';
import Container from '../../components/login/Container';

import {
  validateEmail,
} from '../../utils/helpers';

import {
  styles,
  colors,
  metrics,
  fonts,
} from '../../themes';

export default class SingInScreen extends Component {
  state = {
    email: '',
    error: '',
    step: 1,
  };

  verify = () => {

    const { email, step } = this.state;
    if (!validateEmail(email)) {
      this.setState({ error: 'L\'adresse email n\'est pas valide' });
    }

    else if (step === 1) {
      this.setState({
        step: 2
      });
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
        <ErrorView
          message={this.state.error}
          removeError={() => this.setState({ error: '' })}
        />
        <Container
          title={'Quel est votre e-mail ?'}
          onChangeText={(email) => this.setState({ email })}
          value={email.toLowerCase()}
          placeholder={'Mon e-mail'}
          firstText={"ou"}
          facebook={true}
          typeAuth={'Signin'}
          secondText={"Pas de compte ? Je m’inscris"}
          onPress={() => this.props.navigation.goBack()}
          nextStep={this.verify}
          styleContainer={{ paddingTop: metrics.doubleBaseMargin * 2 }}
        />
      </Background>
    );
  }
}





