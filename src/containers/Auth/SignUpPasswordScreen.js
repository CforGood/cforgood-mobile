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
import ErrorView from '../../components/common/ErrorView';

import {
  styles,
  colors,
  metrics,
  fonts,
} from '../../themes';

export default class SignUpScreen extends Component {
  state = {
    password: ''
  };

  verify = () => {
    const { password } = this.state;
    if (password !== '') {
      this.props.navigation.navigate('SignUpCode', { password });
    }
    else {
      this.setState({ error: '' });
    }
  }
  render() {
    const { password } = this.state;
    return (
      <Background
        style={{
          flex: 1,
          paddingTop: metrics.doubleBaseMargin
        }}
      >
        <Icon
          styleImage={{
            width: 13,
            tintColor: colors.white,
          }}
          source={require('../../resources/icons/arrow-left.png')}
          onPress={() => this.props.navigation.goBack()}
        />
        <Container
          styleContainer={{paddingTop: metrics.base}}
          title={'Choisissez un mot de passe'}
          secureTextEntry={true}
          onChangeText={(password) => this.setState({ password })}
          value={password}
          placeholder={'Mon mot de passe'}
          firstText={""}
          nextStep={this.verify}
        />
      </Background>
    );
  }
}





