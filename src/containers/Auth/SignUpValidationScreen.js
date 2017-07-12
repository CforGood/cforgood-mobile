import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

import Background from '../../components/common/Background';
import Validation from '../../components/login/Validation';

import {
  styles,
  colors,
  metrics,
  fonts,
} from '../../themes';

class SignUpValidationScreen extends Component {

  render() {
    return (
      <Background style={{
        flex: 1,
        paddingHorizontal: metrics.baseMargin,
        paddingVertical: metrics.baseMargin,
        paddingTop: metrics.doubleBaseMargin
      }}>
        <Validation
          firstText={'Votre compte est créé.'}
          secondText={''}
          name={'Bienvenue Allan !'}
          nextStep={() => this.props.navigation.navigate('InvitationLove')}
        />
      </Background>
    );
  }
}


export default SignUpValidationScreen;


