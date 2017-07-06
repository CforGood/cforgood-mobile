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

export default class SingInScreen extends Component {
  state = {
    email: '',
    error: '',
  };

  verify = () => {
    const { email } = this.state;
    if (email !== '') {
      this.props.navigation.navigate('SignupLastname', { email });
    }
    else {
      this.setState({error: ''});
    }
  }

  render() {
    const { email } = this.state;
    return (
      <Background
        style={{
          flex: 1,
          paddingTop: metrics.doubleBaseMargin * 2
        }}
      >
        <Container
          title={"Quel est votre e-mail ?"}
          onChangeText={(email) => this.setState({ email })}
          value={email}
          placeholder={'Mon e-mail'}
          firstText={"ou"}
          facebook={true}
          secondText={"Pas de compte ? Je m’inscris"}
          onPress={() => this.props.navigation.goBack()}
          nextStep={this.verify}
        />
      </Background>
    );
  }
}





