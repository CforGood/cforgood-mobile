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

export default class SignUpCodeScreen extends Component {
  state = {
    code: ''
  };
  render() {
    const { code } = this.state;

    return (
      <Background
        style={{
          flex: 1,
          paddingTop: metrics.doubleBaseMargin
        }}>
        <View
          style={{
            alignItems: 'flex-start',
          }}
        >
          <Icon
            styleImage={{
              width: 13,
              tintColor: colors.white
            }}
            source={require('../../resources/icons/arrow-left.png')}
            onPress={() => this.props.navigation.goBack()}
          />
        </View>
        <Container
          styleContainer={{ paddingTop: metrics.base }}
          title={'Vous avez un code promo ?'}
          onChangeText={(code) => this.setState({ code })}
          value={code.toUpperCase()}
          placeholder={'Mon code promo'}
          firstText={""}
          nextStep={this.verify}
          subtitle={'Office de tourisme, partenaire ou parrainage …'}
          subButton={'Passer ou valider'}
          onPress={() => { }}
          nextStep={() => this.props.navigation.navigate('SignupPassword')}
        />
      </Background>
    );
  }
}

