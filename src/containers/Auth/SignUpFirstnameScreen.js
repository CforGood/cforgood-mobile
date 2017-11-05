import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, Keyboard } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Background from '../../components/common/Background';
import Container from '../../components/login/Container';
import Loading from '../../components/common/Loading';
import ErrorView from '../../components/common/ErrorView';
import { loadUserData, geocode } from '../../redux/actions/user';

import ApiHandler from '../../utils/api';

import { styles, colors, metrics, fonts } from '../../themes';

class SignUpFirstnameScreen extends Component {
  state = {
    firstname: '',
    step: 1,
    error: '',
    loaded: true
  };

  async componentWillReceiveProps(nextProps) {
    if (nextProps.LoggedIn === true && this.props.LoggedIn === false) {
      Keyboard.dismiss();
      await this.props.loadUserData();
      
      if (nextProps.isSignUp === true) {
        this.CodePartner();
      } else {
        this.props.navigation.navigate('SignInValidation');
      }
    } else if (nextProps.failure === true && this.props.failure === false) {
      this.setState({ error: nextProps.error });
    }
  }

  CodePartner() {
    this.setState({ loaded: true });
    if (this.props.location) {
      alert('OK')
      ApiHandler.code_partner(this.props.location)
        .then(response => {
          if (response.code_partner) {
            this.props.navigation.navigate('SignUpCodePartner', {
              code_partner: response.code_partner
            });
          } else {
            this.props.navigation.navigate('SignUpCode');
          }
        })
        .catch(message => {
          this.props.navigation.navigate('SignUpCode');
        });
    } else {
      this.props.navigation.navigate('SignUpCode');
    }
  }

  componentWillMount() {
    const { location } = this.props;
    this.props.geocode(location);
  }

  verifyFirstname = () => {
    const { firstname, step } = this.state;
    if (firstname !== '') {
      Keyboard.dismiss();
      this.props.navigation.navigate('SignUpLastname', {
        user: { first_name: firstname }
      });
    } else {
      this.setState({ error: 'Prénom Obligatoire !' });
    }
  };

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
          title={'Quel est votre prénom ?'}
          onChangeText={firstname => this.setState({ firstname })}
          value={firstname}
          placeholder={'Je m’appelle'}
          firstText={'ou'}
          facebook={true}
          secondText={'Déjà membre ? Connexion'}
          onPress={() => this.props.navigation.navigate('Login')}
          nextStep={() => this.verifyFirstname()}
          setLoadedFacebook={loaded => this.setState({ loaded })}
          setErrorFacebook={error => {
            this.setState({ error });
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

const mapStateToProps = state => ({
  location: state.location.latlng,
  LoggedIn: state.auth.LoggedIn,
  isSignUp: state.auth.isSignUp,
});

const mapDispatchToProps = dispatch => ({
  loadUserData: bindActionCreators(loadUserData, dispatch),
  geocode: bindActionCreators(geocode, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(
  SignUpFirstnameScreen
);
