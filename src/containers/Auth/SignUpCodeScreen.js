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
import Icon from '../../components/common/Icon';
import Button from '../../components/common/Button';
import TextInput from '../../components/common/TextInput';

import {
  styles,
  colors,
  metrics,
  fonts,
} from '../../themes';

export default class SignUpScreen extends Component {

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
          <Icon
            styleImage={{
              width: 20,
              height: 20,
              color: colors.white
            }}
            source={require('../../resources/icons/arrow-left.png')}
            onPress={() => { }}
          />
        </View>


        <Container
          title={"Vous avez un code promo ?"}
          subtitle={"Office de tourisme, partenaire ou parrainage …"}
          textInput={'Mon code promo'}
          subButton={'Passer ou valider'}
          onPress={() => { }}
          nextStep={() => this.props.navigation.navigate('SignupPassword')}

        />



      </Background>
    );
  }
}


