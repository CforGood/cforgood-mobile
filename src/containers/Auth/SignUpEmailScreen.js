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
    email: ''
  };

  verify = () => {
    const { email } = this.state;
    if (email !== '') {
      this.props.navigation.navigate('SignUpPassword', { email });
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
          paddingTop: metrics.doubleBaseMargin
        }}>
        <Icon
          styleImage={{
            width: 20,
            height: 20,
            tintColor: colors.white
          }}
          source={require('../../resources/icons/arrow-left.png')}
          onPress={() => { }}
        />

        <Container
          styleContainer={{paddingTop: metrics.base}}
          title={'Quel est votre e-mail ?'}
          onChangeText={(email) => this.setState({ email })}
          value={email}
          placeholder={'Mon e-mail'}
          firstText={""}
          nextStep={this.verify}
        />

      </Background>
    );
  }
}


