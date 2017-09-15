import React, { Component, } from 'react'; import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Keyboard,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Background from '../../components/common/Background';
import Loading from '../../components/common/Loading';
import Container from '../../components/login/Container';
import Icon from '../../components/common/Icon';
import ErrorView from '../../components/common/ErrorView';
import { signup } from '../../redux/actions/auth';
import { loadUserData } from '../../redux/actions/user';
import ApiHandler from '../../utils/api';

import {
  styles,
  colors,
  metrics,
  fonts,
} from '../../themes';

class SignUpScreen extends Component {
  state = {
    password: '',
    error: '',
    loaded: true,
  };

  async componentWillReceiveProps(nextProps) {

    if (nextProps.failure === true) {
      this.setState({ error: nextProps.error[0] });
    } else if (nextProps.loaded) {
      Keyboard.dismiss();
      await this.props.loadUserData();

      this.CodePartner();

    }
  }

  CodePartner() {

    this.setState({ loaded: true });
    if (this.props.location) {
      ApiHandler.code_partner(this.props.location)
        .then(response => {
          if (response.code_partner) {
            setTimeout(() => this.props.navigation.navigate('SignUpCodePartner', { code_partner: response.code_partner }));
          }
          else {
            setTimeout(() => this.props.navigation.navigate('SignUpCode'));
          }
        })
        .catch(message => {
          setTimeout(() => this.props.navigation.navigate('SignUpCode'));
        });
    } else {
      setTimeout(() => this.props.navigation.navigate('SignUpCode'));
    }
  }

  verify = () => {
    const { password } = this.state;

    if (password !== '') {

      const { params } = this.props.navigation.state;
      this.setState({ loaded: false });
      this.props.signup({
        password,
        ...params.user
      });
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
          styleContainer={{ paddingTop: metrics.base }}
          title={'Choisissez un mot de passe'}
          secureTextEntry={true}
          onChangeText={(password) => this.setState({ password })}
          value={password}
          placeholder={'Mon mot de passe'}
          firstText={""}
          nextStep={this.verify}
        />
        <Loading
          loading={!this.state.loaded}
          title={'Création du Compte'}
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
  location: state.location.latlng,
  LoggedIn: state.auth.LoggedIn,
  failure: state.auth.failure,
  loaded: state.auth.loaded,
  error: state.auth.error,
});


const mapDispatchToProps = (dispatch) => ({
  signup: bindActionCreators(signup, dispatch),
  loadUserData: bindActionCreators(loadUserData, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpScreen);






