import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import FontMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Kohana } from 'react-native-textinput-effects';

import Background from '../../components/common/Background';
import Container from '../../components/login/Container';

import {
  styles,
  colors,
  metrics,
  fonts,
} from '../../themes';

export default class SignUpFirstnameScreen extends Component {
  state = {
    firstname: '',
    error: '',
  };

  verifyFirstname = () => {
    const { firstname } = this.state;
    if (firstname !== '') {
      this.props.navigation.navigate('SignUpLastname', { user: { first_name: firstname } });
    }
    else {
      this.setState({ error: '' });
    }
  }

  render() {
    const { firstname } = this.state;
    return (
      <Background
        style={{
          flex: 1,
          paddingTop: metrics.doubleBaseMargin * 2
        }}
      >
        <Container
          title={"Quel est votre prénom ?"}
          onChangeText={(firstname) => this.setState({ firstname })}
          value={firstname}
          placeholder={'Je m’appelle'}
          firstText={"ou"}
          facebook={true}
          secondText={"Déjà membre ? Connexion"}
          onPress={() => this.props.navigation.navigate('Login')}
          nextStep={this.verifyFirstname}
        />
      </Background>
    );
  }
}


