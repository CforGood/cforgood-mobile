import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Platform,
  Linking,
  Alert
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import stripe from 'tipsi-stripe';

import { styles, fonts, metrics, colors } from '../../themes';
import { updateUserData } from '../../redux/actions/user';

import Loading from '../../components/common/Loading';
import Payement from '../../components/profile/Payement';
import Header from '../../components/common/Header';
import Button from '../../components/common/ButtonGradiant';
import ButtonGradiantRadius from '../../components/common/ButtonGradiantRadius';
import ErrorView from '../../components/common/ErrorView';

//API
import ApiHandler from '../../utils/api';

class ProfilePaymentScreen extends Component {
  state = {
    error: '',
    user: null
  };

  componentDidMount() {
    this.setState({
      user: {
        ...this.props.user,
        subscription: 'Y',
        amount: 5
      }
    });
  }

  handleConfirm = () => {
    if (this.state.user) {
      if (this.state.user.amount > 0 && this.state.user.amount !== null) {
        this.props.updateUserData(this.props.user.id, {
          subscription: this.state.user.subscription,
          amount: this.state.user.amount
        });
        this.props.navigation.navigate('CreditCard', {
          from: 'auth',
          title: 'Ajouter une CB',
          amount: this.state.user.amount,
          subscription: this.state.user.subscription
        });
      } else {
        this.setState({
          error: "Oups ! \n Choisissez d'abord un montant :-)"
        });
      }
    }
  };

  render() {
    return (
      <View style={styles.screen.mainContainer}>
        <ErrorView
          message={this.state.error}
          removeError={() => this.setState({ error: '' })}
        />
        <Loading
          loading={!this.props.loaded}
          title={'Mise à jour de montant'}
        />
        <Header
          text={'Choisissez un montant'}
          type={'gradiant'}
          style={{
            paddingHorizontal: metrics.marginApp,
            justifyContent: 'center'
          }}
          onClose={null}
        />
        <ScrollView
          contentContainerStyle={{
            marginHorizontal: metrics.marginApp,
            paddingBottom: metrics.doubleBaseMargin
          }}
        >
          <Payement
            user={this.props.user}
            setUserData={user => this.setState({ user })}
          />
        </ScrollView>
        <View
          style={{
            ...styles.center,
            height: 50,
            marginTop: metrics.baseMargin
          }}
        >
          <ButtonGradiantRadius
            onPress={this.handleConfirm}
            text={'Participer'}
          />
        </View>
        <Button
          onPress={() => this.props.navigation.navigate('InvitationLove')}
          type={'simple'}
          style={{
            backgroundColor: 'white'
          }}
          styleText={{
            ...fonts.style.t15,
            color: colors.ignore
          }}
          text={"Passer l'étape en invitant des amis"}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.data,
  failure: state.user.failure,
  error: state.user.error,
  loaded: state.user.loaded
});

const mapDispatchToProps = dispatch => ({
  updateUserData: bindActionCreators(updateUserData, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(
  ProfilePaymentScreen
);

const style = StyleSheet.create({
  profileheader: {
    height: metrics.navBarHeight,
    justifyContent: 'center'
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
    fontWeight: 'bold'
  }
});
