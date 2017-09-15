import React, { Component, } from 'react'; import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';

import { loadAssociation } from '../../redux/actions/association';
import Background from '../../components/common/Background';
import Validation from '../../components/login/Validation';

import {
  styles,
  colors,
  metrics,
  fonts,
} from '../../themes';

class SignUpValidationScreen extends Component {

  componentWillMount() {
    this.props.loadAssociation();
  }

  goTo() {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'ChooseAssociation' })
      ]
    });

    this.props.navigation.dispatch(resetAction);
  }


  render() {
    return (
      <Background style={{
        flex: 1,
        paddingHorizontal: metrics.baseMargin,
        paddingVertical: metrics.doubleBaseMargin,
      }}>
        <Validation
          firstText={'Votre compte est créé.'}
          secondText={''}
          name={`Bienvenue  ${this.props.user.first_name} !`}
          nextStep={() => this.goTo()}
        />
      </Background>
    );
  }
}


const mapStateToProps = state => ({
  user: state.user.data,
});

const mapDispatchToProps = (dispatch) => ({
  loadAssociation: bindActionCreators(loadAssociation, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpValidationScreen);
