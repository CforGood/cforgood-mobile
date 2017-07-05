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
        <Container
          title={"Choisissez un mot de passe "}
          textInput={'Mon mot de passe'}
          secureTextEntry={true}
          nextStep={() => this.props.navigation.navigate('SignupCode')}
        />
      </Background>
    );
  }
}


