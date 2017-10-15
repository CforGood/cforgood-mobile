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
import { loadUserData, geocode } from '../../redux/actions/user';

import ApiHandler from '../../utils/api';

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


  componentWillMount() {
    const { location } = this.props;
    this.props.geocode(location);
  }

  verifyFirstname = () => {
    const { firstname, step } = this.state;
    if (firstname !== '') {
        Keyboard.dismiss();
        this.props.navigation.navigate('SignUpLastname', { user: { first_name: firstname } });
    }
    else {
      this.setState({ error: 'Prénom Obligatoire !' });
    }
  }

  validateFacebook = async (type) => {
    if (type === 'signup') {
      await this.props.loadUserData();
      if (this.props.location) {
        ApiHandler.code_partner(this.props.location)
          .then(response => {
            if (response.code_partner) {
              this.props.navigation.navigate('SignUpCodePartner', { code_partner: response.code_partner });
            }
            else {
              this.props.navigation.navigate('SignUpCode');
            }
          })
          .catch(message => {
            () => this.props.navigation.navigate('SignUpCode');
          });
      } else {
        this.props.navigation.navigate('SignUpCode');
      }

      setTimeout(() => this.setState({ loaded: true }), 100);
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
          }}
          validateFacebook={this.validateFacebook}
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
});

const mapDispatchToProps = (dispatch) => ({
  loadUserData: bindActionCreators(loadUserData, dispatch),
  geocode: bindActionCreators(geocode, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpFirstnameScreen);


