import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

import Background from '../../components/common/Background';
import Container from '../../components/login/Container';

import {
  styles,
  colors,
  metrics,
  fonts,
} from '../../themes';

export default class SignUpLastnameScreen extends Component {
  state = {
    firstname: '',
    error: '',
  };

  verify = () => {
    const { lastname } = this.state;
    const { params } = this.props.navigation.state;
    if (lastname !== '') {

      this.props.navigation.navigate('SignUpEmail', { user: { last_name: lastname, ...params.user } });
    }
    else {
      this.setState({ error: '' });
    }
  }

  render() {
    const { lastname } = this.state;
    return (
      <Background
        style={{
          flex: 1,
        }}
      >
        <Container
          styleContainer={{ paddingTop: metrics.doubleBaseMargin * 2 }}
          title={"Quel est votre nom ?"}
          onChangeText={(lastname) => this.setState({ lastname })}
          value={lastname}
          placeholder={'Mon nom'}
          firstText={""}
          secondText={"Déjà membre ? Connexion"}
          onPress={() => this.props.navigation.navigate('Login')}
          nextStep={() => this.verify()}
        />
      </Background>
    );
  }
}


