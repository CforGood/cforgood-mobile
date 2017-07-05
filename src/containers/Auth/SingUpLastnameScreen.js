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
        <View
          style={{
            flex: 1,
            alignItems: 'flex-start',
            paddingHorizontal: metrics.marginApp
          }}
        >
          <IconImage
            width={20}
            tintColor={colors.white}
            image={require('../../resources/icons/arrow-left.png')}
            onPress={() => () => this.props.navigation.goBack()}
            borderColor={colors.transparent}
          />
        </View>

        <Container
          title={"Quel est votre nom ?"}
          textInput={'Mon nom '}
          nextStep={() => this.props.navigation.navigate('SignupPassword')}
          secondText={"Déjà membre ? Connexion"}
        />
      </Background>
    );
  }
}


