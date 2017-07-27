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
  };

  async componentWillReceiveProps(nextProps) {

    if (nextProps.failure === true) {
      this.setState({ error: nextProps.error[0] });
    }
    else if (nextProps.loaded) {
      Keyboard.dismiss();
      await this.props.loadUserData();
      setTimeout(() => this.props.navigation.navigate('SignUpCode'), 300);
    }
  }

  verify = () => {
    const { password } = this.state;
    if (password !== '') {
      const { params } = this.props.navigation.state;

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
          loading={!this.props.loaded}
          title={'Création Compte'}
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






