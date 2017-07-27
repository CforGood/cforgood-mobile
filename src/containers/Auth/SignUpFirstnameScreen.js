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

export default class SignUpFirstnameScreen extends Component {
  state = {
    firstname: '',
    step: 1,
    error: '',
  };

  verifyFirstname = () => {
    const { firstname, step } = this.state;
    if (firstname !== ''  && step === 1) {
      this.setState({
        step: 2
      });
      Keyboard.dismiss();
      setTimeout(() => this.props.navigation.navigate('SignUpLastname', { user: { first_name: firstname } }), 300);
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
          paddingTop: metrics.doubleBaseMargin
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
          nextStep={() => this.verifyFirstname()}
        />
      </Background>
    );
  }
}


