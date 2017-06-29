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

export default class SingUpScreen extends Component {

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
          //SignIn Code Promo
            <Container
              title={"Vous avez un code promo ?"}
              subtitle={"Office de tourisme, partenaire ou parrainage ..."} 
              textInput={'Mon code promo'} 
              subButton={'Passer ou valider'}
              onPress={() => { }}
            /> 
          */
        }

        {
          /*
          //SignIn Mot de passe oublié
          <Container
            title={"Choisissez un mot de passe "}
            textInput={'********'}
            secureTextEntry={true}
            onPress={() => { }}
          />
          */
        }

        {
          /*
          //SignIn Email erreur
          <View style={[
            styles.center,
            {
              flex: 1,
              height: 80,
              backgroundColor: colors.red,
              marginBottom: metrics.doubleBaseMargin
            }
          ]}>
            <Text style={styleLocal.text}>
              Oups ! ce compte existe déjà
            </Text>
          </View>
          <Container
            title={"Quel est votre e-mail ?"}
            firstText={"Déjà membre ? Connexion"}
            textInput={'allah@cforgood.com'}
            onPress={() => { }}
          /> 
          */
        }

        {
          /*
          //SignUp Mot de passe
          <Container
            title={"Choisissez un mot de passe "}
            textInput={'Mon mot de passe '}
            secureTextEntry={true}
            onPress={() => { }}
          />
         */
        }

        {
          /*
          //SignUp
          <Container
            title={"Choisissez un mot de passe "}
            textInput={'Mon mot de passe '}
            secureTextEntry={true}
            onPress={() => { }}
          />
         */
        }


        {
          /*
          //SignUp Mot de passe
          <Container
            title={"Choisissez un mot de passe "}
            textInput={'Mon mot de passe '}
            secureTextEntry={true}
            onPress={() => { }}
          />
         */
        }

        {
          /*
          //SignUp Mot de passe
          <Container
            title={"Choisissez un mot de passe "}
            textInput={'Mon mot de passe '} 
            onPress={() => { }}
          />
         */
        }

        {
          /*
          //SignUp Email
          <Container
            title={"Quel est votre e-mail ? "}
            textInput={'Mon e-mail '} 
            onPress={() => { }}
          />
         */
        }

        {
          /*
          //SignUp Nom
          <Container
            title={"Quel est votre nom ? "}
            textInput={'Mon nom '} 
            onPress={() => { }}
          />
         */
        }

        {
          /*
          //SignUp Prénom ou facebook 
          <Container
            title={"Quel est votre prénom ?"}
            textInput={"Je m'appelle"}
            firstText={"ou"}
            button={"S'inscrire avec Facebook"}
            secondText={"Déjà membre ? Connexion"} 
            onFirstPress={() => { }}
            onSecondPress={() => { }}
          />
          */
        }

      </Background>
    );
  }
}


