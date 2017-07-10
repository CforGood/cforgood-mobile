import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Background from '../../components/common/Background';
import Validation from '../../components/login/Validation';
import { siginSuccess } from '../../redux/actions/auth';

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
          secondText={'Bienvenue Allan !'}
          nextStep={() => this.props.siginSuccess()}
        />
      </Background>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  siginSuccess: bindActionCreators(siginSuccess, dispatch),
});

export default connect(null, mapDispatchToProps)(SignUpValidationScreen);


