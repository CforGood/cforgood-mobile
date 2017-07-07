import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

import Background from '../../components/common/Background';
import Container from '../../components/login/Container';

import {
  styles,
  colors,
  metrics,
  fonts,
} from '../../themes';
import { signin } from '../../redux/actions/auth';

class SignInPassword extends Component {

  state = {
    email: '',
    password: '',
    error: '',
    wrongPassword: false,
  };

  verify = () => {
    const { password } = this.state;
    const { email } = this.props.navigation.state.params;

    if (password !== '') {
      //this.props.signin(this.state.email, this.state.password);
      //this.props.navigation.navigate('SignupLastname', { password });
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
          paddingTop: metrics.doubleBaseMargin * 2
        }}
      >
        <Container
          title={"Entrez votre mot de passe"}
          onChangeText={(password) => this.setState({ password })}
          value={password}
          placeholder={'Mon mot de passe'}
          firstText={""}
          secondText={"Mot de passe oublié ?"}
          onPress={() => this.props.navigation.navigate('SignInForgetPassword')}
          nextStep={this.verify}
        />
      </Background>
    );
  }
}

const mapStateToProps = state => ({
  LoggedIn: state.auth.LoggedIn,
  failure: state.auth.failure,
});


const mapDispatchToProps = (dispatch) => ({
  signin: bindActionCreators(signin, dispatch),
  signup: bindActionCreators(signup, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInPassword);
