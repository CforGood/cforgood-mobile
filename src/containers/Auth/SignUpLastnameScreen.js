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

  verify = () => {
    const { lastname } = this.state;
    const { params } = this.props.navigation.state;
    if (lastname !== '') {
      this.props.navigation.navigate('SignUpEmail', { lastname, ...params });
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
          paddingTop: metrics.doubleBaseMargin * 2
        }}
      >
        <Container
          title={"Quel est votre nom ?"}
          onChangeText={(lastname) => this.setState({ lastname })}
          value={lastname}
          placeholder={'Mon nom'}
          firstText={""}
          secondText={"Déjà membre ? Connexion"}
          onPress={() => this.props.navigation.navigate('Login')}
          nextStep={this.verify}
        />
      </Background>
    );
  }
}


