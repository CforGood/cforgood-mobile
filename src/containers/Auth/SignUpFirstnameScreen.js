import React, { Component, } from 'react'; import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet,
  Keyboard,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Background from '../../components/common/Background';
import Container from '../../components/login/Container';
import Loading from '../../components/common/Loading';
import ErrorView from '../../components/common/ErrorView';
import { loadUserData } from '../../redux/actions/user';

import {
  styles,
  colors,
  metrics,
  fonts,
} from '../../themes';

class SignUpFirstnameScreen extends Component {
  state = {
    firstname: '',
    step: 1,
    error: '',
    loaded: true,
  };

  verifyFirstname = () => {
    const { firstname, step } = this.state;
    if (firstname !== '' && step === 1) {
      this.setState({
        step: 2
      });
      Keyboard.dismiss();
      setTimeout(() => this.props.navigation.navigate('SignUpLastname', { user: { first_name: firstname } }), 300);
    }
    else {
      this.setState({ error: '' });
    }
  }

  render() {
    const { firstname } = this.state;
    return (
      <Background
        style={{
          flex: 1,
          paddingTop: metrics.doubleBaseMargin
        }}
      >
        <Container
          title={"Quel est votre prénom ?"}
          onChangeText={(firstname) => this.setState({ firstname })}
          value={firstname}
          placeholder={'Je m’appelle'}
          firstText={"ou"}
          facebook={true}
          secondText={"Déjà membre ? Connexion"}
          onPress={() => this.props.navigation.navigate('Login')}
          nextStep={() => this.verifyFirstname()}
          setLoadedFacebook={(loaded) => this.setState({ loaded })}
          setErrorFacebook={(error) => {
            this.setState({ error })
          }
          }
          validateFacebook={async () => {
            await this.props.loadUserData();
            setTimeout(() => this.props.navigation.navigate('SignUpCode'), 300);
            this.setState({ loaded: true });
          }}
        />

        <ErrorView
          message={this.state.error}
          removeError={() => this.setState({ error: '' })}
        />
        <Loading
          loading={!this.state.loaded}
          title={'Inscription via Facebook'}
        />
      </Background>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  loadUserData: bindActionCreators(loadUserData, dispatch),
});

export default connect(
  false,
  mapDispatchToProps
)(SignUpFirstnameScreen);


