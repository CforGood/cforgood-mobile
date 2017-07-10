import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

import Background from '../../components/common/Background';
import Container from '../../components/login/Container';
import Icon from '../../components/common/Icon';
import ErrorView from '../../components/common/ErrorView';

import {
  validateEmail,
} from '../../utils/helpers';

import {
  styles,
  colors,
  metrics,
  fonts,
} from '../../themes';

export default class SignUpScreen extends Component {
  state = {
    email: ''
  };

  verify = () => {
    const { email } = this.state;
    if (!validateEmail(email)) {
      this.setState({ error: 'L\'adresse email n\'est pas valide' });
    }
    else {
      const { params } = this.props.navigation.state;
      this.props.navigation.navigate('SignUpPassword', { user: { email, ...params.user } });
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
        <ErrorView message={this.state.error} />
        <Icon
          styleImage={{
            width: 13,
            tintColor: colors.white
          }}
          source={require('../../resources/icons/arrow-left.png')}
          onPress={() => this.props.navigation.goBack()}
        />
        <Container
          styleContainer={{
            paddingTop: metrics.base
          }}
          title={'Quel est votre e-mail ?'}
          onChangeText={(email) => this.setState({ email })}
          value={email}
          placeholder={'Mon e-mail'}
          keyboardType={'email-address'}
          firstText={""}
          nextStep={this.verify}
        />

      </Background>
    );
  }
}
