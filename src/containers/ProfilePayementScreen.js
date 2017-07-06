import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Platform,
  Linking,
  Alert,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import stripe from 'tipsi-stripe'

import {
  styles,
  fonts,
  metrics,
  colors,
} from '../themes';
import { updateUserData } from '../redux/actions/user';

import Header from '../components/common/Header';
import Button from '../components/common/ButtonGradiant';
import ButtonGradiantRadius from '../components/common/ButtonGradiantRadius';
import CreditCardInput from '../modules/CreditCardInput';
import ErrorView from '../components/common/ErrorView';

//API
import ApiHandler from '../utils/api';

class ProfileCreditCardScreen extends Component {



  render() {
    const { user } = this.state;
    return (
      <View style={styles.screen.mainContainer}>
        <ErrorView message={this.state.error} />
        <Payement user={user} />

        <View
          style={{
            ...styles.center,
            marginVertical: metrics.baseMargin
          }}
        >
          <ButtonGradiantRadius
            onPress={() => this.props.navigation.navigate('CreditCard')}
            text={'Participer'}
          />
        </View>
        <Button
          onPress={() => { }}
          type={'simple'}
          style={{
            backgroundColor: 'white'
          }}
          styleText={{
            color: colors.ignore,
            ...fonts.style.t15,
          }}
          text={"Passer l'étape en invitant des amis"}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.data,
});

const mapDispatchToProps = (dispatch) => ({
  updateUserData: bindActionCreators(updateUserData, dispatch),
});


export default connect(mapStateToProps, mapDispatchToProps)(ProfileCreditCardScreen);

const style = StyleSheet.create({
  profileheader: {
    height: metrics.navBarHeight,
    justifyContent: 'center',
  },
  info: {
    height: 200,
    marginTop: metrics.baseMargin
  },
  profileForm: {
    flex: 1,
    paddingVertical: metrics.baseMargin
  },
  boldCenter: {
    textAlign: 'center',
    marginVertical: metrics.baseMargin,
    fontWeight: 'bold',
  },
});