import React, { Component,  } from 'react'; import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';

import Background from '../../components/common/Background';
import Validation from '../../components/login/Validation';

import {
  styles,
  colors,
  metrics,
  fonts,
} from '../../themes';

class SignUpValidationScreen extends Component {

  render() {
    return (
      <Background style={{
        flex: 1,
        paddingHorizontal: metrics.baseMargin,
        paddingVertical: metrics.baseMargin,
        paddingTop: metrics.doubleBaseMargin
      }}>
        <Validation
          firstText={'Votre compte est créé.'}
          secondText={''}
          name={`Bienvenue  ${this.props.user.first_name} !`}
          nextStep={() => this.props.navigation.navigate('ChooseAssociation')}
        />
      </Background>
    );
  }
}


const mapStateToProps = state => ({
  user: state.user.data,
});

export default connect(mapStateToProps)(SignUpValidationScreen);
