import React, { Component, } from 'react'; import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  Platform
} from 'react-native';

import Icon from '../../components/common/Icon';
import Background from '../../components/common/Background';
import Container from '../../components/login/Container';
import ErrorView from '../../components/common/ErrorView';

import {
  styles,
  colors,
  metrics,
  fonts,
} from '../../themes';

export default class SignUpLastnameScreen extends Component {
  state = {
    lastname: '',
    error: '',
  };

  verify = () => {
    const { lastname } = this.state;
    const { params } = this.props.navigation.state;
    if (lastname !== '') {
      Keyboard.dismiss();
      setTimeout(() => this.props.navigation.navigate('SignUpEmail', { user: { last_name: lastname, ...params.user } }), 100);
    }
    else {
      this.setState({ error: 'Nom Obligatoire !' });
    }
  }

  render() {
    const { lastname } = this.state;
    return (
      <Background
        style={{
          flex: 1,
        }}
      >
        <Icon
          styleImage={{
            marginTop: metrics.marginApp + (Platform.OS === 'ios' ? 20 : 0),
            marginLeft: metrics.baseMargin,
            height: 20,
            width: 20,
            resizeMode: 'contain',
            tintColor: colors.white
          }}
          source={require('../../resources/icons/arrow-left.png')}
          onPress={() => this.props.navigation.goBack()}
        />
        <Container
          styleContainer={{ paddingTop: metrics.doubleBaseMargin }}
          title={"Quel est votre nom ?"}
          onChangeText={(lastname) => this.setState({ lastname })}
          value={lastname}
          placeholder={'Mon nom'}
          firstText={""}
          secondText={"Déjà membre ? Connexion"}
          onPress={() => this.props.navigation.navigate('Login')}
          nextStep={() => this.verify()}
        />
        <ErrorView
          message={this.state.error}
          removeError={() => this.setState({ error: '' })}
        />
      </Background>
    );
  }
}


