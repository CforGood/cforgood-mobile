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
import IconImage from '../../components/common/IconImage';
import Button from '../../components/common/Button';
import TextInput from '../../components/common/TextInput';

import {
  styles,
  colors,
  metrics,
  fonts,
} from '../../themes';

export default class SingUpFirstnameScreen extends Component {

  render() {
    return (
      <Background
        style={{
          flex: 1,
          paddingTop: metrics.doubleBaseMargin
        }}>
        <View style={{
          flex: 1,
        }}/>

        <Container
          title={"Quel est votre prénom ?"}
          textInput={"Je m’appelle"}
          firstText={"ou"}
          button={"S'inscrire avec Facebook"}
          secondText={"Déjà membre ? Connexion"}
          onFirstPress={() => { }}
          nextStep={() => this.props.navigation.navigate('SignupLastname')}
        />

      </Background>
    );
  }
}


