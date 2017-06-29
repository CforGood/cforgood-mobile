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
import styleLocal from './style';

import {
  styles,
  colors,
  metrics,
  fonts,
} from '../../themes';

export default class SingInScreen extends Component {

  render() {
    return (
      <Background
        style={{
          flex: 1,
          paddingTop: metrics.doubleBaseMargin
        }}>
        <View style={{
          flex: 1,
          alignItems: 'flex-start',
        }}>
          <IconImage
            width={20}
            tintColor={colors.white}
            image={require('../../resources/icons/arrow-left.png')}
            onPress={() => { }}
            borderColor={colors.transparent}
          />
        </View>

        {
          /*
          //SignIn Email
          <Container
            title={"Quel est votre e-mail ?"}
            firstText={"ou"}
            button={'Se connecter avec Facebook'}
            secondText={"Pas de compte ? Je m'inscris "}
            textInput={'Mon e-mail'}
            onFirstPress={() => { }}
            onSecondPress={() => { }}
          />
           */
        }

        {
          /*
          //SignIn Mot de passe
            <Container
              title={"Entrez votre mot de passe"}
              firstText={"Mot de passe oublié ?"}
              textInput={'Mon mot de passe'} 
              onPress={() => { }}
            /> 
          */
        }

 

      </Background>
    );
  }
}


