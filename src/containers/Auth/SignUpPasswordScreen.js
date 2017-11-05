import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, Platform, Keyboard } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Background from '../../components/common/Background';
import Loading from '../../components/common/Loading';
import Container from '../../components/login/Container';
import Icon from '../../components/common/Icon';
import ErrorView from '../../components/common/ErrorView';
import { signup } from '../../redux/actions/auth';
import ApiHandler from '../../utils/api';

import { styles, colors, metrics, fonts } from '../../themes';

class SignUpScreen extends Component {
  state = {
    password: '',
    error: '',
    loaded: true,
    validate: false
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.failure === true) {
      this.setState({
        error: nextProps.error[0] || nextProps.error,
        loaded: true
      });
    } else {
      this.setState({ loaded: nextProps.loaded });
    }
  }

  verify = () => {
    const { password } = this.state;

    if (password !== '') {
      const { params } = this.props.navigation.state;
      this.setState({ loaded: false });

      this.props.signup({
        ...this.props.user,
        password,
        ...params.user
      });
    } else {
      this.setState({ error: '' });
    }
  };

  render() {
    const { password } = this.state;
    return (
      <Background style={{ flex: 1 }}>
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
          styleContainer={{ paddingTop: metrics.base }}
          title={'Choisissez un mot de passe'}
          secureTextEntry={true}
          onChangeText={password => this.setState({ password })}
          value={password}
          placeholder={'Mon mot de passe'}
          firstText={''}
          nextStep={this.verify}
        />
        <Loading loading={!this.state.loaded} title={'Création du Compte'} />
        <ErrorView
          message={this.state.error}
          removeError={() => this.setState({ error: '' })}
        />
      </Background>
    );
  }
}

const mapStateToProps = state => ({
  failure: state.auth.failure,
  loaded: state.auth.loaded,
  user: state.user.data,
  error: state.auth.error
});

const mapDispatchToProps = dispatch => ({
  signup: bindActionCreators(signup, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);
