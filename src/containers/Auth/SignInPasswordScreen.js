import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Background from '../../components/common/Background';
import ErrorView from '../../components/common/ErrorView';
import Loading from '../../components/common/Loading';
import Container from '../../components/login/Container';
import { signin } from '../../redux/actions/auth';
import Icon from '../../components/common/Icon';

import { styles, colors, metrics, fonts } from '../../themes';

class SignInPassword extends Component {
  state = {
    email: '',
    password: '',
    error: '',
    loaded: true
  };

  componentWillReceiveProps(nextProps) {
    console.log('SignInPasswordKOTTI', nextProps);
    if (nextProps.failure !== this.props.failure && nextProps.failure) {
      this.setState({ error: nextProps.error, loaded: true });
    }
  }

  verify = () => {
    const { password } = this.state;
    const { email } = this.props.navigation.state.params;

    if (email && password) {
      this.setState({ loaded: false });
      this.props.signin(email, password);
    } else {
      this.setState({ error: 'Mot de passe obligatoire !' });
    }
  };

  render() {
    const { password } = this.state;
    return (
      <Background
        style={{
          flex: 1
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
          title={'Entrez votre mot de passe'}
          onChangeText={password => this.setState({ password })}
          value={password}
          secureTextEntry={true}
          placeholder={'Mon mot de passe'}
          firstText={''}
          secondText={'Mot de passe oublié ?'}
          onPress={() => this.props.navigation.navigate('SignInForgetPassword')}
          nextStep={this.verify}
          styleContainer={{ paddingTop: metrics.doubleBaseMargin }}
        />
        <ErrorView
          message={this.state.error}
          removeError={() => this.setState({ error: '' })}
        />
      </Background>
    );
  }
}

const mapStateToProps = state => ({
  loaded: state.auth.loaded,
  failure: state.auth.failure,
  error: state.auth.error
});

const mapDispatchToProps = dispatch => ({
  signin: bindActionCreators(signin, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SignInPassword);
