import React, { Component, } from 'react'; import PropTypes from 'prop-types';
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
import stripe from 'tipsi-stripe';

import {
  styles,
  fonts,
  metrics,
  colors,
} from '../../themes';
import { updateUserData } from '../../redux/actions/user';

import Header from '../../components/common/Header';
import Loading from '../../components/common/Loading';
import Button from '../../components/common/ButtonGradiant';
import ButtonGradiantRadius from '../../components/common/ButtonGradiantRadius';
import CreditCardInput from '../../modules/CreditCardInput';
import ErrorView from '../../components/common/ErrorView';

//API
import ApiHandler from '../../utils/api';

class ProfileCreditCardScreen extends Component {

  state = {
    valid: null,
    status: {},
    number: '',
    expMonth: '',
    expYear: '',
    cvc: '',
  };

  componentWillMount() {
    stripe.init({
      publishableKey: 'sk_test_UKyzFlg4ttw8q0rN6Wtqz3ni',
    });
  }

  createToken = () => {

    const { from } = this.props.navigation.state.params;

    const {
      number,
      expMonth,
      expYear,
      cvc,
      status,
      valid,
    } = this.state;

    if (valid) {
      const params = {
        // mandatory
        number,
        expMonth,
        expYear,
        cvc,
      };

      stripe.createTokenWithCard(params).then(token => {
        if (from === 'auth') {
          this.props.navigation.navigate('InvitationLove');
        }
        else {
          this.props.navigation.goBack();
        }
        if(token && token.tokenId)
        this.props.updateUserData(this.props.user.id, { stripeToken: token.tokenId });
        //stripeToken
        //call api to add token
      }).catch(error => this.setState({
        error: error.message
      }))
    }
    else {
      const message = '';
      if (status.number !== 'valid') {
        message = 'Numéro de carte invalide !';
      }
      else if (status.expiry !== 'valid') {
        message = 'Date d’expiration invalide !';
      } else if (status.cvc !== 'valid') {
        message = 'Cryptogramme visuel invalide !';
      }
      else if (number === '') {
        message = 'Formulaire invalide ! ';
      }

      if (message !== '') {
        this.setState({ error: message });
      }
    }
  }

  _onChange = (form) => {
    const { valid, values, status } = form;
    if (valid) {
      this.setState({
        number: values.number,
        expYear: parseInt(values.expiry.substr(3)),
        expMonth: parseInt(values.expiry.substr(0, 2)),
        cvc: values.cvc,
        valid: true,
      });
    }
    else {
      this.setState({
        status,
        valid: false,
      });
    }
  }

  render() {
    const { user } = this.state;
    const { title, from, amount, subscription } = this.props.navigation.state.params;
    return (
      <View style={styles.screen.mainContainer}>
        <ErrorView
          message={this.state.error}
          removeError={() => this.setState({ error: '' })}
        />
        <Loading
          loading={!this.props.loaded}
          title={'Mise à jour CB'}
        />
        <Header
          back={'-90deg'}
          text={title}
          type={'gradiant'}
          style={{
            paddingHorizontal: metrics.marginApp
          }}
          onClose={() => this.props.navigation.goBack()}
        />
        <ScrollView
          contentContainerStyle={{ marginVertical: metrics.marginApp }}
        >
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={[
              fonts.style.t20,
              fonts.style.mediumBold,
              { marginBottom: 10 }
            ]}
            >
              Renseignez vos données bancaires
            </Text>
            <Text style={[
              fonts.style.t15,
              { color: colors.textLightGray, marginBottom: 10 }
            ]}>
              Participation choisie de
              <Text style={fonts.style.mediumBold}>{` ${amount} € `}{subscription === 'Y' ? 'annuel': 'mensuel' }</Text>
            </Text>
          </View>
          <View style={{ flex: 5 }}>
            <CreditCardInput
              onChange={this._onChange}
              cardImageFront={require('../../resources/bg.jpg')}
              cardImageBack={require('../../resources/bg.jpg')}
              cardFontFamily={fonts.type.base}
              labelStyle={fonts.style.t16}
              inputStyle={[fonts.style.t15, { color: colors.ignore }]}
              inputContainerStyle={{
                borderBottomColor: colors.ignore,
                borderBottomWidth: 2,
                flex: 1,
                marginHorizontal: metrics.marginApp,
              }}
              labels={{
                name: "CARDHOLDER'S NAME",
                number: "Numéro de carte",
                expiry: "Date d’expiration",
                cvc: "Cryptogramme visuel",
                postalCode: "Code postal",
              }}
              placeholders={{
                name: "Full Name",
                number: "**** **** **** ****",
                expiry: "MM/YY",
                cvc: "123",
                postalCode: "34567",
              }}
              placeholderColor={'white'}
            />
            <View style={styles.center}>
              <Text style={[
                fonts.style.t15,
                { color: colors.info, marginBottom: 20 }
              ]}
              >
                Informations légales
              </Text>
            </View>

          </View>
        </ScrollView>
        <View style={[{ height: 60 }, styles.center]}>
          <ButtonGradiantRadius
            onPress={this.createToken}
            text={'Valider'}
          />
        </View>
        {
          from === 'auth' &&
          <Button
            onPress={() => this.props.navigation.navigate('InvitationLove')}
            type={'simple'}
            style={{
              backgroundColor: 'white'
            }}
            styleText={{
              ...fonts.style.t15,
              color: colors.ignore,
            }}
            text={'Passer'}
          />
        }
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.data,
  failure: state.user.failure,
  error: state.user.error,
  loaded: state.user.loaded,
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