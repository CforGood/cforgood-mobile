import React, { Component,  } from 'react'; import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet,
  Keyboard,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Background from '../../components/common/Background';
import ErrorView from '../../components/common/ErrorView';
import Loading from '../../components/common/Loading';
import Container from '../../components/login/Container';
import { signin } from '../../redux/actions/auth';
import { loadUserData } from '../../redux/actions/user';

import {
  styles,
  colors,
  metrics,
  fonts,
} from '../../themes';

class SignInPassword extends Component {

  state = {
    email: '',
    password: '',
    error: '',
  };

  async componentWillReceiveProps(nextProps) {

    if (nextProps.LoggedIn === true && this.props.LoggedIn === false) {
      Keyboard.dismiss();
      await this.props.loadUserData();
      this.props.navigation.navigate('SignInValidation');
    } else if (nextProps.failure === true && this.props.failure === false) {
      this.setState({ error: nextProps.error });
    }

  }

  verify = () => {
    const { password } = this.state;
    const { email } = this.props.navigation.state.params;

    if (email && password) {
      this.props.signin(email, password);
    }
    else {
      this.setState({ error: 'Mot de passe obligatoire !' });
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
        <Container
          title={"Entrez votre mot de passe"}
          onChangeText={(password) => this.setState({ password })}
          value={password}
          secureTextEntry={true}
          placeholder={'Mon mot de passe'}
          firstText={""}
          secondText={"Mot de passe oublié ?"}
          onPress={() => this.props.navigation.navigate('SignInForgetPassword')}
          nextStep={this.verify}
          styleContainer={{ paddingTop: metrics.doubleBaseMargin * 2 }}
        />
        <ErrorView
          message={this.state.error}
          removeError={() => this.setState({ error: '' })}
        />

        <Loading loading={!this.props.loaded} />

      </Background>
    );
  }
}

const mapStateToProps = state => ({
  LoggedIn: state.auth.LoggedIn,
  loaded: state.auth.loaded,
  failure: state.auth.failure,
  error: state.auth.error,
});


const mapDispatchToProps = (dispatch) => ({
  signin: bindActionCreators(signin, dispatch),
  loadUserData: bindActionCreators(loadUserData, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInPassword);
