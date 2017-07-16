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

class SignInValidationScreen extends Component {

  async componentWillMount() {
    setTimeout(() => { this.props.siginSuccess(); }, 500);
  }

  render() {
    return (
      <Background style={{
        flex: 1,
        ...styles.center,
      }}>
        <Validation
          firstText={'Heureux de vous'}
          secondText={'retrouver'}
          name={` ${this.props.user.first_name} ! `}
        />
      </Background>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.data,
});


const mapDispatchToProps = (dispatch) => ({
  siginSuccess: bindActionCreators(siginSuccess, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignInValidationScreen);

