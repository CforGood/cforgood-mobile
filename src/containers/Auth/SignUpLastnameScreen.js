import React, { Component,  } from 'react'; import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet,
  Keyboard,
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
       Keyboard.dismiss();
      setTimeout(() => this.props.navigation.navigate('SignUpEmail', { user: { last_name: lastname, ...params.user } }), 300);
    }
    else {
      this.setState({ error: 'Nom Obligatoire !' });
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
          styleContainer={{ paddingTop: metrics.doubleBaseMargin }}
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


